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
            })
        },

		massage: function(text) {
			var index = text.lastIndexOf("--");
			text = index < 0 ? text : text.slice(0, index);
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
			}
        },

        validate: function(now, typedText) {
            var score = this.scoring.validate(this.originalText, typedText.replace(/\\r/g," "));
            this.distributeScores(now, score);

            if (score.percentage === 100 && score.errors.length === 0) {
                this.endGame(now);
            }
        },

        distributeScores: function(now, score) {
            this.everyone.now.receiveScores(now.user.clientId, score);
        },

		startGame: function() {
			var self = this;
			self.gameStatus = "InProgress";
			setTimeout(function() {
				self.everyone.now.displayTextToBeTyped(self.originalText);
            },
            5000);
		},

        endGame: function(now) {
	        this.gameStatus = "Completed";	
    		this.everyone.now.gameOver();
        }
    };

	TDD.game.gameStatus = "NotStarted";

} ());

if (typeof module === 'object') {
    module.exports = TDD.game;
}