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
            gameOver: function() {},
            core: {
                clientId: "123"
            }
        };

    });

    it("should show text to be typed on init game",
    function() {
        var originalText = "En tekst";
        var self = this;
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

        var originalText = "En tekst";
        spyOn(this.now, "getTextToBeTyped").andCallFake(function() {
            self.now.displayTextToBeTyped(originalText);
        });

        spyOn(this.now, "validate").andCallFake(function() {
            self.now.receiveScores(clientId, {
                "errors": [10],
                "percentage": 95
            })
        });

        TDD.gameController.create({
            typedTextElement: this.typedTextElement,
            textToBeTypedElement: this.textToBeTypedElement,
            wrapperElement: this.wrapperElement,
            now: this.now
        }).init();

        this.typedTextElement.trigger("keyup");

        expect(this.now.validate).toHaveBeenCalled();
        expect(this.wrapperElement.find("#" + clientId).text()).toContain("95%");
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

        TDD.gameController.create({
            typedTextElement: this.typedTextElement,
            textToBeTypedElement: this.textToBeTypedElement,
            wrapperElement: this.wrapperElement,
            now: this.now
        }).init();

        this.typedTextElement.trigger("keyup");

        expect(this.now.validate).toHaveBeenCalled();
        expect(this.typedTextElement.text()).toEqual("GAME OVER!!");
        expect(this.typedTextElement.attr("contenteditable")).toEqual("false");
    });

    it("should color text upon text validation",
    function() {
        var self = this;
        var originalText = "Dette er en test";
        var typedText = "Dette er En";
        var errorIndex = 9;

        spyOn(this.now, "validate").andCallFake(function() {
            self.now.receiveScores("123", {
                "errors": [9],
                "percentage": 95
            })
        });

        spyOn(this.now, "getTextToBeTyped").andCallFake(function() {
            self.now.displayTextToBeTyped(originalText);
        });

        TDD.gameController.create({
            typedTextElement: this.typedTextElement,
            textToBeTypedElement: this.textToBeTypedElement,
            wrapperElement: this.wrapperElement,
            now: this.now
        }).init();

        this.typedTextElement.text(typedText);
        this.typedTextElement.trigger("keyup");

        expect(this.now.validate).toHaveBeenCalled();
        expect($(this.textToBeTypedElement).find(":nth-child(1)").css("color")).toEqual("rgb(0, 128, 0)");
        expect($(this.textToBeTypedElement).find(":nth-child(" + (errorIndex + 1) + ")").css("color")).toEqual("rgb(255, 0, 0)");
        expect($(this.textToBeTypedElement).find(":nth-child(" + (typedText.length + 1) + ")").css("color")).toEqual("rgb(0, 0, 0)");
    });

});