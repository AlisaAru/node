let express = require('express')
let router = express.Router()
let request = require('request')

router.get('/weather', (req, res) => {
    let options = {
        'method': 'GET',
        'url': 'https://api.openweathermap.org/data/2.5/weather?q=Astana&appid=9d871ad2b9208dc3684541b72083256e&units=metric',
        'headers': {}
    }
    request(options, function (err, result) {
        res.send(result.body)
    })
})

module.exports = router