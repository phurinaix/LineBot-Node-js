const request = require('request');
const express = require('express');
const hbs = require('hbs');
const app = express();

// app.use(express.json());
// app.use(express.urlencoded());

const accessToken = 'yQ2kd1osEoogk01nfEhrYyMy9DsDMF3Wnb6jiCJTK2QPuv3kV3qrX7X4vsT51sv43sKUI0UOdRhcVykTf5NGYF1eEei8Nl+nXZV8tIZ1iNlYiAjMrSKNRt3pREOkbWpWgiYDS/n0StZg4C7AdII3lgdB04t89/1O/w1cDnyilFU=';

app.get("/", (req, res) => {
    res.send('This is homepage');
});

app.get("/bot", (req, res) => {
    // res.send(req.body);
});

app.listen(8080, () => {
    console.log('Starting port');
});