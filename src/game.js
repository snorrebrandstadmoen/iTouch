var TDD = TDD || {};
TDD.scoring = require("./scoring");

(function() {
	var game = TDD.game = {};
	var scoring = Object.create(TDD.scoring);
	var gameStatus = 'InProgress';
	
	game.distributeScores = function() {};
	game.validate = function(typedText) {
		var result = scoring.validate(this.originalText, typedText);
		
		game.distributeScores();
		if(result.percentage === 100 && result.errors.length === 0) {
			gameStatus = 'Completed';
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