var TDD = TDD || {};

if (typeof require === "function" && typeof module !== "undefined") {
    var $ = jQuery = require('jquery');
    var request = require('request');
}

 (function() {
    TDD.game = {

        create: function(params) {
            return Object.create(this, {
                originalText: {
                    value: params.originalText,
					writable: true
                },
                scoring: {
                    value: params.scoring
                },
                everyone: {
                    value: params.everyone
                },
                playerPointers: {
                    value: []
                },
                players: {
                    value: []
                },
            })
        },

        loadText: function(callback) {
			var self = this;
			
            request({
                url: 'http://iheartquotes.com/api/v1/random?format=json&max_lines=4&show_source=false&source=simpsons_homer',
                timeout: 2000
            },
            function(error, response, body) {
                var quote;
                if (!error && response.statusCode === 200) {
                    quote = JSON.parse(body).quote;
	                self.originalText = self.massage(quote);
                } 
                console.log(self.originalText);
                callback();
            });
        },

        massage: function(text) {
            var index = text.lastIndexOf("--");
            text = index < 0 ? text: text.slice(0, index);
            return $.trim(text.replace(/\s+/mg, ' '));
        },

        init: function() {
            var self = this;

            this.everyone.now.validate = function(typedText) {
                self.validate(this, typedText);
            },
            this.everyone.now.getTextToBeTyped = function() {
                everyone.now.displayTextToBeTyped(self.originalText);
            },
            this.everyone.now.startGame = function() {
                self.startGame();
            },
            this.everyone.now.registerPlayer = function(name) {
                self.playerPointers[this.user.clientId] = name;
                self.players.push({
                    clientId: this.user.clientId,
                    name: name
                });
                everyone.now.listPlayers(self.players);

                if (self.gameStatus === "InProgress") {
                    this.now.displayTextToBeTyped(self.originalText);
                } else {
                    everyone.now.showStartButton();
                }
            };

        },

        validate: function(now, typedText) {
            var self = this;
			var score = this.scoring.validate(this.originalText, typedText.replace(/\\r/g, " "));
            this.everyone.now.receiveScores({
                clientId: now.user.clientId,
                name: self.playerPointers[now.user.clientId]
            },
            score);


            if (score.percentage === 100 && score.errors.length === 0) {
                this.endGame(now);
            }
        },

        startGame: function() {
            var self = this;
            self.gameStatus = "InProgress";
            self.everyone.now.hideStartButton();
            self.everyone.now.clearText();
            setTimeout(function() {
                self.loadText(function() {
                    self.everyone.now.displayTextToBeTyped(self.originalText)
                });
            },
            5000);
        },

        endGame: function(now) {
            this.gameStatus = "Completed";
            this.everyone.now.gameOver(this.playerPointers[now.user.clientId]);
            this.everyone.now.showStartButton();
        }
    };

    TDD.game.gameStatus = "NotStarted";
} ());

if (typeof module === 'object') {
    module.exports = TDD.game;
}