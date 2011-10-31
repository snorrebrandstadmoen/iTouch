describe("Typing", function(){

	beforeEach(function () {
		
	});

	it("should match words typed", function () {
		var typing = Object.create(typing);
		var originalText = "This is a test";
		var typedText = "Thas is a test";
		
		expect(1, typing.validate(originalText, typedText).errors.length);
		
	});

});