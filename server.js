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
    var sender = req.body.events[0].source.userId

    if (text.toLowerCase() === 'hello') {
        sendMessage.sendText(sender, 'สวัสดีจ้ะ');
    }
    else if (text === 'book') {
        sendMessage.sendText(sender, api.library(5810742139, 1869900283041));
    }
    res.sendStatus(200)
});

app.listen(port, () => {
    console.log('Starting port');
});