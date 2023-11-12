let express = require('express')
let path = require('path')
let bodyParser = require('body-parser')
let session = require('express-session')


let auth = require('./routes/auth')
let note = require('./routes/notes')
let index = require('./routes/index')
let weather = require('./routes/weather')
let user = require('./routes/user')

let app = express()
let port = 3000
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    sessionId: ''
}))
app.use('/views', express.static(__dirname + '/views'))
app.use('/public/img', express.static(__dirname + '/public/img'))
app.use('/public/css', express.static(__dirname + '/public/css'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/', auth)
app.use('/post', note)
app.use('/', user)
app.use('/', weather)
app.use('/', index)

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');



app.listen(port, () => {
    console.log('Server started')
})