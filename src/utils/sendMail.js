const nodemailer = require('nodemailer');

async function sendEmail(address, code) {
  let transporter = nodemailer.createTransport({
    service: 'Gmail', // or 'Outlook', or use `host`, `port`, `secure` for custom SMTP
    auth: {
      user: 'blearn.noreply@gmail.com',
      pass: process.env.apppass, // not your Gmail password — use App Passwords
    },
  });

  let info = await transporter.sendMail({
    from: '"Blearn" blearn.noreply@gmail.com',
    to: address,
    subject: 'Account verification',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8" />
    <title>Verification Code</title>
    <style>
        .container {
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        padding: 20px;
        border: 1px solid #dddddd;
        border-radius: 8px;
        background-color: #f9f9f9;
        }
        .code {
        font-size: 32px;
        font-weight: bold;
        letter-spacing: 10px;
        color: #333;
        background-color: #eee;
        padding: 15px;
        text-align: center;
        border-radius: 6px;
        margin-top: 20px;
        }
        .footer {
        margin-top: 30px;
        font-size: 12px;
        color: #777;
        text-align: center;
        }
    </style>
    </head>
    <body>
    <div class="container">
        <h2>Your verification code</h2>
        <p>Hello,</p>
        <p>Use the following code, to verify your email address:</p>

        <div class="code">${code}</div>

        <div class="footer">
        If you didn't registered at Blearn, you can ignore this email.
        </div>
    </div>
    </body>
    </html>
    `,
  });

  console.log('Message sent: %s', info.messageId);
}

async function sendMailResetPass(address, username, password) {
  let transporter = nodemailer.createTransport({
    service: 'Gmail', // or 'Outlook', or use `host`, `port`, `secure` for custom SMTP
    auth: {
      user: 'blearn.noreply@gmail.com',
      pass: process.env.apppass, // not your Gmail password — use App Passwords
    },
  });

  let info = await transporter.sendMail({
    from: '"Blearn" blearn.noreply@gmail.com',
    to: address,
    subject: 'Account verification',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8" />
    <title>Verification Code</title>
    <style>
        .container {
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        padding: 20px;
        border: 1px solid #dddddd;
        border-radius: 8px;
        background-color: #f9f9f9;
        }
        .code {
        font-size: 32px;
        font-weight: bold;
        letter-spacing: 10px;
        color: #333;
        background-color: #eee;
        padding: 15px;
        text-align: center;
        border-radius: 6px;
        margin-top: 20px;
        }
        .footer {
        margin-top: 30px;
        font-size: 12px;
        color: #777;
        text-align: center;
        }
    </style>
    </head>
    <body>
    <div class="container">
        <h2>Password reset</h2>
        <p>Hello ${username},</p>
        <p>Use the following password, to login to your account:</p>

        <div class="code">${password}</div>

        <div class="footer">
        If you didn't reset your password at Blearn, please use this password to login and change your password back.
        </div>
    </div>
    </body>
    </html>
    `,
  });

  console.log('Message sent: %s', info.messageId);
}

module.exports = {sendEmail, sendMailResetPass}