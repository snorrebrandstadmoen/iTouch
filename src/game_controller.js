var TDD = TDD || {};

if (typeof require === "function" && typeof module !== "undefined") {
    var $ = jQuery = require('jquery');
}

 (function() {
    TDD.gameController = {

        create: function(params) {
            return Object.create(this, {
                typedTextElement: {
                    value: params.typedTextElement
                },
                textToBeTypedElement: {
                    value: params.textToBeTypedElement
                },
                errorMessageElement: {
                    value: params.errorMessageElement
                },
                now: {
                    value: params.now
                }
            })
        },

        init: function() {
            var self = this;

			this.now.receiveScores = function(clientId, score) {
			    $(self.errorMessageElement).html("Errors: " + score.errors + " " + score.percentage + "%");
			}
			
            $(this.typedTextElement).keyup(function() {
                self.now.validate(this.value);
            });
            
			$(this.typedTextElement).focus();
        },

    };

	
} ());

if (typeof module === 'object') {
    module.exports = TDD.gameController;
}