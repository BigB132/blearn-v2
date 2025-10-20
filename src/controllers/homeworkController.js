const UserData = require('../models/userData');

const getHomeworks = async (req, res) => {
    const { username, password } = req.body;
    
    if(!username || !password){
        return res.status(400).json({ state: "error", message: "Missing username or password" });
    }
    
    const user = await UserData.findOne({ userName: username, password });
    if (!user) {
        return res.status(404).json({ state: "error", message: "User not found" });
    }

    res.status(200).json({ state: "success", homework: user.homeworks });
}

const createHomework = async (req, res) => {
    const { username, password, subjectId, dueDate, description } = req.body;

    if (!username || !password || !subjectId || !dueDate || !description) {
        return res.status(400).json({ state: "error", message: "Missing required fields" });
    }

    const user = await UserData.findOne({ userName: username, password });
    console.log(user);
    if (!user) {
        return res.status(404).json({ state: "error", message: "User not found" });
    }
    
    user.homeworks.push({ subjectId, dueDate, description, completed: false, id: subjectId + Date.now() });

    user.markModified('homeworks');
    await user.save()


    res.status(200).json({ state: "success", message: "Homework created successfully" });
}

const completeHomework = async (req, res) => {
    const { username, password, homeworkId, completed } = req.body;
    if (!username || !password || !homeworkId || completed === undefined) {
        return res.status(400).json({ state: "error", message: "Missing required fields" });
    }
    
    const user = await UserData.findOne({ userName: username, password });
    if (!user) {
        return res.status(404).json({ state: "error", message: "User not found" });
    }

    const homework = user.homeworks.find(hw => hw.id === homeworkId);
    if (!homework) {
        return res.status(404).json({ state: "error", message: "Homework not found" });
    }

    homework.completed = completed;
    user.markModified('homeworks');
    await user.save();
    res.status(200).json({ state: "success", message: "Homework updated successfully" });
}

const editHomework = async (req, res) => {
    const { username, password, homeworkId, subjectId, dueDate, description } = req.body;

    if (!username || !password || !homeworkId || !subjectId || !dueDate || !description) {
        return res.status(400).json({ state: "error", message: "Missing required fields" });
    }
    
    const user = await UserData.findOne({ userName: username, password });
    if (!user) {
        return res.status(404).json({ state: "error", message: "User not found" });
    }    

    const homework = user.homeworks.find(hw => hw.id === homeworkId);

    if(!homework) {
        return res.status(404).json({ state: "error", message: "Homework not found"});
    }

    homework.dueDate = dueDate;
    homework.description = description;
    homework.subjectId = subjectId;

    user.markModified("homeworks");
    await user.save();
    res.status(200).json({ state: "success", message: "Successfully edited homework!"})
}

const deleteHomework = async (req, res) => {
    const {username, password, homeworkId} = req.body;
    console.log(homeworkId)
    if(!username || !password || !homeworkId) {
        return res.status(404).json({ state: "error", message: "Missing required fields"});
    }

    const user = await UserData.findOne({ userName: username, password });
    if (!user) {
        return res.status(404).json({ state: "error", message: "User not found" });
    }    

    const homework = user.homeworks.findIndex(hw => hw.id === homeworkId);

    if(!homework) {
        return res.status(404).json({ state: "error", message: "Homework not found"});
    }

    user.homeworks.splice(homework, 1);

    user.markModified("homeworks");
    await user.save();
    res.status(200).json({ state: "success", message: "Homework deleted"});

}

module.exports = { getHomeworks, createHomework, completeHomework, editHomework, deleteHomework};