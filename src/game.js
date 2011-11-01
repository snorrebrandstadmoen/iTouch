var TDD = TDD || {};
TDD.typing = require("./typing");

(function() {
	TDD.game = {};
	var game = TDD.game;
	game.distributeScores = function() {};
	game.validate = function(typedText) {
		var typing = Object.create(TDD.typing);
		var result = typing.validate(this.originalText, typedText);
		console.log(result);
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