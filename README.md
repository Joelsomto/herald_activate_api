# Herald Activate API

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create MySQL database and table:**
   ```sql
   CREATE DATABASE IF NOT EXISTS herald_activate;
   USE herald_activate;
   CREATE TABLE submissions (
     id INT AUTO_INCREMENT PRIMARY KEY,
     firstname VARCHAR(100),
     lastname VARCHAR(100),
     email VARCHAR(255),
     ref VARCHAR(255),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

3. **Configure environment variables:**
   - Copy `.env` and fill in your MySQL and SMTP credentials.

4. **Run the server:**
   ```bash
   npm start
   ```

## API Usage

- **POST /submit**
  - Params (JSON):
    - `Firstname` (string, required)
    - `Lastname` (string, required)
    - `Email` (string, required)
  - Returns: `{ success: true, ref: "..." }` on success

## Email
- On successful submission, a confirmation email is sent to the provided email address with the referral code. 