const request = require('request');
const accessToken = 'C8nePExKWZiG7zfcNb761EgX/eDxEVeOmY0wLUMDJjmR01QteTux1VdT5CZy2H4WONTsg8K3B7SbR1K7BR0gTwT8yh7zWUhQofbePMu435ojL3uivY9razWOHkItjmNvTQJT/j0TZ539ldsR/r6tuwdB04t89/1O/w1cDnyilFU=';
const CronJob = require('cron').CronJob;

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

new CronJob('0 33 * * * *', function () {
  sendText('U8220df82988e1c41d1d716e856945290', 'Wake up!')
}, null, true, 'Asia/Bangkok');

module.exports.sendText = sendText;