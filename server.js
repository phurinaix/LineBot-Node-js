const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const CronJob = require('cron').CronJob;
const {sendMessage, leaveGroup} = require('./api/messaging-api');
const words = require('./words.js');

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

        // greeting message
        if (words.greeting.includes(text.toLowerCase())) {
            sendMessage(sender, 'สวัสดีจ้ะ');
        }

        // mode 1
        else if (words.mode_1.includes(text.toLowerCase())) {
            sendMessage(sender, 'โหมด 1');
        }

        // mode 2
        else if (words.mode_2.includes(text.toLowerCase())) {
            sendMessage(sender, 'โหมด 2');
        }

        // mode 3
        else if (words.mode_3.includes(text.toLowerCase())) {
            sendMessage(sender, 'โหมด 3');
        }

        // mode 4
        else if (words.mode_4.includes(text.toLowerCase())) {
            sendMessage(sender, 'โหมด 4');
        }

        // mode 5
        else if (words.mode_5.includes(text.toLowerCase())) {
            sendMessage(sender, 'โหมด 5');
        }

        // mode 6
        else if (words.mode_6.includes(text.toLowerCase())) {
            sendMessage(sender, 'โหมด 6');
        }

        // mode 7
        else if (words.mode_7.includes(text.toLowerCase())) {
            sendMessage(sender, 'โหมด 7');
        }
    }
    res.sendStatus(200)
});

app.listen(port, () => {
    console.log('Starting port');
});