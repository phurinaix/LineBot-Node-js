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
    
});

app.listen(port, () => {
    console.log('Starting port');
});