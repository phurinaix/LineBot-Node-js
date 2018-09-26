const request = require('request');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
const accessToken = 'SHwO9NnQZl55uilTN/LEpU7msQnq+OjDSX0vg/EXMeSSEzzQw3qZh18QSy7bRRQLO5GGgj2/VxtgdVIND2v1G4EtMlTR3/91WdgohUMYUyrLco/VFcolW14aR3fpeI9zo6TkYLkZmuoTdoAA3eEhWgdB04t89/1O/w1cDnyilFU=';

app.get("/", (req, res) => {
    res.render('home.hbs');
});

app.post("/webhook", (req, res) => {
    var text = req.body.events[0].message.text
    var sender = req.body.events[0].source.userId
    var replyToken = req.body.events[0].replyToken
    console.log(text, sender, replyToken)
    console.log(typeof sender, typeof text)
    // console.log(req.body.events[0])
    if (text === 'สวัสดี' || text === 'Hello' || text === 'hello') {
        sendText(sender, text)
    }
    res.sendStatus(200)
});

function sendText (sender, text) {
    let data = {
      to: sender,
      messages: [
        {
          type: 'text',
          text: 'สวัสดีค่ะ เราเป็นผู้ช่วยปรึกษาด้านความรัก สำหรับหมามิ้น 💞'
        }
      ]
    }
    request({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer key Api'
      },
      url: 'https://api.line.me/v2/bot/message/push',
      method: 'POST',
      body: data,
      json: true
    }, function (err, res, body) {
      if (err) console.log('error')
      if (res) console.log('success')
      if (body) console.log(body)
    })
}

app.listen(port, () => {
    console.log('Starting port');
});