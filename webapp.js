require('dotenv').config()

const express = require('express')
const app = express()
const port = 5000
const path = require('path')
const connectDB = require('./db/connect')
const router = require('./routes/subcribers')

// app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(express.static('public'))

app.use('/', router)

const start = async () => {
    try {
        // await connectDB(process.env.mongo_uri)
        app.listen(port, () => console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()