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
      'INSERT INTO submissions (firstname, lastname, email, ref) VALUES (?, ?, ?, ?)',
      [Firstname, Lastname, Email, ref]
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