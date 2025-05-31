const UserData = require('../models/userDataModel');

const authenticateUser = async (req, res, next) => {
  const { userName, password } = req.body;

  if (!userName) {
    return res.json({
      type: "unknown", 
      state: "error", 
      message: "No value as username entered!"
    });
  }

  if (!password) {
    return res.json({
      type: "unknown", 
      state: "error", 
      message: "No value as password entered!"
    });
  }

  try {
    const user = await UserData.findOne({ userName, password });
    if (!user) {
      return res.json({
        state: "error", 
        message: "Nutzer existiert nicht!"
      });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.json({
      state: "error", 
      message: "Authentication failed"
    });
  }
};

module.exports = { authenticateUser };