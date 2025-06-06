const Data = require('../models/data')

async function check(username, name, route) {
    const file = await Data.findOne({owner: username, name, route})

    if(file) {
        return true
    } else {
        return false
    }
}

module.exports = check