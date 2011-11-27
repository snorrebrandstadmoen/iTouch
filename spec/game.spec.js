var TDD = TDD || {};
TDD.game = require("../src/game");

describe("Game",
function() {

    var originalText;

    beforeEach(function() {
        originalText = "Dette er en";

		TDD.game.everyone.now = {
			distributeScores: function() {
				console.log("asdf");
			}
		}

        // spyOn(TDD.game.everyone.now, "distributeScores").andCallFake(function() {console.log("sdf")});
    });

    it("should validate text and distribute scores upon validation request",
    function() {
        spyOn(TDD.game, 'distributeScores');
        var typedText = "Dette er en";

        TDD.game.setOriginalText(originalText);
        expect(TDD.game.originalText).toEqual(originalText);

        TDD.game.validate(typedText);
        expect(TDD.game.distributeScores).toHaveBeenCalled();
    });

    it("should NOT end game when text is errornous",
    function() {
        var typedText = "D";

        TDD.game.setOriginalText(originalText);

        spyOn(TDD.game, 'gameOver');
        TDD.game.validate(typedText);
        expect(TDD.game.gameOver).not.toHaveBeenCalled();
    });

    it("should end game when text is complete with no errors",
    function() {
        TDD.game.setOriginalText(originalText);

        spyOn(TDD.game, 'gameOver');
        TDD.game.validate(originalText);
        expect(TDD.game.gameOver).toHaveBeenCalled();
    });

});