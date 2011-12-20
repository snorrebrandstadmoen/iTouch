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
                nameInput: {
                    value: params.nameInput
                },
                now: {
                    value: params.now
                }
            })
        },

        init: function() {
            var self = this;

            this.now.receiveScores = function(user, score) {
                var elem = document.getElementById(user.clientId);
                if (!elem) {
                    var name = $("<span/>", {
                        id: user.name
                    }).html(user.name).appendTo(self.wrapperElement);
                    elem = $("<progress/>", {
                        id: user.clientId,
                        max: 100,
                        value: 0,
                        width: "100%",
                    }).appendTo(self.wrapperElement);
                }

                $(elem).attr("value", score.percentage).prev().text(user.name + ": errors: " + score.errors.length);

                if (user.clientId === self.now.core.clientId) {
                    self.colorTextToBeTyped(score.errors);
                }
            };

            this.now.listPlayers = function(players) {
				for(var i in players) {
					var user = players[i];
					var clientId = user.clientId;
					var name = user.name;
					
	                var elem = document.getElementById(clientId);
	                if (!elem) {
	                    var name = $("<span/>", {
	                        id: name + clientId
	                    }).html(name).appendTo(self.wrapperElement);
	                    elem = $("<progress/>", {
	                        id: clientId,
	                        max: 100,
	                        value: 0,
	                        width: "100%",
	                    }).appendTo(self.wrapperElement);
	                }				
				}
            };

            this.now.showStartButton = function() {
                if (document.getElementById(self.now.name + self.now.core.clientId)) {
                    $(self.startButton).show();
                }
            };
            
			this.now.hideStartButton = function() {
	            $(self.startButton).hide();
            };

            this.now.displayTextToBeTyped = function(textToBeTyped) {
                self.textToBeTyped = textToBeTyped;
                $(self.textToBeTypedElement).html(textToBeTyped).lettering();
	            $(self.typedTextElement).keyup(function() {
	                self.now.validate($(this).text());
	            });
				$(self.typedTextElement).text("");
                $(self.typedTextElement).attr("contenteditable", true);
                $(self.typedTextElement).show();
                $(self.typedTextElement).focus();
            };

            this.now.gameOver = function(name) {
                $(self.typedTextElement).unbind();
                $(self.typedTextElement).attr("contenteditable", false).html("GAME OVER!! " + name + " vant");
            };

            $(self.typedTextElement).attr("contenteditable", false);

            $(this.startButton).click(function() {
                self.startGame();
            });

            $(this.nameInput).keyup(function(event) {
                if (event.keyCode === 13) {
                    self.registerPlayer($(this).val());
                }
            });

            return this;
        },

        registerPlayer: function(name) {
            $(this.nameInput).hide();
            this.now.name = name;
            this.now.registerPlayer(name);
        },

        startGame: function() {
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
