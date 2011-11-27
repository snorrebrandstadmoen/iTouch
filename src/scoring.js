var TDD = TDD || {};

(function() {
	var scoring = TDD.scoring = {};
	scoring.validate = function(originalText, typedText) {
		var arrayOrig = originalText.split('');
		var arrayTyped = typedText.split('');
		var errors = [];
		
		console.log(originalText);
		
		for (var i=0; i < arrayTyped.length; i++) {
			if (arrayOrig[i] !== arrayTyped[i]) {
				errors.push(i);
			}
		};
		
		return {
			"errors" : errors,
			"percentage" : typedText.length/originalText.length*100
		};
	};

}());

if (typeof module === 'object') {
  module.exports = TDD.scoring;
}