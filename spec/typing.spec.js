if (typeof require === "function" && typeof module !== "undefined") {
	var TDD = {};
	TDD.typing = require("../src/typing");
}

describe("Typing", function(){

	var originalText;
	
	beforeEach(function () {
		originalText = "Dette er en test"
	});

	it("should validate typed text", function () {
		var typedText = "DeTte er en test";
		
		var typing = Object.create(TDD.typing);
		
		expect(typing.validate).toBeDefined();

		var results = typing.validate(originalText, typedText);

		expect(results.errors.length).toEqual(1);
		expect(results.errors[0]).toEqual(2);
		
		
	});
	
	it("should validate text with 2 errors", function () {
		var typedText = "DeTte Er en test";
		
		var typing = Object.create(TDD.typing);
		
		expect(typing.validate).toBeDefined();

		var results = typing.validate(originalText, typedText);

		expect(results.errors.length).toEqual(2);
		expect(results.errors[0]).toEqual(2);
		expect(results.errors[1]).toEqual(6);
		
	});


});
