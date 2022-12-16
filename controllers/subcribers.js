const Subscribers = require('../model/subcribers')
const jwt = require('jsonwebtoken')


exports.registerPage = (req, res) => {
    return res.render('register', {title : "REGISTER"})
}

exports.loginPage = (req, res) => {
    return res.render('login', {title : "LOGIN", layout : "main2"})
}

exports.dashboardPage = (req, res) => {
    const token = req.cookies.token
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const username = payload.username.toString().toLocaleUpperCase()
    return res.render('dashboard', {title : "DASHBOARD", layout : "dash2", msg : username })
}

exports.aboutPage = (req, res) =>{
    return res.render('about', {title : "ABOUT", layout : "about2"})
}

exports.coursesPage = (req, res) =>{
    return res.render('courses', {title : "COURSES", layout : "courses2"})
}

exports.tutorsPage = (req, res) =>{
    return res.render('tutors', {title : "TUTORS", layout : "tutors2"})
}

exports.register = async  (req, res) => {
   try {
    const {first_name, last_name, nationality, email, password, confirmPassword} = req.body

    if (!(first_name || last_name || nationality || email || password || confirmPassword)) {
        console.log('Please Provide all the information')
        // return res.redirect('register.html', {msg: 'Please Provide all the information'})
        return res.status(400).render({msg : 'Please Provide all the information'})

    }

    const user = await Subscribers.findOne({email})

    if (user) {
        console.log('User already exists')
        return res.status(400).render('register', {msg : `${req.body.email} already exists!`})
        
        // return res.redirect('register.html', {msg: 'User already exists'})
    }

    const newUser = await Subscribers.create({...req.body})
    const token = newUser.createJWT()

    const nodemailer = require('nodemailer')

    const transport = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : process.env.email,
            pass : process.env.password
        }
    })

    const mailoptions = {
        from : 'emmaojile99@gmail.com',
        to : req.body.email,
        subject : 'GREETINGS',
        html : '<h1>Thank You For Choosing OJ-TECH'
    }

    transport.sendMail(mailoptions, (err, info) => {
        if (err) {
            console.log(err)
        }
        console.log(info)
    })

    res.cookie('token', token, {httpOnly : true, secure : true})
    // console.log(token)
    return res.status(201).redirect('login')
   } catch (error) {
    return res.redirect('register', {msg: error.message})
   }
}

exports.login = async (req, res) => {
     try {
        const {email, password} = req.body

        const user = await Subscribers.findOne({email})
        // console.log(user)
        if (!user) {
            console.log('User does not exist in our database')
            return res.status(400).render('login', {msg : `${req.body.email} does not exist!`})
            
            // return res.redirect('login.html')
        }

        const userExists = await user.comparePasswords(password)
        
        if (!userExists) {
            console.log('Incorrect Password')
            return res.status(400).render('login', {msg : 'Incorrect password!'})
        }

        const token = user.createJWT()
        res.cookie('token', token, {httpOnly : true, secure : true})

        console.log('Successfully logged in')
        return res.redirect('dashboard')
     } catch (error) {
        console.log(error)
     }
}

exports.logout = (req, res) => {
    try {
        res.clearCookie('token')
        return res.status(200).redirect('login')
    } catch (error) {
        console.log(error)
    }
}

exports.home = (req, res) =>{
    try {
        return res.status(200).redirect('dashboard')
    } catch (error) {
        console.log(error)
    }
}