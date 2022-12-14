const express = require('express')
const router = express.Router()
const {register, login, registerPage, loginPage, dashboardPage, logout, aboutPage, home, coursesPage, tutorsPage} = require('../controllers/subcribers')
const authMiddleware = require('../middlewares/auth')


router.route('/register').post(register)
router.route('/login').post(login)

router.route('/register').get(registerPage)
router.route('/login').get(loginPage)
router.route('/dashboard').get(authMiddleware, dashboardPage)
router.route('/about').get(aboutPage)
router.route('/courses').get(coursesPage)
router.route('/tutors').get(tutorsPage)




router.route('/logout').get(logout)
router.route('/home').get(home)


module.exports = router