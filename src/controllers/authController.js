const bcrypt = require('bcrypt');
const pino = require('pino');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const UserData = require('../models/userData');
const Mailer = require('../utils/sendMail');
const TRUSTED_DOMAINS = require('../config/trustedDomains');

const logger = pino();

// --- Response Helpers ---
const sendSuccess = (res, data, status = 200) => {
    const response = { state: 'success' };
    if (data) {
        response.data = data;
    }
    res.status(status).json(response);
};

const sendError = (res, message, status = 400) => {
    res.status(status).json({ state: 'error', message });
};


const checkData = async (req, res) => {
  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      let token;
      try {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserData.findById(decoded.id);

        if (!user) {
          return sendError(res, 'User not found', 401);
        }

        if (user.mailtoken !== 0) {
          logger.info(`User ${user.userName} attempted login but is not verified.`);
          return sendSuccess(res, { verified: false });
        }

        if (user.unlockedTime > Date.now()) {
          logger.info(`User ${user.userName} successfully logged in via token.`);
          sendSuccess(res, { username: user.userName });
        } else {
          logger.info(`User ${user.userName} attempted login but session is expired.`);
          sendSuccess(res, { sessionExpired: true });
        }
        return;
      } catch (error) {
        return sendError(res, 'Not authorized, token failed', 401);
      }
    }

    const { userName, password } = req.body;

    const user = await UserData.findOne({ userName });
    if (!user) {
      return sendError(res, 'Invalid credentials', 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return sendError(res, 'Invalid credentials', 401);
    }

    if(user.mailtoken !== 0){
        logger.info(`User ${userName} attempted login but is not verified.`);
        return sendSuccess(res, { verified: false });
    }

    if (user.unlockedTime > Date.now()) {
        logger.info(`User ${userName} successfully logged in.`);
        const token = jwt.sign({ id: user._id, username: user.userName }, process.env.JWT_SECRET, {
            expiresIn: '3d',
        });
        sendSuccess(res, { token });
    } else {
        logger.info(`User ${userName} attempted login but session is expired.`);
        sendSuccess(res, { sessionExpired: true });
    }
  } catch (error) {
    logger.error({ err: error }, 'Error in checkData');
    sendError(res, 'Server error', 500);
  }
};

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username) return sendError(res, 'Username is required.');
  if (!password) return sendError(res, 'Password is required.');
  if (!email) return sendError(res, 'Email is required.');


  const userName = username.toLowerCase();
  try {
    let existingUser = await UserData.findOne({ userName });
    if (existingUser) {
      return sendError(res, 'This username is taken!');
    }
    existingUser = await UserData.findOne({email});
    if (existingUser) {
      return sendError(res, 'This email is already in use!');
    }

    const domain = email.split('@').pop().toLowerCase();
    if (!TRUSTED_DOMAINS.has(domain)) {
        return sendError(res, 'Please use a trusted email provider, such as Gmail or Outlook.');
    }

    const mailtoken = Math.floor(100000 + Math.random() * 900000);
    Mailer.sendEmail(email, mailtoken);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new UserData({
      userName,
      password: hashedPassword,
      email,
      mailtoken,
      earnToken: "iufdghdofiusdofgiusdhgoisudhg", // This should probably be generated securely
      unlockedTime: Date.now() + 1000 * 60 * 60 * 72
    });
    
    await newUser.save();
    
    logger.info(`User ${userName} signed up successfully.`);
    sendSuccess(res, null, 201);
  } catch (error) {
    logger.error({ err: error }, 'Error during signup');
    sendError(res, 'Server error', 500);
  }
};

const verify = async (req, res) => {
  const { username, email, password, code } = req.body;

  if (!username) return sendError(res, 'Username is required.');
  if (!password) return sendError(res, 'Password is required.');
  if (!email) return sendError(res, 'Email is required.');
  if (!code) return sendError(res, 'Verification code is required.');

  try {
    const user = await UserData.findOne({userName: username.toLowerCase(), email, mailtoken: code});
    if(!user){
      return sendError(res, 'Invalid verification code or user details.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendError(res, 'Invalid verification code or user details.');
    }

    user.mailtoken = 0;
    await user.save();

    logger.info(`User ${username} successfully verified their email.`);
    const token = jwt.sign({ id: user._id, username: user.userName }, process.env.JWT_SECRET, {
        expiresIn: '3d',
    });
    sendSuccess(res, { token });
  } catch(error) {
      logger.error({ err: error }, 'Error during email verification.');
      sendError(res, 'Server error', 500);
  }
}

const resendcode = async (req, res) => {
  const { email } = req.body;
  if (!email) return sendError(res, 'Email is required.');

  try {
    const user = await UserData.findOne({ email });
    if(!user){
      return sendError(res, 'Email not found!');
    }

    const mailtoken = Math.floor(100000 + Math.random() * 900000);
    user.mailtoken = mailtoken;
    await user.save();

    Mailer.sendEmail(email, mailtoken);
    logger.info(`Resent verification code to ${email}`);
    sendSuccess(res);
  } catch(error) {
    logger.error({ err: error }, 'Error resending verification code.');
    sendError(res, 'Server error', 500);
  }
}

const changePass = async (req, res) => {
  const { userName, password, newpass } = req.body;

  if (!userName) return sendError(res, 'Username is required.');
  if (!password) return sendError(res, 'Current password is required.');
  if (!newpass) return sendError(res, 'New password is required.');

  const username = userName.toLowerCase();
  try {
    const user = await UserData.findOne({ userName: username });

    if(!user) {
      return sendError(res, 'User not found!', 404);
    };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return sendError(res, 'Incorrect old password!', 401);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newpass, salt);
    user.password = hashedPassword;

    await user.save();
    
    logger.info(`User ${username} successfully changed their password.`);
    sendSuccess(res);
  } catch (error) {
    logger.error({ err: error }, 'Error changing password.');
    sendError(res, 'Server error', 500);
  }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) return sendError(res, 'Email is required.');

    try {
        const user = await UserData.findOne({ email });
        if (!user) {
            logger.info(`Password reset requested for non-existent email: ${email}`);
            return sendSuccess(res, { message: 'If a user with that email exists, a password reset link has been sent.' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.passwordResetExpires = Date.now() + 3600000; // 1 hour

        await user.save();

        try {
            await Mailer.sendPasswordResetEmail(user.email, resetToken);
            logger.info(`Sent password reset email to ${user.email}`);
            sendSuccess(res, { message: 'If a user with that email exists, a password reset link has been sent.' });
        } catch (err) {
            logger.error({ err }, 'Failed to send password reset email.');
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save();
            return sendError(res, 'Failed to send password reset email.', 500);
        }

    } catch (error) {
        logger.error({ err: error }, 'Error in forgotPassword controller.');
        sendError(res, 'Server error', 500);
    }
};

const resetPassword = async (req, res) => {
    const { token } = req.query;
    const { password } = req.body;

    if (!token || !password) {
        return sendError(res, 'Token and new password are required.');
    }

    try {
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await UserData.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() },
        });

        if (!user) {
            return sendError(res, 'Password reset token is invalid or has expired.', 400);
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save();

        logger.info(`Password has been reset successfully for user: ${user.userName}`);
        sendSuccess(res, { message: 'Password has been reset successfully.' });

    } catch (error) {
        logger.error({ err: error }, 'Error resetting password.');
        sendError(res, 'Server error', 500);
    }
};

module.exports = { checkData, signup, verify, resendcode, changePass, forgotPassword, resetPassword };