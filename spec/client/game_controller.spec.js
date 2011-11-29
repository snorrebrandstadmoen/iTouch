if (typeof require === "function" && typeof module !== "undefined") {
    var TDD = TDD || {};
    TDD.gameController = require("../../src/client/game_controller");
    var $ = jQuery = require('jquery');
}

describe("GameController",
function() {

    beforeEach(function() {
		if (!document) var document = {};
	
        this.textToBeTypedElement = $("<div/>", {
            id: "text-to-be-typed",
        }).appendTo(document);

        this.typedTextElement = $("<div/>", {
            id: "typed-text",
			contenteditable: "true"
        }).appendTo(document);

        this.now = {
            validate: function() {},
			displayTextToBeTyped: function() {},
			receiveScores: function() {},
			getTextToBeTyped: function() {}
        };

    });

    it("should call to validate on server on keyup",
    function() {
        spyOn(this.now, "validate");
	
        TDD.gameController.create({
            typedTextElement: this.typedTextElement,
            textToBeTypedElement: this.textToBeTypedElement,
            now: this.now
        }).init();

        this.typedTextElement.trigger("keyup");

        expect(this.now.validate).toHaveBeenCalled();

        // TODO: hvorfor feiler denne ?????
        // expect($(this.typedTextElement).is(":focus")).toBeTruthy();
    });

		//     it("should color text upon text validation",
		//     function() {
		//         TDD.gameController.create({
		//             typedTextElement: this.typedTextElement,
		//             textToBeTypedElement: this.textToBeTypedElement,
		//             now: this.now
		//         }).init();
		// 
		// var originalText = "Dette er en test";
		// var typedText = "Dette er En";
		// 
		//         this.textToBeTypedElement.text(originalText);
		//         this.typedTextElement.text(typedText);
		// 
		//         spyOn(this.now, "receiveScores").andCallFake(function() {
		//             return {
		//                 "errors": [10],
		//                 "percentage": typedText.length / originalText.length * 100
		//             };
		//         });
		// 
		//         this.typedTextElement.trigger("keyup");
		// 
		// expect(this.textToBeTypedElement.text())
		// 
		//     });

});