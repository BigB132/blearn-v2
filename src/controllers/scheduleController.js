const UserData = require("../models/userData");

const getSchedule = async (req, res) => {
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

    console.log(user.userName + " fetched his timetable data");
    return res.status(200).json({state: "success", timetable: user.schedule});
}

const editSchedule = async (req, res) => {
    const { username, password, day, period, subjectId } = req.body;
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

    if (day < 0 || day > 6) {
        return res.status(400).json({ state: "error", message: "Invalid day" });
    }

    if (period < 0 || period > 7) {
        return res.status(400).json({ state: "error", message: "Invalid period" });
    }

    const subject = user.subjects.find(v => v.id == subjectId);
    if (!subject) {
        return res.status(404).json({ state: "error", message: "Subject not found" });
    }

    user.schedule[day] = user.schedule[day] ?? {};
    user.schedule[day][period] = subjectId;

    user.markModified("schedule");
    await user.save();

    return res.status(200).json({ state: "success" });

}

const deleteSchedule = async (req, res) => {
    const { username, password, day, period } = req.body;
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

    if (day < 0 || day > 6) {
        return res.status(400).json({ state: "error", message: "Invalid day" });
    }

    if (period < 0 || period > 7) {
        return res.status(400).json({ state: "error", message: "Invalid period" });
    
    }
    
    user.schedule[day][period] = null;

    user.markModified("schedule");
    await user.save();

    return res.status(200).json({ state: "success" });

}

module.exports = { getSchedule, editSchedule, deleteSchedule };