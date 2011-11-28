if (typeof require === "function" && typeof module !== "undefined") {
    var TDD = TDD || {};
    TDD.game = require("../src/game");
    TDD.scoring = require("../src/scoring");
}

describe("Game",
function() {

    beforeEach(function() {
        this.originalText = "Dette er en";

        this.everyone = {
	        now : {
	            validate: function() {},
				receiveScores: function() {},
				user : {
					clientId: "123"
				}
	        }
        };

        this.game = TDD.game.create({
            originalText: this.originalText,
			scoring: TDD.scoring.create(),
            everyone: this.everyone
        });
        expect(this.game.originalText).toEqual(this.originalText);
    });

    it("should validate text and distribute scores upon validation request",
    function() {
        var typedText = "Dette er en";

        spyOn(this.game, 'distributeScores');

        this.game.validate(this.everyone.now, typedText);

        expect(this.game.distributeScores).toHaveBeenCalled();
    });

    it("should NOT end game when text is errornous",
    function() {
        var typedText = "D";
    
        spyOn(this.game, 'gameOver');

        this.game.validate(this.everyone.now, typedText);

        expect(this.game.gameOver).not.toHaveBeenCalled();
    });
    
    it("should end game when text is complete with no errors",
    function() {
		var typedText = this.originalText;
        
        spyOn(this.game, 'gameOver');

        this.game.validate(this.everyone.now, typedText);

        expect(this.game.gameOver).toHaveBeenCalled();
    });

});