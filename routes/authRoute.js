const express = require('express')
const { registerUser, loginUser } = require('../controllers/authControllers')

const AuthRouter = express.Router()

AuthRouter.get('/home', (req, res) => {
    res.send('welcome to auth routes')
})

AuthRouter.post('/signup', registerUser)
AuthRouter.post('/login',loginUser)

module.exports = {
    AuthRouter
}