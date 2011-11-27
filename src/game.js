var TDD = TDD || {};
TDD.scoring = require("./scoring");

 (function() {
    var game = TDD.game = {};
    var originalText = "";
    var everyone = {};
	game.everyone = everyone;

    game.init = function() {
        var express = require('express');
        var app = express.createServer();
        app.use(express.static(__dirname + '/../public'));
        app.use(express.static(__dirname + '/../lib'));
        app.listen(8080);

        var nowjs = require("now");
        everyone = nowjs.initialize(app);

        everyone.now.validate = function(typedText) {
            game.validate(this, typedText);
        };
    }

    var scoring = Object.create(TDD.scoring);
    var gameStatus = 'InProgress';

    game.validate = function(now, typedText) {
        var score = scoring.validate(game.originalText, typedText);
        game.distributeScores(now, score);
        if (score.percentage === 100 && score.errors.length === 0) {
            gameStatus = 'Completed';
            this.gameOver();
        }
    };

    game.distributeScores = function(now, score) {
        everyone.now.receiveScores(now.user.clientId, score);
    };

    game.setOriginalText = function(originalText) {
        game.originalText = originalText;
    };

    game.gameOver = function() {
        console.log("game over!!");
    };

} ());

if (typeof module === 'object') {
    module.exports = TDD.game;
}