const express = require('express')
const { AuthRouter } = require('./routes/authRoute')
const { connectDB } = require('./utils/db')
const { configDotenv } = require('dotenv')
const cookiesParser = require('cookie-parser')
configDotenv()

const app = express()
app.use(express.json())
app.use(cookiesParser())

connectDB()

app.get('/', (req, res) => {
    res.send('server is running')
})

app.use('/auth', AuthRouter)



app.listen(3000, () => {
    console.log('running at http://localhost:3000/')
})