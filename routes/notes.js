let express = require('express')
let router = express.Router()
let fdb = require('../configs/fb_config').fdb


router.get('/notes', async (req, res) => {
    let data = []
    const notesRef = fdb.collection('notes');
    const snapshot = await notesRef.get();
    snapshot.forEach(doc => {
        data.push(doc.data())
    });

    res.send(data)
})

router.post('/add', async (req, res) => {
    let title = req.body.title
    let text = req.body.text
    let date = new Date();
    const formattedDate = `${date.getFullYear() % 100}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const note = await fdb.collection('notes').add({})
    await fdb.collection('notes').doc(note.id).set({
        id: note.id,
        title: title,
        text: text,
        date: formattedDate
    })
    console.log(note.id)
    res.send(note.id)
})

router.post('/delete', async (req, res) => {
    let r = { r: 0 }
    let id = req.body.id
    await fdb.collection('notes').doc(id).delete().then(() => {
        r['r'] = 1
        res.send(JSON.stringify(r))
    }).catch((e) => {
        console.log(e)
        res.send(JSON.stringify(r))
    })
})

router.post('/edit', async (req, res) => {
    let r = { r: 0 }
    const id = req.body.id
    const text = req.body.text
    console.log(req.body)
    const noteRef = fdb.collection('notes').doc(id);
    await noteRef.update({ text: text }).then(() => {
        r['r'] = 1
        res.send(JSON.stringify(r))
    }).catch((e) => {
        console.log(e)
        res.send(JSON.stringify(r))
    })
})

module.exports = router