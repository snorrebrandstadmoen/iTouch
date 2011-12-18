var express = require('express');
var app = express.createServer();
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/lib'));
app.use(express.static(__dirname + '/src/client'));
app.listen(8080);

var nowjs = require("now");
everyone = nowjs.initialize(app);

var TDD = TDD || {};
TDD.game = require("./src/game");
TDD.scoring = require("./src/scoring");

var request = require('request');
request({
    url: 'http://iheartquotes.com/api/v1/random?format=json&max_lines=4&show_source=false&source=simpsons_homer',
    timeout: 2000
},
function(error, response, body) {
    var quote;
    if (!error && response.statusCode === 200) {
        quote = JSON.parse(body).quote;
    } else {
        quote = "Dette er en test";
    }
    console.log(quote);

    TDD.game.create({
        originalText: quote,
        scoring: TDD.scoring.create(),
        everyone: everyone
    }).init();
});




