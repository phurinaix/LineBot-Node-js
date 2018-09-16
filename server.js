const request = require('request');
const express = require('express');
const hbs = require('hbs');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
const accessToken = 'yQ2kd1osEoogk01nfEhrYyMy9DsDMF3Wnb6jiCJTK2QPuv3kV3qrX7X4vsT51sv43sKUI0UOdRhcVykTf5NGYF1eEei8Nl+nXZV8tIZ1iNlYiAjMrSKNRt3pREOkbWpWgiYDS/n0StZg4C7AdII3lgdB04t89/1O/w1cDnyilFU=';

app.get("/", (req, res) => {
    res.render('home.hbs');
});

app.get("/bot", (req, res) => {
    var events = req.body;
    var replyToken = events.replyToken;
    var message = {
        type: 'text',
        text: 'haha'
    }
    var data = {
        replyToken: replyToken,
        message: message
    }
    request.post({url: 'https://api.line.me/v2/bot/message/reply',
                form: data,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                }
            }, (err, response, body) => {
        if (err) {
            return res.send('Error');
        }
        res.send('success');
    });
});

app.listen(port, () => {
    console.log('Starting port');
});