const subscriber = require('../model/subcribers')


exports.greeting = (req, res) => {
    return res.send('hello')
}

exports.register = async (req, res) => {
    return res.render('register.html')
}

exports.login = async (req, res) => {
    return res.render('login.html')
}