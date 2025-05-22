const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const UserData = require("./models/userDataModel");
const Data = require("./models/dataModel");


const app = express();
const port = 3000;

// MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());

const uri = "mongodb+srv://BigB132:Bofe2011@cluster.zzvjfkv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster";

mongoose.connect(uri).then(() => {
  console.log("Connected to MongoDB (Mongoose)");
}).catch((err) => {
  console.error("Connection error:", err);
});

app.post('/checkData', async (req, res) => {
  console.log("checking data")
  const username = req.body.userName;
  const password = req.body.password;

  if(typeof username === "undefined"){
    res.json({type: "unknown", state: "error", message: "No value as username entered!"})
    return;
  }

  if(typeof password === "undefined"){
    res.json({type: "unknown", state: "error", message: "No value as password entered!"})
    return;
  }

  try{
    const user = await UserData.findOne({userName: username, password});
    if(!user){
      res.json({state: "error", message: "Nutzer existiert nicht!"})
      return;
    }
  } catch {};


  res.json({state: "success"})
})

app.post('/signup', async (req, res) => {
  const username = req.body.userName;
  const password = req.body.password;

  if(typeof username === "undefined"){
    res.json({state: "error", message: "Kein gültiger Nutzername!"})
    return;
  }
  if(typeof password === "undefined"){
    res.json({state: "error", message: "Kein gültiges Passwort!"})
    return;
  }

  const test = await UserData.findOne({userName: username});

  if(test){
    res.json({state: "error", message: "Dieser Nutzer existiert bereits!"});
    return;
  }
  
  const newUser = new UserData({
    userName: username,
    password,
  });
  
  await newUser.save();
  
  res.json({state: "success"})
})

app.post("/getList", async (req, res) => {
  const username = req.body.userName;
  const password = req.body.password;
  const route = req.body.route;

  if(typeof username === "undefined"){
    res.json({type: "unknown", state: "error", message: "No value as username entered!"})
    return;
  }

  if(typeof password === "undefined"){
    res.json({type: "unknown", state: "error", message: "No value as password entered!"})
    return;
  }

  try{
    const user = await UserData.findOne({userName: username, password});
    if(!user){
      res.json({state: "error", message: "Nutzer existiert nicht!"})
      return;
    }
  } catch {};

  const data = await Data.find({owner: username, route});
  
  let lessons = []
  data.forEach((item) => {
    lessons.push({ name: item.name, type: item.type });
  });

  console.log(lessons)

  res.json({ lessons: lessons });
});

app.post('/createFolder', async (req, res) => {
  const username = req.body.userName;
  const password = req.body.password;
  const route = req.body.route;
  const folderName = req.body.folderName;

  if(typeof username === "undefined"){
    res.json({type: "unknown", state: "error", message: "No value as username entered!"})
    return;
  }

  if(typeof password === "undefined"){
    res.json({type: "unknown", state: "error", message: "No value as password entered!"})
    return;
  }

  try{
    const user = await UserData.findOne({userName: username, password});
    if(!user){
      res.json({state: "error", message: "Nutzer existiert nicht!"})
      return;
    }
  } catch {};
  
  const newFolder = new Data({
    owner: username,
    id: 0,
    route,
    type: 1,
    name: folderName,
  })
  await newFolder.save();

  res.json({state: "success"});
})

app.post('/rename', async (req, res) => {
  const username = req.body.userName;
  const password = req.body.password;
  const route = req.body.route;
  const oldname = req.body.oldName;
  const newname = req.body.newName;

  if(typeof username === "undefined"){
    res.json({type: "unknown", state: "error", message: "No value as username entered!"})
    return;
  }

  if(typeof password === "undefined"){
    res.json({type: "unknown", state: "error", message: "No value as password entered!"})
    return;
  }

  try{
    const user = await UserData.findOne({userName: username, password});
    if(!user){
      res.json({state: "error", message: "Nutzer existiert nicht!"})
      return;
    }
  } catch {};

  const data = await Data.findOne({name: oldname, route, owner: username});
  if(!data) return;
  data.name = newname;
  await data.save();

  res.json({state: "success"});
})

