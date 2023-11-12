let express = require('express')
let router = express.Router()
let fdb = require('../configs/fb_config').fdb

router.get('/user/get', async (req, res) => {
    console.log(req.session)
    const doc = await fdb.collection('users').doc(req.session.sessionId).get();
    if (!doc.exists) {
        console.log('No matching documents.');
        return;
    }
    res.send(doc.data())
})

module.exports = router