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
  const username = req.body.userName;
  const password = req.body.password;

  console.log()

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

  console.log(`Checked data for ${username}:${password}`);
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
    earnToken: "iufdghdofiusdofgiusdhgoisudhg"
  });
  
  await newUser.save();
  
  console.log(`${username}:${password} signed up`)
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
  
  console.log(`${username} requested his list with this route: ${route}`)
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

  console.log(`${username} created a folder called "${folderName}"`);
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

  console.log(`${username} renamed his file "${oldname} in ${route} to ${newname}"`)
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

  const data = await Data.find({owner: username});

  const item = await Data.findOne({owner: username, route, name})

  if(item.type === 1){
    for (const dataItem of data){
      if(dataItem.route.startsWith(`${route}/${name}`)){
        await Data.deleteOne({_id: dataItem._id});
      };
    };
  };

  await Data.findOneAndDelete({name, route, owner: username})

  console.log(`${username} deleted his file "${name}" in ${route}`)
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

  function generate16CharString() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 16; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // Function to generate unique ID with collision checking
  async function generateUniqueId(model, fieldName = 'customId', maxRetries = 100) {
    let attempts = 0;
    
    while (attempts < maxRetries) {
      const newId = generate16CharString();
      
      try {
        // Check if ID already exists
        const existing = await Data.findOne({ id: newId });
        
        if (!existing) {
          return newId; // ID is unique, return it
        }
        
        attempts++;
        console.log(`ID collision detected: ${newId}. Attempt ${attempts}/${maxRetries}`);
        
      } catch (error) {
        console.error('Error checking ID uniqueness:', error);
        throw error;
      }
    }
  
    throw new Error(`Failed to generate unique ID after ${maxRetries} attempts`);
  }

  let id = await generateUniqueId()

  
  const newData = new Data({
    owner: username,
    route, 
    type: 0,
    id,
    name,
  })
  list.forEach((item, index) => {
    newData.list.push({deutsch: item.word, english: item.translation})
  })

  await newData.save()

  console.log(`${username} created a list called "${name}" in ${route}. The id is "${id}"`)
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
    list.push({german: item.deutsch, translation: item.english});
  })

  console.log(`${username} loaded his list "${lesson}" from ${route}`)
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
  
  const data = await Data.findOne({owner: username, route, name: lesson});
  if(!data) return;
  data.list = [];
  list.forEach((item, index) => {
    data.list.push({deutsch: item.german, english: item.translation})
  })
  await data.save();

  console.log(`${username} edited his list "${name}" in ${route}`);
  res.send({state: "success"});
})

app.post('/fetchid', async (req, res) => {
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
  if(!data) return;

  console.log(`${username} asked for the id of "${lesson}" in ${route}`)
  res.json({state: "success", id: data.id});
})

app.post('/importlist', async (req, res) => {
  const username = req.body.userName;
  const password = req.body.password;
  const oldId = req.body.id;
  const route = req.body.route;
  const name = req.body?.name;

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

  const data = await Data.findOne({id: oldId});
  if(!data) return;

  let newName = "Neue Liste"
  
  if(name){
    newName = name;
  } else {
    newName = data.name;
  }

  function generate16CharString() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 16; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // Function to generate unique ID with collision checking
  async function generateUniqueId(model, fieldName = 'customId', maxRetries = 100) {
    let attempts = 0;
    
    while (attempts < maxRetries) {
      const newId = generate16CharString();
      
      try {
        // Check if ID already exists
        const existing = await Data.findOne({ id: newId });
        
        if (!existing) {
          return newId; // ID is unique, return it
        }
        
        attempts++;
        console.log(`ID collision detected: ${newId}. Attempt ${attempts}/${maxRetries}`);
        
      } catch (error) {
        console.error('Error checking ID uniqueness:', error);
        throw error;
      }
    }
  
    throw new Error(`Failed to generate unique ID after ${maxRetries} attempts`);
  }

  let id = await generateUniqueId()

  const newData = new Data({
    owner: username,
    id,
    route,
    type: 0,
    name: newName,
    list: data.list,
  })

  await newData.save();

  console.log(`${username} imported ${data.owner}'s list "${data.name}" from ${data.route} to his filed and named it ${newName} and put it into ${route}`)
  res.json({state: "success",})
})

