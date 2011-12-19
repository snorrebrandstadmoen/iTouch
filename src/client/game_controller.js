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
                startButton: {
                    value: params.startButton
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
                    var name = $("<span/>").html(clientId).appendTo(self.wrapperElement);
                    elem = $("<progress/>", {
                        id: clientId,
                        max: 100,
                        value: 0,
                        width: "100%",
                    }).appendTo(name);
                }

                // $(elem).html("ClientId: " + clientId + " Errors: " + score.errors + " Completion:" + score.percentage + "%");
                $(elem).attr("value", score.percentage);

                if (clientId === self.now.core.clientId) {
                    self.colorTextToBeTyped(score.errors);
                }
            };

            this.now.displayTextToBeTyped = function(textToBeTyped) {
                self.textToBeTyped = textToBeTyped;
                $(self.textToBeTypedElement).html(textToBeTyped).lettering();
                $(self.typedTextElement).attr("contenteditable", true);
                $(self.typedTextElement).focus();
            };

            this.now.gameOver = function() {
                $(self.typedTextElement).unbind();
                $(self.typedTextElement).attr("contenteditable", false).html("GAME OVER!!");
            };

            $(this.typedTextElement).keyup(function() {
                self.now.validate($(this).text());
            });
            $(self.typedTextElement).attr("contenteditable", false);

            $(this.startButton).click(function() {
                self.startGame();
            });

            return this;
        },

        startGame: function() {
			$(this.startButton).hide();
            this.now.startGame();
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
