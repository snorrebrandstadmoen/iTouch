if (typeof require === "function" && typeof module !== "undefined") {
    var TDD = TDD || {};
    TDD.gameController = require("../src/game_controller");
    var $ = jQuery = require('jquery');
}

describe("GameController",
function() {

    beforeEach(function() {
		if (!document) var document = {};
	
        this.textToBeTypedElement = $("<div/>", {
            id: "text-to-be-typed",
        }).appendTo(document);

        this.typedTextElement = $("<textarea/>", {
            id: "typed-text",
        }).appendTo(document);

        this.errorMessageElement = $("<div/>", {
            id: "message",
        }).appendTo(document);

        this.now = {
            validate: function() {},
			receiveScores: function() {}
        };

    });

    it("should call to validate on server on keyup",
    function() {
        TDD.gameController.create({
            typedTextElement: this.typedTextElement,
            textToBeTypedElement: this.textToBeTypedElement,
            errorMessageElement: this.errorMessageElement,
            now: this.now
        }).init();

        spyOn(this.now, "validate");

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
		//             errorMessageElement: this.errorMessageElement,
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