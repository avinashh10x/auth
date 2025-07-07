const express = require('express')
const { registerUser, loginUser } = require('../controllers/authControllers')
const { isVerify } = require('../middleware/isVerify')

const AuthRouter = express.Router()

AuthRouter.get('/home', (req, res) => {
    res.send('welcome to auth routes')
})

AuthRouter.post('/signup', registerUser)
AuthRouter.post('/signin', loginUser)

// protected route
AuthRouter.get('/checkAuth', isVerify, (req, res) => {
    res.status(200).json({
        message: 'user is verified',
        user: req.user
    })
}
)


AuthRouter.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = {
    AuthRouter
} 