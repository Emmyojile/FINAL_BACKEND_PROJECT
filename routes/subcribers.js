const express = require('express')
const router = express.Router()
const {register, login, greeting} = require('../controllers/subcribers')


router.route('/').get(greeting)

router.route('/register.html').get(register)
router.route('/login.html').get(login)

module.exports = router