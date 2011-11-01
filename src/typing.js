var TDD = TDD || {};

(function() {
	TDD.typing = {};
	TDD.typing.validate = function(originalText, typedText) {
		
		var gameStatus = 'InProgress';
		var arrayOrig = originalText.split('');
		var arrayTyped = typedText.split('');
		var errors = [];
		
		for (var i=0; i < arrayTyped.length; i++) {
			if (arrayOrig[i] !== arrayTyped[i]) {
				errors.push(i);
			}
		};
		
		if(arrayOrig.length == arrayTyped.length && errors.length == 0)
		{
			gameStatus = 'Completed';
		}
		
		
		return {
			"errors" : errors,
			"gameStatus" : gameStatus
		};
	};
}());

if (typeof module === 'object') {
  module.exports = TDD.typing;
}