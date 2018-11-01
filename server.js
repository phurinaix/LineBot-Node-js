const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const CronJob = require('cron').CronJob;
const {pushMessage, replyMessage, leaveGroup} = require('./api/messaging-api');
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
    var replyToken = req.body.events[0].replyToken;

    if (type == 'join') {
        var groupId = req.body.events[0].source.groupId;
        var dateNow = new Date();
        pushMessage(greplyMessage, roupId, 'life time: ' + lifeTime(1, dateNow));

        // lifetime in minutes
        new CronJob(lifeTime(1, dateNow), function () {
            // leaveGroup(groupId);
            pushMessage(greplyMessage, roupId, 'Hello');
        }, null, true, 'Asia/Bangkok');
    }
    else if (type == 'follow') {
        var sender = req.body.events[0].source.userId
        pushMessage(sreplyMessage, ender, 'sender: ' + sender);
    }
    else if (type == 'message') {
        var text = req.body.events[0].message.text.replace(/\s+/g, "");

        if (typeof text !== 'undefined') {
            var replyText = modeText(text.toLowerCase());

            if (/userId/.test(JSON.stringify(req.body.events[0]))) {
                var userId = req.body.events[0].source.userId;
                replyMessage(replyToken, replyText);
                pushMessage(userId, JSON.stringify(req.body.events[0]));
            }
            else {
                var groupId = req.body.events[0].source.groupId;
                replyMessage(replyToken, replyText);
                replyMessage(replyToken, JSON.stringify(req.body.events[0]));
                if (replayText === 'exit') {
                    leaveGroup(groupId);
                }
            }
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