app.get('/ad/:userName', async (req, res) => {
  const username = req.params.userName;
  
  const length = 16;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  console.log(token)

  const userData = await UserData.findOne({ userName: username });
  console.log(username)
  userData.earnToken = token;
  userData.save();

  res.send(
    `
    <!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Werbung – Blearn</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 flex flex-col transition-colors duration-300">


  <!-- Header -->
  <header class="bg-white dark:bg-gray-800 shadow-md py-4 px-6 flex justify-between items-center transition-colors duration-300">
    <h1 class="text-xl font-bold text-blue-700 dark:text-blue-400">Blearn</h1>
    <button href="https://blearn.netlify.app/logout" class="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition-all">
      Logout
    </button>
  </header>

  <!-- Main Content -->
  <main class="flex-1 p-6 flex items-center justify-center">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md dark:shadow-gray-900/20 border dark:border-gray-700 transition-all duration-300 text-center max-w-md w-full">
      <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-6 transition-colors duration-300">Werbung</h2>
      
      <div class="mb-8">
        <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
          </svg>
        </div>
        <p class="text-gray-600 dark:text-gray-300 text-lg mb-6 transition-colors duration-300">
          Jetzt Werbung schauen und Blearn für heute freischalten!
        </p>
      </div>
      
      <a id="earnBtn" href="https://blearnend.onrender.com/earn/${username}/${token}" class="w-full px-6 py-3 bg-green-600 dark:bg-green-700 text-white text-lg font-semibold rounded-md hover:bg-green-700 dark:hover:bg-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
        Los geht's!
      </a>
      
      <div class="mt-6 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
        <p>Klicken Sie auf "Los geht's!", um zu beginnen</p>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer class="bg-white dark:bg-gray-800 text-center text-sm py-4 border-t dark:border-gray-700 mt-8 text-gray-500 dark:text-gray-400 transition-colors duration-300">
    © 2025 Lernplattform. Alle Rechte vorbehalten.
  </footer>

  <!-- Script -->
  <script>
    // Dark mode functionality
    class ThemeManager {
      constructor() {
        this.init();
        this.setupEventListeners();
      }

      init() {
        // Get theme from in-memory storage or default to 'system'
        const savedTheme = this.getTheme() || 'system';
        this.applyTheme(savedTheme);
        this.updateActiveButton(savedTheme);
      }

      getTheme() {
        // Since we can't use localStorage in artifacts, we'll use a simple variable
        return window.currentTheme || 'system';
      }

      setTheme(theme) {
        window.currentTheme = theme;
      }

      applyTheme(theme) {
        const html = document.documentElement;
        
        if (theme === 'system') {
          // Use system preference
          const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          html.classList.toggle('dark', systemDark);
        } else if (theme === 'dark') {
          html.classList.add('dark');
        } else {
          html.classList.remove('dark');
        }
        
        // Save theme
        this.setTheme(theme);
      }

      updateActiveButton(activeTheme) {
        const buttons = document.querySelectorAll('[data-theme]');
        buttons.forEach(btn => {
          const theme = btn.getAttribute('data-theme');
          if (theme === activeTheme) {
            btn.classList.add('bg-blue-100', 'dark:bg-blue-900', 'text-blue-600', 'dark:text-blue-400');
          } else {
            btn.classList.remove('bg-blue-100', 'dark:bg-blue-900', 'text-blue-600', 'dark:text-blue-400');
          }
        });
      }

      setupEventListeners() {
        const toggle = document.getElementById('themeToggle');
        const dropdown = document.getElementById('themeDropdown');
        const buttons = document.querySelectorAll('[data-theme]');

        // Toggle dropdown
        toggle.addEventListener('click', (e) => {
          e.stopPropagation();
          const isVisible = !dropdown.classList.contains('opacity-0');
          
          if (isVisible) {
            dropdown.classList.add('opacity-0', 'invisible', 'scale-95');
            dropdown.classList.remove('opacity-100', 'visible', 'scale-100');
          } else {
            dropdown.classList.remove('opacity-0', 'invisible', 'scale-95');
            dropdown.classList.add('opacity-100', 'visible', 'scale-100');
          }
        });

        // Theme selection
        buttons.forEach(btn => {
          btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-theme');
            this.applyTheme(theme);
            this.updateActiveButton(theme);
            
            // Close dropdown
            dropdown.classList.add('opacity-0', 'invisible', 'scale-95');
            dropdown.classList.remove('opacity-100', 'visible', 'scale-100');
          });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
          if (!toggle.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.add('opacity-0', 'invisible', 'scale-95');
            dropdown.classList.remove('opacity-100', 'visible', 'scale-100');
          }
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
          const currentTheme = this.getTheme() || 'system';
          if (currentTheme === 'system') {
            this.applyTheme('system');
          }
        });
      }
    }
</script>
<script src="https://publisher.linkvertise.com/cdn/linkvertise.js"></script><script>linkvertise(1328821, {whitelist: [], blacklist: [""]});</script>
</body>
</html>
    `
  );
});

