const mongoose = require("mongoose");
const UserData = require("./models/userDataModel");
const uri = "mongodb+srv://BigB132:Bofe2011@cluster.zzvjfkv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster";

async function migrate() {
    await mongoose.connect(uri, {});
    console.log("Connected successfully to database!");

    await UserData.updateMany({ unlockedTime: { $exists: false } }, { $set: { unlockedTime: 0 } });
    console.log("Migration finished!");
}

migrate();