var TDD = TDD || {};

 (function() {
    TDD.scoring = {
        create: function() {
            return Object.create(this)
        },

        validate: function(originalText, typedText) {
            var arrayOrig = originalText.split('');
            var arrayTyped = typedText.split('');
            var errors = [];

            for (var i = 0; i < arrayTyped.length; i++) {
                if (arrayOrig[i] !== arrayTyped[i]) {
                    errors.push(i);
                }
            };

            return {
                "errors": errors,
                "percentage": typedText.length / originalText.length * 100
            };
        }
    }

} ());

if (typeof module === 'object') {
    module.exports = TDD.scoring;
}