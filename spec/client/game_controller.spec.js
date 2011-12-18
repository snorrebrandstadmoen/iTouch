describe("GameController",
function() {

    beforeEach(function() {

        this.textToBeTypedElement = $("<div/>", {
            id: "text-to-be-typed",
        }).appendTo(document);

        this.typedTextElement = $("<div/>", {
            id: "typed-text",
            contenteditable: "true"
        }).appendTo(document);

        this.wrapperElement = $("<div/>", {
            id: "wrapper",
        }).appendTo(document);

		this.startButton = $("<button/>", {
            id: "startButton",
        }).appendTo(document);

        this.now = {
            validate: function() {},
            displayTextToBeTyped: function() {},
            receiveScores: function(clientId, score) {},
            getTextToBeTyped: function() {},
			startGame: function() {},
            gameOver: function() {},
            core: {
                clientId: "123"
            }
        };

		this.game = TDD.gameController.create({
            typedTextElement: this.typedTextElement,
            textToBeTypedElement: this.textToBeTypedElement,
            wrapperElement: this.wrapperElement,
			startButton: this.startButton,
            now: this.now
        }).init();

        this.clock = sinon.useFakeTimers();
    });

    afterEach(function() {
        this.clock.restore();
    });

    it("should show text to be typed 5 seconds after game is started",
    function() {
        var originalText = "En tekst";
        var self = this;
        spyOn(this.now, "startGame").andCallFake(function() {
            self.now.displayTextToBeTyped(originalText);
        });
		
		expect(this.typedTextElement.attr("contenteditable")).toEqual("false");
        
        this.game.startGame();

        this.clock.tick(4000);
        expect($(this.textToBeTypedElement).text()).toEqual('');
        this.clock.tick(1000);
        expect($(this.textToBeTypedElement).text()).toEqual(originalText);

        expect(this.typedTextElement.attr("contenteditable")).toEqual("true");
    });

	it("should do start game when start button is clicked", function () {
		spyOn(this.game, "startGame");

		this.startButton.trigger("click");
		
		expect(this.game.startGame).toHaveBeenCalled();
	});

    it("should call to validate on server on keyup",
    function() {
        var self = this;
        var clientId = "123";

        var originalText = "En tekst";

        spyOn(this.now, "validate").andCallFake(function() {
            self.now.receiveScores(clientId, {
                "errors": [10],
                "percentage": 95
            })
        });

        this.game.now.displayTextToBeTyped(originalText);

        this.typedTextElement.trigger("keyup");

        expect(this.now.validate).toHaveBeenCalled();
    });

    it("should disable text input and show message upon GAME OVER",
    function() {
        var originalText = "Dette er en test";
        var typedText = originalText;

        this.textToBeTypedElement.text(originalText);
        this.typedTextElement.text(typedText);

        var self = this;
        spyOn(this.now, "validate").andCallFake(function() {
            self.now.gameOver();
        });

        this.game.now.displayTextToBeTyped(originalText);

        this.typedTextElement.trigger("keyup");

        expect(this.now.validate).toHaveBeenCalled();
        expect(this.typedTextElement.text()).toEqual("GAME OVER!!");
        expect(this.typedTextElement.attr("contenteditable")).toEqual("false");
    });

    it("should color text upon text validation and update progress bar",
    function() {
        var self = this;
        var originalText = "Dette er en test";
        var typedText = "Dette er En";
        var errorIndex = 9;
        var clientId = "123";

        spyOn(this.now, "validate").andCallFake(function() {
            self.now.receiveScores(clientId, {
                "errors": [errorIndex],
                "percentage": 95
            })
        });

        this.game.now.displayTextToBeTyped(originalText);

        this.typedTextElement.text(typedText);
        this.typedTextElement.trigger("keyup");

        expect(this.now.validate).toHaveBeenCalled();
        expect($(this.textToBeTypedElement).find(":nth-child(1)").css("color")).toEqual("rgb(0, 128, 0)");
        expect($(this.textToBeTypedElement).find(":nth-child(" + (errorIndex + 1) + ")").css("color")).toEqual("rgb(255, 0, 0)");
        expect($(this.textToBeTypedElement).find(":nth-child(" + (typedText.length + 1) + ")").css("color")).toEqual("rgb(0, 0, 0)");

        expect(this.wrapperElement.find("#" + clientId).attr("value")).toEqual(95);
    });

});