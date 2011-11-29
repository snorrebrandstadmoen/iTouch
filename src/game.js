var TDD = TDD || {};

 (function() {
    TDD.game = {

        create: function(params) {
            return Object.create(this, {
                originalText: {
                    value: params.originalText
                },
                scoring: {
                    value: params.scoring
                },
                everyone: {
                    value: params.everyone
                },
                gameStatus: {
                    value: "InProgress"
                }
            })
        },

        init: function() {
            var self = this;
            this.everyone.now.validate = function(typedText) {
                self.validate(this, typedText);
            },
			this.everyone.now.getTextToBeTyped = function() {
				everyone.now.displayTextToBeTyped(self.originalText);
			}
        },

        validate: function(now, typedText) {
            var score = this.scoring.validate(this.originalText, typedText);
            this.distributeScores(now, score);
            if (score.percentage === 100 && score.errors.length === 0) {
                gameStatus = "Completed";
                this.gameOver(now);
            }
        },

        distributeScores: function(now, score) {
            this.everyone.now.receiveScores(now.user.clientId, score);
        },

        gameOver: function(now) {
			this.everyone.now.gameOver();
        }
    };

} ());

if (typeof module === 'object') {
    module.exports = TDD.game;
}