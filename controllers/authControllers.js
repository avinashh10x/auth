const { User } = require("../model/userModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'avinash'

async function registerUser(req, res) {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'every field is required' })
        }

        const existedUser = await User.findOne({ email })
        if (existedUser) {
            return res.status(400).json({ message: 'user already exists' })
        }
        // creating new user

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            email,
            password: hashedPassword
        })
        await newUser.save()




        res.status(201).json({ message: 'user created succesfully' })
    } catch (error) {
        res.status(500).json({ message: 'error while registration', error: error.message })

    }
}


async function loginUser(req, res) {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'every field is required' })
        }

        const existedUser = await User.findOne({ email })
        if (!existedUser) {
            return res.status(400).json({ message: 'user does not exists' })
        }

        const isMatch = await bcrypt.compare(password, existedUser.password)

        if (!isMatch) {
            return res.status(400).json({ message: 'invalid credentials' })
        }

        const token = jwt.sign({ id: existedUser._id, email: existedUser.email }, SECRET, { expiresIn: '1h' })


        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // Set to true if using HTTPS 
            maxAge: 1000 * 60 * 60 * 24
        });

        res.status(300).json({ message: 'login successfully', token: token })

    } catch (error) {
        res.status(500).json({ message: 'error while login', error: error.message })

    }
}

module.exports = {
    registerUser,
    loginUser
}