app.post('/delete', async (req, res) => {
  const username = req.body.userName;
  const password = req.body.password;
  const route = req.body.route;
  const name = req.body.name;

  if(typeof username === "undefined"){
    res.json({type: "unknown", state: "error", message: "No value as username entered!"})
    return;
  }

  if(typeof password === "undefined"){
    res.json({type: "unknown", state: "error", message: "No value as password entered!"})
    return;
  }

  try{
    const user = await UserData.findOne({userName: username, password});
    if(!user){
      res.json({state: "error", message: "Nutzer existiert nicht!"})
      return;
    }
  } catch {};

  await Data.findOneAndDelete({name, route, owner: username})

  res.json({state: "success"});
})

app.post('/savelist', async (req, res) => {
  const username = req.body.userName;
  const password = req.body.password;
  const route = req.body.route;
  const list = req.body.vocabList;
  const name = req.body.name;

  
  if(typeof username === "undefined"){
    res.json({type: "unknown", state: "error", message: "No value as username entered!"})
    return;
  }
  
  if(typeof password === "undefined"){
    res.json({type: "unknown", state: "error", message: "No value as password entered!"})
    return;
  }
  
  try{
    const user = await UserData.findOne({userName: username, password});
    if(!user){
      res.json({state: "error", message: "Nutzer existiert nicht!"})
      return;
    }
  } catch {};
  
  if(!name){
    res.json({state: "error", message: "Bitte gebe der Liste einen Namen!"})
    return;
  }
  const data = await Data.findOne({owner: username, route, name});
  if(data){
    res.json({state: "error", message: "Dieser Name ist bereits vergeben."})
    return;
  }
  
  const newData = new Data({
    owner: username,
    route, 
    type: 0,
    id: 450498,
    name,
  })
  list.forEach((item, index) => {
    newData.list.push({deutsch: item.word, english: item.translation})
  })

  await newData.save()

  res.json({state: "success"})
})

app.post("/getVocabulary", async (req, res) => {
  const username = req.body.userName;
  const password = req.body.password;
  const route = req.body.route;
  const lesson = req.body.lesson;

  if(typeof username === "undefined"){
    res.json({type: "unknown", state: "error", message: "No value as username entered!"})
    return;
  }

  if(typeof password === "undefined"){
    res.json({type: "unknown", state: "error", message: "No value as password entered!"})
    return;
  }

  try{
    const user = await UserData.findOne({userName: username, password});
    if(!user){
      res.json({state: "error", message: "Nutzer existiert nicht!"})
      return;
    }
  } catch {};

  const data = await Data.findOne({owner: username, route, name: lesson});

  let list = [];
  data.list.forEach((item, index) => {
    console.log(item)
    list.push({german: item.deutsch, translation: item.english});
  })

  console.log(list)

  res.json({list: list})
});

app.post('/editList', async (req, res) => {
  const username = req.body.userName;
  const password = req.body.password;
  const route = req.body.route;
  const lesson = req.body.lesson;
  const list = req.body.vocabList

  if(typeof username === "undefined"){
    res.json({type: "unknown", state: "error", message: "No value as username entered!"})
    return;
  }

  if(typeof password === "undefined"){
    res.json({type: "unknown", state: "error", message: "No value as password entered!"})
    return;
  }

  try{
    const user = await UserData.findOne({userName: username, password});
    if(!user){
      res.json({state: "error", message: "Nutzer existiert nicht!"})
      return;
    }
  } catch {};

  console.log(list)
  
  const data = await Data.findOne({owner: username, route, name: lesson});
  if(!data) return;
  data.list = [];
  list.forEach((item, index) => {
    data.list.push({deutsch: item.german, english: item.translation})
  })
  await data.save();
  res.send({state: "success"});
})

// Server starten
app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});