var TDD = TDD || {};

(function() {
	var scoring = TDD.scoring = {};
	
	scoring.calculateScore = function(originalText, typedText) {
		return {
			"percentage" : typedText.length/originalText.length*100
		}
	};
}());

if (typeof module === 'object') {
  module.exports = TDD.scoring;
}