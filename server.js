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
        // pushMessage(groupId, roupId, 'life time: ' + lifeTime(1, dateNow));

        // lifetime in minutes
        new CronJob(lifeTime(5, dateNow), function () {
            // leaveGroup(groupId);
            // pushMessage(groupId, roupId, 'Hello');
        }, null, true, 'Asia/Bangkok');
    }
    else if (type == 'follow') {
        var userId = req.body.events[0].source.userId
        pushMessage(userId, 'สวัสดีครับ');
    }
    else if (type == 'message') {
        var text = req.body.events[0].message.text.replace(/\s+/g, "");

        if (typeof text !== 'undefined') {
            var replyText = modeText(text.toLowerCase());
            var sourceType = req.body.events[0].source.type;

            if (sourceType === 'user') {
                var userId = req.body.events[0].source.userId;
                replyMessage(replyToken, replyText);
            }
            else {
                var groupId = req.body.events[0].source.groupId;
    
                if (replyText === 'exit') {
                    leaveGroup(groupId);
                } else {
                    replyMessage(replyToken, replyText);
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