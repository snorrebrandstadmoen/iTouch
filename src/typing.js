var TDD = TDD || {};

(function() {
	TDD.typing = {};
	TDD.typing.validate = function(originalText, typedText) {
		
		var arrayOrig = originalText.split('');
		var arrayTyped = typedText.split('');
		var errors = [];
		
		for (var i=0; i < arrayTyped.length; i++) {
			if (arrayOrig[i] !== arrayTyped[i]) {
				errors.push(i);
			}
		};
		
		return {
			"errors" : errors
		};
	};
}());

if (typeof module === 'object') {
  module.exports = TDD.typing;
}