require('dotenv').config()

const express = require('express')
const app = express()
const port = 5000
const path = require('path')
const connectDB = require('./db/connect')
const router = require('./routes/subcribers')
const cookieParser = require('cookie-parser')
const {engine} = require('express-handlebars')


// app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use('/', router)

const start = async () => {
    try {
        await connectDB(process.env.mongo_uri)
        app.listen(port, () => console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()