app.get('/earn/:userName/:token', async (req, res) => {
  const username = req.params.userName;
  const token = req.params.token;

  const userData = await UserData.findOne({userName: username, earnToken: token});
  if(!userData){
    res.json({"Error": "User and Token combination not found."})
    return;
  }

  res.send(
    `
    <!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Werbung – Blearn</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 flex flex-col transition-colors duration-300">


  <!-- Header -->
  <header class="bg-white dark:bg-gray-800 shadow-md py-4 px-6 flex justify-between items-center transition-colors duration-300">
    <h1 class="text-xl font-bold text-blue-700 dark:text-blue-400">Blearn</h1>
    <button href="https://blearn.netlify.app/logout" class="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition-all">
      Logout
    </button>
  </header>

  <!-- Main Content -->
  <main class="flex-1 p-6 flex items-center justify-center">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md dark:shadow-gray-900/20 border dark:border-gray-700 transition-all duration-300 text-center max-w-md w-full">
      <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-6 transition-colors duration-300">Werbung</h2>
      
      <div class="mb-8">
        <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
          </svg>
        </div>
        <p class="text-gray-600 dark:text-gray-300 text-lg mb-6 transition-colors duration-300">
          Jetzt Blearn für heute freischalten!
        </p>
      </div>
      
      <a id="earnBtn" href="https://blearnend.onserver.com/claim/${username}/${token}" class="w-full px-6 py-3 bg-green-600 dark:bg-green-700 text-white text-lg font-semibold rounded-md hover:bg-green-700 dark:hover:bg-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
        Jetzt Freischalten!
      </a>
      
      <div class="mt-6 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
        <p>Klicken Sie auf "Jetzt Freischalten!", um Blearn freizuschalten.</p>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer class="bg-white dark:bg-gray-800 text-center text-sm py-4 border-t dark:border-gray-700 mt-8 text-gray-500 dark:text-gray-400 transition-colors duration-300">
    © 2025 Lernplattform. Alle Rechte vorbehalten.
  </footer>
</body>
</html>
    `
  );
})

app.get('/claim/:userName/:token', async (req, res) => {
  const userName = req.params.userName;
  const token = req.params.token;

  const userData = await UserData.findOne({userName, earnToken: token})
  if(!userData){
    res.json({"Error": "Can not get combination of user and token"});
    return;
  }
  userData.unlockedTime = Data.now() + 1000 * 60 * 60 * 24
  userData.save();

  res.send(
    `
      <script>window.location.href = "https://blearn.netlitfy.app/dashboard"</script>
    `
  )
})

// Server starten
app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});