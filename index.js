const express = require('express')
const connection = require('./db')
const { auth } = require('./Middleware/auth.middleware')
const { noteRoute } = require('./Routes/note.Router')
const { userRoute } = require('./Routes/user.Router')
require('dotenv').config()
const cors = require('cors')


const port = process.env.port

const app = express()
app.use(express.json())
app.use(cors())

app.use('/user', userRoute)
app.use(auth)
app.use('/note', noteRoute)



app.listen(port, async () => {
    await connection;
    console.log("Connected to database")
    console.log('listening on port ' + port)
})