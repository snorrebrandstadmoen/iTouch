var TDD = TDD || {};

(function() {
	TDD.typing = {};
	TDD.typing.validate = function(originalText, typedText) {
		var errors = [];
		var originalText = originalText.split('');
		var typedText = typedText.split('');

		for (var i=0; i < typedText.length; i++) {
			if (originalText[i] !== typedText[i]) {
				errors.push(i);
			}
		};
		
		return {
			errors: errors,
			isValid: function() {
				return errors.length > 0 ? false : true;
			}
		};
	};	
}());
