const mongoose = require('mongoose')


async function connectDB() {
    try {
     await mongoose.connect('mongodb://localhost:27017/mydatabase')
     console.log('db connected')
    } catch (error) {
        console.error('error while connecting db', error.message)
    }
}


module.exports = {
    connectDB
}

