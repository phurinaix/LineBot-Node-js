const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const CronJob = require('cron').CronJob;
const {sendMessage, leaveGroup} = require('./api/messaging-api');
const {lifeTime} = require('./lifetime');
const {lotteryResult} = require('./scrap/lottery');
const {asyncTime} = require('./async');
const {modeText} = require('./test-data/test-data');

app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
process.env.TZ = 'Asia/Bangkok';

app.get("/", (req, res) => {
    // lotteryResult.then((result) => {
    //     // console.log(`length = ${res.length} and value is : ${res}`);
    //     res.render('home.hbs', {
    //         data: result
    //     });
    // }).catch((err) => {
    //     console.log("error");
    // });
    asyncTime.then((result) => {
        res.render('home.hbs', {
            data: result
        });
    });
});

app.post("/webhook", (req, res) => {
    var type = req.body.events[0].type;

    if (type == 'join') {
        var groupId = req.body.events[0].source.groupId;
        var dateNow = new Date();
        sendMessage(groupId, 'life time: ' + lifeTime(1, dateNow));

        // lifetime in minutes
        new CronJob(lifeTime(1, dateNow), function () {
            // leaveGroup(groupId);
            // sendMessage(groupId, 'groupId: ' + groupId);
            sendMessage(groupId, 'Hello');
        }, null, true, 'Asia/Bangkok');
    }
    else if (type == 'follow') {
        var sender = req.body.events[0].source.userId
        sendMessage(sender, 'sender: ' + sender);
    }
    else if (type == 'message') {
        var sender = req.body.events[0].source.userId
        var text = req.body.events[0].message.text.replace(/\s+/g, "");

        if (typeof text === 'undefined') {
            console.log("error");
        }
        else {
            text = text.toLowerCase();
            var replyMessage = modeText(text);
            sendMessage(sender, JSON.stringify(req.body.events[0]));
        }
    }
    res.sendStatus(200)
});

app.listen(port, () => {
    console.log('Starting port');
});

// lotteryResult.then((result) => {
//     // console.log(`length = ${res.length} and value is : ${res}`);
//     console.log(typeof result, result);
// }).catch((err) => {
//     console.log("error");
// });

// asyncTime.then((result) => {
//     console.log(typeof result, result);
// });

// console.log(process.ENV);