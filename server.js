const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const CronJob = require('cron').CronJob;
const {sendMessage, leaveGroup} = require('./api/messaging-api');
const words = require('./words.js');
const {lifeTime} = require('./lifetime');
const {lotteryResult} = require('./scrap/lottery');
const {asyncTime} = require('./async');

app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
process.env.TZ = 'Asia/Bangkok';

app.get("/", (req, res) => {
    lotteryResult.then((result) => {
        // console.log(`length = ${res.length} and value is : ${res}`);
        res.render('home.hbs', {
            data: result
        });
    }).catch((err) => {
        console.log("error");
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
            // greeting message
            if (words.greeting.includes(text)) {
                sendMessage(sender, 'สวัสดีจ้ะ');
            }

            // mode 1
            else if (words.mode_1.includes(text)) {
                lotteryResult.then((result) => {
                    if (result == 'null' || result == 'undefined') {
                        sendMessage(sender, 'ไม่มีค่า');
                    }
                    else {
                        sendMessage(sender, result);
                    }
                }).catch((err) => {
                    sendMessage(sender, "error");
                });
            }

            // mode 2
            else if (words.mode_2.includes(text)) {
                asyncTime.then((result) => {
                    sendMessage(sender, result);
                }).catch((err) => {
                    sendMessage(sender, "error");
                });
            }

            // mode 3
            else if (words.mode_3.includes(text)) {
                sendMessage(sender, 'โหมด 3');
            }

            // mode 4
            else if (words.mode_4.includes(text)) {
                sendMessage(sender, 'โหมด 4');
            }

            // mode 5
            else if (words.mode_5.includes(text)) {
                sendMessage(sender, 'โหมด 5');
            }

            // mode 6
            else if (words.mode_6.includes(text)) {
                sendMessage(sender, 'โหมด 6');
            }

            // mode 7
            else if (words.mode_7.includes(text)) {
                sendMessage(sender, 'โหมด 7');
            }

            // another word
            else {
                sendMessage(sender, 'I don\'t know');
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

console.log(process.ENV);