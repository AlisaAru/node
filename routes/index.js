let express = require('express')
let router = express.Router()

router.get('/', (req, res) => {
    console.log(req.session)
    if (req.session.isAuth) {
        res.render('index')
    } else {
        res.render('login')
    }

})

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/login', (req, res) => {
    res.render('login')
})

module.exports = router