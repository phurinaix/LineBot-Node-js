const request = require('request');
const express = require('express');
const hbs = require('hbs');
const app = express();

app.get("/", (req, res) => {

});

app.listen(8080, () => {
    console.log('Starting port');
});