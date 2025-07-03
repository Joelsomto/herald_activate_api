require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

function generateReferral(firstname, lastname) {
  return (
    firstname.toLowerCase() +
    lastname.toLowerCase() +
    Math.floor(1000 + Math.random() * 9000)
  );
}

// Utility to generate a unique 9-character alphanumeric referral code
function generateUniqueRef(firstname, lastname, email) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let base = (firstname + lastname + email).replace(/[^A-Za-z0-9]/g, '');
  base = base.substring(0, 5);
  let ref = base;
  while (ref.length < 9) {
    ref += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return ref.substring(0, 9);
}

app.post('/submit', async (req, res) => {
  const { Firstname, Lastname, Email } = req.body;
  if (!Firstname || !Lastname || !Email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const ref = generateReferral(Firstname, Lastname);
  try {
    // Test database connection first
    await db.promise().query('SELECT 1');
    
    await db.promise().execute(
      'INSERT INTO herald_activate (firstname, lastname, email, ref) VALUES (?, ?, ?, ?)',
      [firstname, lastname, email, ref]
    );
    
    // Send success email using Gmail SMTP
    try {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          rejectUnauthorized: false
        }
      });
      
      let info = await transporter.sendMail({
        from: `"Herald " <${process.env.SMTP_USER}>`,
        to: Email,
        subject: 'Welcome to Herald  - Your Referral Code',
        text: `Hello ${Firstname} ${Lastname},\n\nThank you for joining Herald!\n\nYour referral code is: ${ref}\n\nBest regards,\nThe Herald Activate Team`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0; font-size: 28px;">Welcome to Herald Activate!</h1>
            </div>
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
              <h2 style="color: #333; margin-bottom: 20px;">Hello ${Firstname} ${Lastname},</h2>
              <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
                Thank you for joining Herald Activate! Your account has been successfully created.
              </p>
              <div style="background: #fff; border: 2px solid #667eea; border-radius: 8px; padding: 20px; text-align: center; margin: 25px 0;">
                <h3 style="color: #667eea; margin: 0 0 10px 0;">Your Referral Code</h3>
                <div style="background: #f0f0f0; padding: 15px; border-radius: 5px; font-size: 18px; font-weight: bold; color: #333; letter-spacing: 2px;">
                  ${ref}
                </div>
              </div>
              <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
                Share this code with friends and family to help them join our community!
              </p>
              <div style="text-align: center; margin-top: 30px;">
                <p style="color: #999; font-size: 14px; margin: 0;">
                  Best regards,<br>
                  <strong>The Herald Activate Team</strong>
                </p>
              </div>
            </div>
          </div>
        `,
      });
      
      console.log('Email sent successfully!');
      console.log('Message ID:', info.messageId);
      
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue with success response even if email fails
      // In production, you might want to log this to a monitoring service
    }
    
    res.json({ 
      success: true, 
      ref,
      message: 'Submission successful! Check your email for your referral code.'
    });
  } catch (err) {
    console.error('Error in /submit:', err);
    res.status(500).json({ error: 'Database or email error', details: err.message });
  }
});

app.post('/herald-activate', async (req, res) => {
  const { firstname, lastname, email } = req.body;
  if (!firstname || !lastname || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    // 1. Check if email exists in subscribers
    const [subs] = await db.promise().execute(
      'SELECT subscriberId FROM subscribers WHERE email = ?',
      [email]
    );
    if (subs.length > 0) {
      // Existing user
      const subscriberId = subs[0].subscriberId;
      // 2. Check if subscriberId exists as vc_managerId in virtual_centre_ref
      const [vcRefs] = await db.promise().execute(
        'SELECT vc_refId FROM virtual_centre_ref WHERE vc_managerId = ?',
        [subscriberId]
      );
      if (vcRefs.length > 0) {
        // 3. Update herald column to 1
        await db.promise().execute(
          'UPDATE subscribers SET herald = 1 WHERE subscriberId = ?',
          [subscriberId]
        );
        // 4. Send email
        try {
          let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
            tls: { rejectUnauthorized: false }
          });
          await transporter.sendMail({
            from: `"Herald" <${process.env.SMTP_USER}>`,
            to: email,
            subject: 'Herald Account Activated',
            text: `Hello ${firstname} ${lastname},\n\nYour herald account has been activated.\n\nThank you!`,
            html: `<p>Hello <b>${firstname} ${lastname}</b>,<br>Your herald account has been activated.<br>Thank you!</p>`
          });
        } catch (emailError) {
          console.error('Email sending failed:', emailError);
        }
        return res.json({ message: 'Thank you for activating your herald account.' });
      } else {
        // Not a herald, but exists as subscriber
        return res.status(400).json({ error: 'User exists but is not a herald.' });
      }
    } else {
      // New user: use transaction
      const conn = await db.promise().getConnection();
      try {
        await conn.beginTransaction();
        // Insert into subscribers (herald = 2)
        const [result] = await conn.execute(
          'INSERT INTO subscribers (firstname, lastname, email, herald) VALUES (?, ?, ?, 2)',
          [firstname, lastname, email]
        );
        const subscriberId = result.insertId;
        // Generate unique ref (ensure not already in use)
        let ref, refExists;
        do {
          ref = generateUniqueRef(firstname, lastname, email);
          const [rows] = await conn.execute('SELECT 1 FROM virtual_centre_ref WHERE ref = ?', [ref]);
          refExists = rows.length > 0;
        } while (refExists);
        // Insert into virtual_centre_ref
        await conn.execute(
          'INSERT INTO virtual_centre_ref (vc_managerId, ref, zoneId, familyId) VALUES (?, ?, 98, 98)',
          [subscriberId, ref]
        );
        await conn.commit();
        // Send email
        try {
          let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
            tls: { rejectUnauthorized: false }
          });
          await transporter.sendMail({
            from: `"Herald" <${process.env.SMTP_USER}>`,
            to: email,
            subject: 'Herald Account Created and Activated',
            text: `Hello ${firstname} ${lastname},\n\nYour herald account has been created and activated.\nReferral code: ${ref}\n\nThank you!`,
            html: `<p>Hello <b>${firstname} ${lastname}</b>,<br>Your herald account has been created and activated.<br><b>Referral code:</b> ${ref}<br>Thank you!</p>`
          });
        } catch (emailError) {
          console.error('Email sending failed:', emailError);
        }
        return res.json({ message: 'Your herald account has been successfully created and activated. Thank you.' });
      } catch (err) {
        await conn.rollback();
        console.error('Transaction error:', err);
        return res.status(500).json({ error: 'Database error', details: err.message });
      } finally {
        conn.release();
      }
    }
  } catch (err) {
    console.error('Error in /herald-activate:', err);
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Test database connection endpoint
app.get('/test-db', async (req, res) => {
  try {
    await db.promise().query('SELECT 1');
    res.json({ success: true, message: 'Database connection successful' });
  } catch (err) {
    console.error('Database test error:', err);
    res.status(500).json({ error: 'Database connection failed', details: err.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Herald Activate API'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
}); 