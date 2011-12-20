var TDD = TDD || {};

if (typeof require === "function" && typeof module !== "undefined") {
    var $ = jQuery = require('jquery');
}

 (function() {
    TDD.game = {

        create: function(params) {
            return Object.create(this, {
                originalText: {
                    value: this.massage(params.originalText)
                },
                scoring: {
                    value: params.scoring
                },
                everyone: {
                    value: params.everyone
                },
				players: {
					value: []
				}
            })
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
				self.players[this.user.clientId] = name;
                everyone.now.listPlayers({
                    clientId: this.user.clientId,
                    name: name
                });
				if (self.gameStatus === "InProgress") {
					this.now.displayTextToBeTyped(self.originalText);
				} else {
					everyone.now.showStartButton();
				}
            }
        },

        validate: function(now, typedText) {
            var score = this.scoring.validate(this.originalText, typedText.replace(/\\r/g, " "));
            this.distributeScores(now, score);

            if (score.percentage === 100 && score.errors.length === 0) {
                this.endGame(now);
            }
        },

        distributeScores: function(now, score) {
			var self = this;
            this.everyone.now.receiveScores({
                clientId: now.user.clientId,
                name: self.players[now.user.clientId]
            },
            score);
        },

        startGame: function() {
            var self = this;
            self.gameStatus = "InProgress";
			self.everyone.now.hideStartButton();
            setTimeout(function() {
                self.everyone.now.displayTextToBeTyped(self.originalText);
            },
            5000);
        },

        endGame: function(now) {
            this.gameStatus = "Completed";
            this.everyone.now.gameOver(this.players[now.user.clientId]);
        }
    };

    TDD.game.gameStatus = "NotStarted";

} ());

if (typeof module === 'object') {
    module.exports = TDD.game;
}