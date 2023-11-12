let express = require('express')
let router = express.Router()
let fdb = require('../configs/fb_config').fdb
let fauth = require('../configs/fb_config').fauth


router.post('/register', (req, res) => {
    let r = { r: 0 }
    let email = req.body.email
    let password = req.body.password
    let nickname = req.body.nickname
    fauth.createUserWithEmailAndPassword(fauth.getAuth(), email, password).then(async (userCredential) => {
        const user = await fdb.collection('users').add({
            email: email,
            nickname: nickname,
        }).then((new_user) => {
            r['r'] = 1
            req.session.sessionId = new_user.id
            req.session.isAuth = true
            res.send(JSON.stringify(r))
        }).catch((e) => {
            console.log(e)
            res.send(JSON.stringify(r))
        })
    }).catch((e) => {
        console.log(e)
        res.send(JSON.stringify(r))
    })
})

router.post('/login', (req, res) => {
    let r = { r: 0 }
    let email = req.body.email
    let password = req.body.password
    fauth.signInWithEmailAndPassword(fauth.getAuth(), email, password).then(async (userCredential) => {
        r['r'] = 1
        const snapshot = await fdb.collection('users').where('email', '==', email).get();
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }
        snapshot.forEach(doc => {
            req.session.sessionId = doc.id
            req.session.isAuth = true
            res.send(JSON.stringify(r))
        });

    }).catch((e) => {
        console.log(e)
        if (e.code == 'auth/invalid-email') {
            r['r'] = 2
        }
        else if (e.code == 'auth/invalid-login-credentials') {
            r['r'] = 0
        }
        else if (e.code == 'auth/missing-password') {
            r['r'] = 3
        } else {
            r['r'] = 520
        }

        res.send(JSON.stringify(r))
    })

})


module.exports = router