const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const CronJob = require('cron').CronJob;
const {sendMessage, leaveGroup} = require('./api/messaging-api');

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
        sendMessage(groupId, 'groupId: ' + groupId);

        var date = new Date();
        var minutes = date.getMinutes();

        new CronJob(`0 ${minutes + 1} * * * *`, function () {
            leaveGroup(groupId);
        }, null, true, 'Asia/Bangkok');
    }
    else if (type == 'follow') {
        var sender = req.body.events[0].source.userId
        sendMessage(sender, 'sender: ' + sender);
    }
    else if (type == 'message') {
        var sender = req.body.events[0].source.userId
        var text = req.body.events[0].message.text
        if (text.toLowerCase() === 'สวัสดี') {
            sendMessage(sender, 'สวัสดีจ้ะ');
        }
        else if (text.toLowerCase() === 'โหมด 1') {
            sendMessage(sender, 'โหมด 1');
        }
        else if (text.toLowerCase() === 'โหมด 2') {
            sendMessage(sender, 'โหมด 2');
        }
    }
    res.sendStatus(200)
});

app.listen(port, () => {
    console.log('Starting port');
});