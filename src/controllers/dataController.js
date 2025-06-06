const Data = require('../models/data');
const UserData = require('../models/userData');
const generateId = require('../utils/IDGenerator');
const nameCheck = require('../utils/nameCheck');

const getlist = async (req, res) => {
  const { username, password, route } = req.body;

  if(!username){
    res.json({state: "error", message: "No value as username entered!"})
    return;
  }

  if(!password){
    res.json({state: "error", message: "No value as password entered!"})
    return;
  }

  try{
    const user = await UserData.findOne({userName: username, password});
    if(!user){
      res.json({state: "error", message: "User doesn't exist!"})
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
};


const createFolder = async (req, res) => {
  const {username, password, route, folderName} = req.body;

  if(!username){
    res.json({state: "error", message: "No value as username entered!"})
    return;
  }

  if(!password){
    res.json({state: "error", message: "No value as password entered!"})
    return;
  }

  try{
    const user = await UserData.findOne({userName: username, password});
    if(!user){
      res.json({state: "error", message: "User doesn't exist!"})
      return;
    }
  } catch {};

  const nameTaken = await nameCheck(username, folderName, route)

  if(nameTaken){
    res.json({state: "error", message: "File name already taken!"})
    return
  }
  
  const newFolder = new Data({
    owner: username,
    id: 0,
    route,
    type: 9,
    name: folderName,
  })
  await newFolder.save();

  console.log(`${username} created a folder called "${folderName}"`);
  res.json({state: "success"});
}

const rename = async (req, res) => {
  const {username, password, route, oldname, newname} = req.body;

  if(!username){
    res.json({state: "error", message: "No value as username entered!"})
    return;
  }

  if(!password){
    res.json({state: "error", message: "No value as password entered!"})
    return;
  }

  try{
    const user = await UserData.findOne({userName: username, password});
    if(!user){
      res.json({state: "error", message: "User doesn't exist!"})
      return;
    }
  } catch {};

  const data = await Data.findOne({name: oldname, route, owner: username});
  if(!data){
    res.json({state: "error", message: "No file found!"});
    return;
  }
  data.name = newname;
  await data.save();

  console.log(`${username} renamed his file "${oldname} in ${route} to ${newname}"`)
  res.json({state: "success"});
};

const del = async (req, res) => {
  const {username, password, route, name} = req.body;
  
  if(!username){
    res.json({state: "error", message: "No value as username entered!"})
    return;
  }

  if(!password){
    res.json({state: "error", message: "No value as password entered!"})
    return;
  }

  try{
    const user = await UserData.findOne({userName: username, password});
    if(!user){
      res.json({state: "error", message: "User doesn't exist!"})
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
}

const savelist = async (req, res) => {
  const { username, password, route, list, name} = req.body;

  if(!username){
    res.json({state: "error", message: "No value as username entered!"})
    return;
  }
  
  if(!password){
    res.json({state: "error", message: "No value as password entered!"})
    return;
  }
  
  try{
    const user = await UserData.findOne({userName: username, password});
    if(!user){
      res.json({state: "error", message: "User doesn't exist!"})
      return;
    }
  } catch {};
  
  if(!name){
    res.json({state: "error", message: "Please enter a name!"})
    return;
  }
  const data = await Data.findOne({owner: username, route, name});
  if(data){
    res.json({state: "error", message: "This name is already given."})
    return;
  }

  const nameTaken = await nameCheck(username, name, route)

  if(nameTaken){
    res.json({state: "error", message: "File name already taken!"})
    return
  }

  const id = await generateId.generateUniqueId();
 
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
}

const savetable = async (req, res) => {
  const { username, password, route, table, name } = req.body;
  
  if(!username){
    res.json({state: "error", message: "No value as username entered!"})
    return;
  }
  
  if(!password){
    res.json({state: "error", message: "No value as password entered!"})
    return;
  }
  
  try{
    const user = await UserData.findOne({userName: username, password});
    if(!user){
      res.json({state: "error", message: "User doesn't exist!"})
      return;
    }
  } catch {};
  
  if(!name){
    res.json({state: "error", message: "Please enter a name!"})
    return;
  }

  const nameTaken = await nameCheck(username, name, route)

  if(nameTaken){
    res.json({state: "error", message: "File name already taken!"})
    return
  }

  const id = await generateId.generateUniqueId();

  const newData = new Data({
    owner: username,
    id,
    route,
    type: 1,
    name,
    table: {columns: table.columns, rows: table.rows, tableData: table.tableData}
  })

  console.log(newData)
  await newData.save();

  res.json({state: "success"})
}

const getvoclist =  async (req, res) => {
  console.log("Appel")
  const { username, password, route, lesson } = req.body;

  
  if(!username){
    res.json({state: "error", message: "No value as username entered!"})
    return;
  }

  if(!password){
    res.json({state: "error", message: "No value as password entered!"})
    return;
  }

  try{
    const user = await UserData.findOne({userName: username, password});
    if(!user){
      res.json({state: "error", message: "User doesn't exist!"})
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
};

const gettable = async (req, res) => {
  const { username, password, route, lesson } = req.body;

  console.log(username)
  console.log(password)
  console.log(route)
  console.log(lesson)

  if(!username){
    res.json({state: "error", message: "No value as username entered!"})
    return;
  }

  if(!password){
    res.json({state: "error", message: "No value as password entered!"})
    return;
  }

  try{
    const user = await UserData.findOne({userName: username, password});
    if(!user){
      res.json({state: "error", message: "User doesn't exist!"})
      return;
    }
  } catch {};

  const data = await Data.findOne({owner: username, route, name: lesson});
  console.log(data)

  res.json({table: data.table})
};

const editlist = async (req, res) => {
  const { username, password, route, lesson, list } = req.body;

  console.log(list)

  if(!username){
    res.json({state: "error", message: "No value as username entered!"})
    return;
  }

  if(!password){
    res.json({state: "error", message: "No value as password entered!"})
    return;
  }

  try{
    const user = await UserData.findOne({userName: username, password});
    if(!user){
      res.json({state: "error", message: "User doesn't exist!"})
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

  console.log(`${username} edited his list "${lesson}" in ${route}`);
  res.send({state: "success"});
};

const edittable = async (req, res) => {
  const { username, password, route, lesson, table } = req.body;

  if(!username){
    res.json({state: "error", message: "No value as username entered!"})
    return;
  }

  if(!password){
    res.json({state: "error", message: "No value as password entered!"})
    return;
  }

  try{
    const user = await UserData.findOne({userName: username, password});
    if(!user){
      res.json({state: "error", message: "User doesn't exist!"})
      return;
    }
  } catch {};

  console.log(username, route, lesson)
  
  const data = await Data.findOne({owner: username, route, name: lesson});
  if(!data) return;
  
  data.table = table

  await data.save();

  console.log(`${username} edited his table "${lesson}" in ${route}`);
  res.send({state: "success"});
};


const fetchid = async (req, res) => {
  const { username, password, route, lesson } = req.body;

  if(!username){
    res.json({state: "error", message: "No value as username entered!"})
    return;
  }

  if(!password){
    res.json({state: "error", message: "No value as password entered!"})
    return;
  }

  try{
    const user = await UserData.findOne({userName: username, password});
    if(!user){
      res.json({state: "error", message: "User doesn't exist!"})
      return;
    }
  } catch {};

  const data = await Data.findOne({owner: username, route, name: lesson});
  if(!data) return;

  console.log(`${username} asked for the id of "${lesson}" in ${route}`)
  res.json({state: "success", id: data.id});
};

const importlist = async (req, res) => {
  const { username, password, oldId, route, name } = req.body;
  
  if(!username){
    res.json({state: "error", message: "No value as username entered!"})
    return;
  }

  if(!password){
    res.json({state: "error", message: "No value as password entered!"})
    return;
  }

  try{
    const user = await UserData.findOne({userName: username, password});
    if(!user){
      res.json({state: "error", message: "User doesn't exist!"})
      return;
    }
  } catch {};

  const data = await Data.findOne({id: oldId});
  if(!data) return;

  let newName = "New List"
  
  if(name){
    newName = name;
  } else {
    newName = data.name;
  }

  const nameTaken = await nameCheck(username, newName, route)

  if(nameTaken){
    res.json({state: "error", message: "File name already taken!"})
    return
  }

  const id = await generateId.generateUniqueId()

  const newData = new Data({
    owner: username,
    id,
    route,
    type: data.type,
    name: newName,
    list: data.list,
    table: data.table
  })

  await newData.save();

  console.log(`${username} imported ${data.owner}'s file "${data.name}" from ${data.route} to his filed and named it ${newName} and put it into ${route}`)
  res.json({state: "success",})
}



module.exports = { getlist, createFolder, rename, del, savelist, savetable, getvoclist, gettable, editlist, edittable, fetchid, importlist }