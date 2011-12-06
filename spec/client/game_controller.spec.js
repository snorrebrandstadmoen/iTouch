if (typeof require === "function" && typeof module !== "undefined") {
    var TDD = TDD || {};
    TDD.gameController = require("../../src/client/game_controller");
    var $ = jQuery = require('jquery');
}

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

        this.now = {
            validate: function() {},
            displayTextToBeTyped: function() {},
            receiveScores: function(clientId, score) {},
            getTextToBeTyped: function() {},
            gameOver: function() {}
        };

        TDD.gameController.create({
            typedTextElement: this.typedTextElement,
            textToBeTypedElement: this.textToBeTypedElement,
			wrapperElement: this.wrapperElement,
            now: this.now
        }).init();

    });

    it("should show text to be typed on init game",
    function() {
        var self = this;
		var originalText = "En tekst";
        spyOn(this.now, "getTextToBeTyped").andCallFake(function() {
            self.now.displayTextToBeTyped(originalText);
        });
        TDD.gameController.create({
            typedTextElement: this.typedTextElement,
            textToBeTypedElement: this.textToBeTypedElement,
			wrapperElement: this.wrapperElement,
            now: this.now
        }).init();

        expect($(this.textToBeTypedElement).text()).toEqual(originalText);
    });

    it("should call to validate on server on keyup",
    function() {
		var self = this;
		var clientId = "123";
        spyOn(this.now, "validate").andCallFake(function() {
            self.now.receiveScores(clientId, {
                "errors": [10],
                "percentage": 95
            })
        });

        this.typedTextElement.trigger("keyup");

        expect(this.now.validate).toHaveBeenCalled();
		expect(this.wrapperElement.find("#"+clientId).text()).toContain("95%");
    });

    it("should disable text input and show message upon GAME OVER",
    function() {

        });

    it("should color text upon text validation",
    function() {
        var originalText = "Dette er en test";
        var typedText = "Dette er En";

        this.textToBeTypedElement.text(originalText);
        this.typedTextElement.text(typedText);

        spyOn(this.now, "receiveScores").andCallFake(function() {
            return {
                "errors": [10],
                "percentage": typedText.length / originalText.length * 100
            };
        });

        this.typedTextElement.trigger("keyup");

        expect(this.textToBeTypedElement.text());

    });

});