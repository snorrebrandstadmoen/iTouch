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
                now: {
                    value: params.now
                }
            })
        },

        init: function() {
            var self = this;

			this.now.receiveScores = function(clientId, score) {
				var elem = document.getElementById(clientId);
				if (!elem) {
					elem = $("<div/>", {
			            id: clientId,
			        }).appendTo(document.body);
				}
			    $(elem).html("ClientId: " + clientId + " Errors: " + score.errors + " Completion:" + score.percentage + "%");
			};
			
			this.now.displayTextToBeTyped = function(textToBeTyped) {
				$(self.textToBeTypedElement).html(textToBeTyped);
			};
			
			this.now.gameOver = function() {
				console.log("gameOver");
				$(self.typedTextElement).attr("contenteditable", false).html("GAME OVER!!");
			};
						
            $(this.typedTextElement).keyup(function() {
                self.now.validate($(this).text());
            });
            
			$(this.typedTextElement).focus();

			this.now.getTextToBeTyped();
        },

    };

	
} ());

if (typeof module === 'object') {
    module.exports = TDD.gameController;
}