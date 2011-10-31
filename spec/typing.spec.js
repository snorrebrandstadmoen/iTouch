var TDD = TDD || {};

describe("Typing", function(){

	beforeEach(function () {
		
	});

	it("should report errors when validating typed letters", function () {
		var typing = Object.create(TDD.typing);
		var originalText = "This is a test";
		var typedText = "Thas Is a test";
		
		expect(typing.validate).toBeDefined();
		var results = typing.validate(originalText, typedText);
		expect(results.errors.length).toEqual(2);
		expect(false, results.isValid());
		expect(results.errors[0]).toEqual(2);
		expect(results.errors[1]).toEqual(5);
	});

});