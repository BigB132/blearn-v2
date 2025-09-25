const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail', // or 'Outlook', or use `host`, `port`, `secure` for custom SMTP
    auth: {
      user: 'blearn.noreply@gmail.com',
      pass: process.env.apppass, // not your Gmail password — use App Passwords
    },
});

async function sendEmail(address, code) {
  let info = await transporter.sendMail({
    from: '"Blearn" <blearn.noreply@gmail.com>',
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

  console.log('Verification email sent: %s', info.messageId);
}

async function sendPasswordResetEmail(address, token) {
    const resetUrl = `http://localhost:3000/api/auth/reset-password?token=${token}`; // This should be a frontend URL

    let info = await transporter.sendMail({
        from: '"Blearn" <blearn.noreply@gmail.com>',
        to: address,
        subject: 'Password Reset Request',
        html: `
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8" />
        <title>Password Reset</title>
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
            .button {
                display: inline-block;
                padding: 10px 20px;
                font-size: 16px;
                color: #ffffff;
                background-color: #007bff;
                text-decoration: none;
                border-radius: 5px;
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
            <h2>Password Reset Request</h2>
            <p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
            <p>Please click on the button below, or paste this link into your browser to complete the process:</p>
            <a href="${resetUrl}" class="button">Reset Your Password</a>
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
            <div class="footer">
                This link is valid for one hour.
            </div>
        </div>
        </body>
        </html>
        `,
    });

    console.log('Password reset email sent: %s', info.messageId);
}


module.exports = { sendEmail, sendPasswordResetEmail };