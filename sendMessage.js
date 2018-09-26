const request = require('request');
const accessToken = 'SHwO9NnQZl55uilTN/LEpU7msQnq+OjDSX0vg/EXMeSSEzzQw3qZh18QSy7bRRQLO5GGgj2/VxtgdVIND2v1G4EtMlTR3/91WdgohUMYUyrLco/VFcolW14aR3fpeI9zo6TkYLkZmuoTdoAA3eEhWgdB04t89/1O/w1cDnyilFU=';

function sendText (sender, text) {
    let data = {
      to: sender,
      messages: [
        {
          type: 'text',
          text: text
        }
      ]
    }
    request({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
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

module.exports.sendText = sendText;