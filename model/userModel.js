const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

const User = mongoose.model('User',userSchema)

module.exports = {
    User
}

// module.exports = mongoose.model('User'.userSchema)