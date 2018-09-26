const request = require('request');
const cheerio = require('cheerio');

var library = (username, password) => {
    var formData = {
        koha_login_context: 'opac',
        _ga: '2.252242697.1445138642.1537824707-1319534405.1535987255',
        userid: username,
        password: password
    }
    request.post({url: 'https://koha.library.tu.ac.th/cgi-bin/koha/opac-user.pl', formData: formData}, (err, response, body) => {
        if (err) {
            return console.log('Failed to request: ', err);
        }
        // const $ = cheerio.load(body);

        const fine = $('a[href="#opac-user-fines"]').text();
        var allBook = "";
        console.log(fine);
        $('a.title').each((i, el) => {
            const text = $(el).text();
            // return console.log(text);
            allBook += text + "\n";
        });
        return allBook;
    });
}

// library(5810742139, 1869900283041);
module.exports.library = library;