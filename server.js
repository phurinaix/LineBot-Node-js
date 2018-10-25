const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sendMessage = require('./sendMessage');
const api = require('./api');

app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.render('home.hbs');
});

app.post("/webhook", (req, res) => {
    var text = req.body.events[0].message.text
    var type = req.body.events[0].type;
    var sender = req.body.events[0].source.userId

    if (type == 'follow') {
        sendMessage.sendText(sender, sender);
    }
    if (text.toLowerCase() === 'hello') {
        sendMessage.sendText(sender, 'สวัสดีจ้ะ');
    }
    else if (text === 'book') {
        sendMessage.sendText(sender, req.body.events[0]);
    }
    else if (text === 'fine') {
        sendMessage.sendText(sender, 'What are u doing');
    }
    res.sendStatus(200)
});

app.listen(port, () => {
    console.log('Starting port');
});