var TDD = TDD || {};
TDD.scoring = require("./scoring");

(function() {
	TDD.game = {};
	var game = TDD.game;
	game.distributeScores = function() {};
	game.validate = function(typedText) {
		var scoring = Object.create(TDD.scoring);
		var result = scoring.validate(this.originalText, typedText);
		
		game.distributeScores();
		
		if (result['gameStatus'] === 'Completed') {
			TDD.game.gameOver();
		}
	};
	game.setOriginalText = function(originalText) {
		this.originalText = originalText;
	};
	game.gameOver = function() {};
}());

if (typeof module === 'object') {
  module.exports = TDD.game;
}