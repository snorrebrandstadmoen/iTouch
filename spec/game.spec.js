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
				receiveScores: function(clientId, score) {},
				startGame: function() {},
				displayTextToBeTyped: function() {},
				gameOver: function() {},
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

		expect(this.game.gameStatus).toEqual("NotStarted");
    });

	it("should massage original text", function () {
		var originalText = 'Oh my God, someone\'s trying to kill me!  Oh wait, it\'s for Bart.\n\n\t\t-- Homer Simpson\n\t\t   Cape Feare';
		this.game = TDD.game.create({
            originalText: originalText,
			scoring: TDD.scoring.create(),
            everyone: this.everyone
        });

		expect(this.game.originalText).toEqual('Oh my God, someone\'s trying to kill me! Oh wait, it\'s for Bart.');
	});

    it("should validate text and distribute scores upon validation request",
    function() {
        var typedText = "Dette er en";

		spyOn(this.everyone.now, 'receiveScores');

        this.game.validate(this.everyone.now, typedText);

        expect(this.everyone.now.receiveScores).toHaveBeenCalled();
    });

    it("should NOT end game when text is errornous",
    function() {
        var typedText = "D";
        
		spyOn(this.game.scoring, "validate").andReturn({
            "errors": [1],
            "percentage": 100
        });
    
        spyOn(this.game, 'endGame');

        this.game.validate(this.everyone.now, typedText);

        expect(this.game.endGame).not.toHaveBeenCalled();
    });
    
    it("should end game when text is complete with no errors",
    function() {
		var typedText = this.originalText + "asdf";
        
        spyOn(this.game.scoring, "validate").andReturn({
            "errors": [],
            "percentage": 100
        });
        spyOn(this.everyone.now, 'gameOver');

        this.game.validate(this.everyone.now, typedText);

        expect(this.everyone.now.gameOver).toHaveBeenCalled();
		expect(this.game.gameStatus).toEqual("Completed");
    });

	it("should start game on request", function () {
		spyOn(this.everyone.now, 'displayTextToBeTyped');
        
		this.game.startGame();
		
		expect(this.everyone.now.displayTextToBeTyped).toHaveBeenCalled(); 
		expect(this.game.gameStatus).toEqual("InProgress");
		
	});

});