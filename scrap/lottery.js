const cheerio = require('cheerio');
const request = require('request');

var lotteryResult = new Promise((resolve, reject) => {
    request({headers: {'User-Agent': 'Mozilla/5.0'}, url: 'https://www.jetsadabet.com/login'}, (err, response, body) => {
        if (err) {
            reject(err);
            return console.log('Failed to request: ', err);
        }

        const $ = cheerio.load(body);
        // console.log(response.statusCode);
        resolve(response.statusCode);
        // const lotteries = $('.table-bordered tbody');
        // var thaiLottery, interLottery, jabYeeGee, jabYeeGeeVIP;
        // var thaiLotteryMorning, thaiLotteryNoon, thaiLotteryAfternoon, thaiLotteryEvening;
        // var firstThreeDigits, lastThreeDigits, lastTwoDigits;

        // resolve('Request website');
        // $('.table-bordered tbody tr').each((index, lottery) => {
            // switch(index) {
            //     case 0 :
                // if (index == 0) {
                //     var governmentLottery = $(lottery);
                //     var firstPrize = governmentLottery.children('td').eq(0).text().replace(/\s/g, '');
                //     return resolve(firstPrize);
                // }
                // case 1 : thaiLottery = $(lottery); break;
                // case 2 : interLottery = $(lottery); break;
                // case 3 : thaiLotteryMorning = $(lottery); break;
                // case 4 : thaiLotteryNoon = $(lottery); break;
                // case 5 : thaiLotteryAfternoon = $(lottery); break;
                // case 6 : thaiLotteryEvening = $(lottery); break;
                // case 7 : jabYeeGee = $(lottery); break;
                // case 8 : jabYeeGeeVIP = $(lottery); break;
            // }
        // });

        // governmentLottery.children('td').each((index, element) => {
        //     var number = $(element).text().replace(/\s/g, '');
        //     switch(index) {
        //         case 0 : firstPrize = number; break;
        //         case 1 : firstThreeDigits = number; break;
        //         case 2 : lastThreeDigits = number; break;
        //         case 3 : lastTwoDigits = number; break;
        //     }
        // });
    });
});

// lotteryResult();
// lotteryResult.then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log("error");
// });

module.exports = {
    lotteryResult
}