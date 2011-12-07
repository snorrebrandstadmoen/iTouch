var TDD = TDD || {};

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
                wrapperElement: {
                    value: params.wrapperElement
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
                    }).appendTo(self.wrapperElement);
                }

                $(elem).html("ClientId: " + clientId + " Errors: " + score.errors + " Completion:" + score.percentage + "%");

                if (clientId === self.now.core.clientId) {
                    self.colorTextToBeTyped(score.errors);
                }
            };

            this.now.displayTextToBeTyped = function(textToBeTyped) {
                self.textToBeTyped = textToBeTyped;
                $(self.textToBeTypedElement).html(textToBeTyped).lettering();
				$(self.typedTextElement).focus();            
			};

            this.now.gameOver = function() {
	            $(self.typedTextElement).unbind();
                $(self.typedTextElement).attr("contenteditable", false).html("GAME OVER!!");
            };

            $(this.typedTextElement).keyup(function() {
                self.now.validate($(this).text());
            });

            this.now.getTextToBeTyped();
        },

        colorTextToBeTyped: function(errors) {
			var typedText = $(this.typedTextElement).text();
            for (var i = 0; i < this.textToBeTyped.length; i++) {
                var span = $(this.textToBeTypedElement).find(":nth-child(" + (i + 1) + ")");

                if ($.inArray(i, errors) > -1) {
                    span.css({
                        "color": "rgb(255, 0, 0)"
                    });
                }
                else if (i >= typedText.length) {
                    span.css({
                        "color": "rgb(0, 0, 0)"
                    });                    
                }
                else {
                    span.css({
                        "color": "rgb(0, 128, 0)"
                    });
                }
            };
        }

    };


} ());
