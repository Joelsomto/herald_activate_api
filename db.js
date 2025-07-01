require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'herald_activate',
  port: process.env.DB_PORT || 3306,
  connectTimeout: 60000
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

db.on('error', (err) => {
  console.error('MySQL connection error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('Reconnecting to MySQL...');
  }
});

module.exports = db; 