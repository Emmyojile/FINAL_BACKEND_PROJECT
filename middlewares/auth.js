const authMiddleware = (req, res, next) => {
    try {
        const cookie = req.cookies.token
        console.log(cookie)
        if (!cookie) {
        return res.status(401).render('register')
        }
        next()
    } catch (error) {
        return res.status(500).render('register')
    }
}

module.exports = authMiddleware