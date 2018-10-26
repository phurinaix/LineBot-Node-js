const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sendMessage = require('./sendMessage');
const CronJob = require('cron').CronJob;
const leaveGroup = require('./leaveGroup');

app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.render('home.hbs');
});

app.post("/webhook", (req, res) => {
    var type = req.body.events[0].type;

    if (type == 'join') {
        var groupId = req.body.events[0].source.groupId;
        sendMessage.sendText(groupId, 'groupId: ' + groupId);

        var date = new Date();
        var minutes = Date().getMinutes();

        new CronJob(`0 ${minutes + 1} * * * *`, function () {
            leaveGroup.leaveGroup(groupId);
        }, null, true, 'Asia/Bangkok');
    }
    else if (type == 'follow') {
        var sender = req.body.events[0].source.userId
        sendMessage.sendText(sender, 'sender: ' + sender);
    }
    else if (type == 'message') {
        var sender = req.body.events[0].source.userId
        var text = req.body.events[0].message.text
        if (text.toLowerCase() === 'hello') {
            sendMessage.sendText(sender, 'สวัสดีจ้ะ');
        }
        else if (text.toLowerCase() === 'book') {
            sendMessage.sendText(sender, req.body.events[0]);
        }
        else if (text.toLowerCase() === 'fine') {
            sendMessage.sendText(sender, 'What are u doing');
        }
    }
    res.sendStatus(200)
});

app.listen(port, () => {
    console.log('Starting port');
});