const UserData = require('../models/userData');
const Mailer = require('../utils/sendMail');
const webpush = require('web-push');

const publicVapidKey = "BOQ2Z4glbaN-5k2fkC1lOkcqAynfYnLTjVGThJ9AQiH1p78gFC1jIDWFBDQ8NS8svMn-DhXoNiJGdyPMMqe9BfQ";
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails(
  'mailto:test@example.com',
  publicVapidKey,
  privateVapidKey
);

const subscribe = async (req, res) => {
    const { username, subscription } = req.body;
    try {
        const user = await UserData.findOneAndUpdate(
            { userName: username },
            { pushSubscription: subscription },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(201).json({ message: 'Subscription saved.' });
    } catch (error) {
        console.error('Subscription error:', error);
        res.status(500).json({ message: 'Server error while saving subscription' });
    }
};

const checkData = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await UserData.findOne({ userName, password });
    if (!user) {
      return res.json({ state: "error", message: "User doesn't exist!" });
    }

    if(user.mailtoken !== 0){
      res.json({state: "success", verified: "false"})
      console.log(`Checked data for ${userName}:${password} and told him that he isn't verified`)
      return
    }

    if (user.unlockedTime > Date.now()) {
      res.json({ state: "success" });
      console.log(`Checked data for ${userName}:${password}`);
    } else {
      res.json({ state: "success", sessionExpired: "true" });
      console.log(`Checked data for ${userName}:${password} and told him that he is expired.`);
    }
  } catch (error) {
    console.error('Check data error:', error);
    res.json({ state: "error", message: "Server error" });
  }
};

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username) {
    return res.json({ state: "error", message: "No valid username!" });
  }
  if (!password) {
    return res.json({ state: "error", message: "No valid password!" });
  }

  if(!email) {
    return res.json({ state: "error", message: "No valid email!" });
  }


  const userName = username.toLowerCase();
  try {
    let existingUser = await UserData.findOne({ username });
    if (existingUser) {
      return res.json({ state: "error", message: "This username is taken!" });
    }
    existingUser = await UserData.findOne({email});
    if (existingUser) {
      return res.json({ state: "error", message: "This email is already in use!" });
    }

    const TRUSTED_DOMAINS = new Set([
        'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com',
        'icloud.com', 'protonmail.com', 'zoho.com', 'aol.com',
        'live.com', 'msn.com', 'yandex.com', 'mail.com', 'gmx.de'
        // Add corporate domains you trust
    ]);

    function isTrustedEmail(email) {
        const domain = email.split('@').pop().toLowerCase();
        return TRUSTED_DOMAINS.has(domain);
    }

    if(!isTrustedEmail(email)){
      res.json({state: "error", message: "Please use a trusted email provider, such as Gmail or Outlook"})
      return
    }

    const mailtoken = Math.floor(100000 + Math.random() * 900000);
    Mailer.sendEmail(email, mailtoken);
    
    const newUser = new UserData({
      userName,
      password,
      email,
      mailtoken,
      earnToken: "iufdghdofiusdofgiusdhgoisudhg",
      unlockedTime: Date.now() + 1000 * 60 * 60 * 72
    });
    
    await newUser.save();
    
    console.log(`${userName}:${password} signed up`);
    res.json({ state: "success" });
  } catch (error) {
    console.error('Signup error:', error);
    res.json({ state: "error", message: "Server error" });
  }
};

const verify = async (req, res) => {
  const { username, email, password, code } = req.body;

  if (!username) {
    return res.json({ state: "error", message: "No valid username!" });
  }
  if (!password) {
    return res.json({ state: "error", message: "No valid password!" });
  }

  if(!email) {
    return res.json({ state: "error", message: "No valid email!" });
  }

  if(!code) {
    return res.json({ state: "error", message: "No valid code!" });
  }

  const user = await UserData.findOne({userName: username, password, email, mailtoken: code});
  if(!user){
    res.json({state: "error", message: "Code is invalid!"});
    return;
  } else {
    user.mailtoken = 0
    await user.save();
    res.json({state: "success"})
  }
}

const resendcode = async (req, res) => {
  const email = req.body.email;
  const mailtoken = Math.floor(100000 + Math.random() * 900000);

  const user = await UserData.findOne({email})
  if(!user){
    res.send({state: "error", message: "Email not found!"});
    return;
  }

  user.mailtoken = mailtoken;
  await user.save();

  Mailer.sendEmail(email, mailtoken)
  res.json({state: "success"})
}

const changePass = async (req, res) => {
  const { userName, password, newpass } = req.body;

  if (!userName) {
    return res.json({ state: "error", message: "No valid username!" });
  }
  if (!password) {
    return res.json({ state: "error", message: "No valid password!" });
  }

  if(!newpass) {
    return res.json({ state: "error", message: "No valid new password!" });
  }


  const username = userName.toLowerCase();
  try {
    console.log(username)
    const existingUser = await UserData.findOne({ userName: username });

    if(!existingUser) {
      console.log("no user found")
      return
    };

    existingUser.password = newpass;

    await existingUser.save();
    
    console.log(`${username}:${password} changed his password`);
    res.json({ state: "success" });
  } catch (error) {
    console.error('Error:', error);
    res.json({ state: "error", message: "Server error" });
  }
};

const resetPass = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ state: "error", message: "No valid email!" });
  }

  const user = await UserData.findOne({email});

  const username = user.userName;
  const length = 8;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  user.password = password;
  await user.save();

  await Mailer.sendMailResetPass(email, username, password);

  res.json({state: "success"});

}


module.exports = { checkData, signup, verify, resendcode, changePass, resetPass, subscribe };