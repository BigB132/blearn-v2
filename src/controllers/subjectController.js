const UserData = require("../models/userData");

const createSubject = async (req, res) => {
    const { username, password, name, color } = req.body;
    let user;

    if(!username){
        res.json({state: "error", message: "No value as username entered!"})
        return;
      }
    
      if(!password){
        res.json({state: "error", message: "No value as password entered!"})
        return;
      }
    
      try{
        user = await UserData.findOne({userName: username, password});
        if(!user){
          res.json({state: "error", message: "User doesn't exist!"})
          return;
        }
      } catch {};

      let nameTaken = false;
      user.subjects.forEach((v, i) =>{
        if(v.name == name){
          return nameTaken = true;
        }
      })

      if(!nameTaken){
        user.subjects.push({name, color, id: name.toLowerCase()});
      } else {
         return res.status(400).json({message: "Name already taken!"});
      }

      await user.save();
      return res.status(200).json({state: "success"})
};

const getSubjects = async (req, res) => {
  const { username, password } = req.body;
  let user;

  if(!username){
    res.json({state: "error", message: "No value as username entered!"})
    return;
  }
  
  if(!password){
    res.json({state: "error", message: "No value as password entered!"})
    return;
  }

  try{
    user = await UserData.findOne({userName: username, password});
    if(!user){
      res.json({state: "error", message: "User doesn't exist!"})
      return;
    }
  } catch {};
  
  for (let day = 0; day < 5; day++) {
    if(!user.schedule[day]) return;
    for (let period = 0; period < 8; period++) {
      const subjectId = user.schedule[day][period];
      if (subjectId) {
        const subject = user.subjects.find(v => v.id === subjectId);
        if (subject) {
          subject.usageCount = (subject.usageCount || 0) + 1;
        }
      }
    }
  }


  return res.status(200).json({subjects: user.subjects, state: "success"})

}

const editSubject = async (req, res) => {
  const { username, password, subjectId, name, color } = req.body;
  let user;

  if(!username){
    res.json({state: "error", message: "No value as username entered!"})
    return;
  }

  if(!password){
    res.json({state: "error", message: "No value as password entered!"})
    return;
  }

  try{
    user = await UserData.findOne({userName: username, password});
    if(!user){
      res.json({state: "error", message: "User doesn't exist!"})
      return;
    }
  } catch {};

  const subject = user.subjects.find(v => v.id == subjectId);
  if (!subject) {
    return res.status(404).json({ state: "error", message: "Subject not found" });
  }

  subject.name = name;
  subject.color = color;
  user.markModified("subjects");
  await user.save();

  return res.status(200).json({ state: "success" });
};

const deleteSubject = async (req, res) => {
  const { username, password, subjectId } = req.body;
  let user;

  if(!username){
    res.json({state: "error", message: "No value as username entered!"})
    return;
  }

  if(!password){
    res.json({state: "error", message: "No value as password entered!"})
    return;
  }

  try{
    user = await UserData.findOne({userName: username, password});
    if(!user){
      res.json({state: "error", message: "User doesn't exist!"})
      return;
    }
  } catch {};

  user.subjects.forEach((v, i) => {
    if(v.id == subjectId){
      user.subjects.splice(i, 1);
      return
    }
  })

  await user.save();
  return res.status(400).json({state: "success"})
}

module.exports = { createSubject, getSubjects, editSubject, deleteSubject };