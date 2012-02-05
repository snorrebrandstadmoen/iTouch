if (typeof require === "function" && typeof module !== "undefined") {
    var TDD = TDD || {};
    TDD.game = require("../../src/server/game");
    TDD.scoring = require("../../src/server/scoring");
    var sinon = require("sinon");
    var $ = jQuery = require('jquery');
}

describe("Game",
function() {

    beforeEach(function() {
        this.originalText = "Dette er en";

        this.everyone = {
            now: {
                validate: function() {},
                receiveScores: function(clientId, score) {},
                startGame: function() {},
                displayTextToBeTyped: function() {},
                hideStartButton: function() {},
                showStartButton: function() {},
                clearText: function() {},
                gameOver: function() {},
                user: {
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

        this.clock = sinon.useFakeTimers();
    });

    afterEach(function() {
        this.clock.restore();
    });

    it("should massage original text",
    function() {
        var originalText = 'Oh my God, someone\'s trying to kill me!  Oh wait, it\'s for Bart.\n\n\t\t-- Homer Simpson\n\t\t   Cape Feare';

        var massagedText = this.game.massage(originalText);

        expect(massagedText).toEqual('Oh my God, someone\'s trying to kill me! Oh wait, it\'s for Bart.');
    });

    it("should validate text and distribute scores upon validation request",
    function() {
        var typedText = "Dette er en";
        var status = {
            "errors": [1],
            "percentage": 98
        };
        spyOn(this.game.scoring, "validate").andReturn(status);
        spyOn(this.everyone.now, 'receiveScores');

        this.game.validate(this.everyone.now, typedText);
        expect(this.everyone.now.receiveScores).toHaveBeenCalledWith({
            clientId: "123",
            name: undefined
        },
        status);
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
        var typedText = this.originalText;

        spyOn(this.game.scoring, "validate").andReturn({
            "errors": [],
            "percentage": 100
        });
        spyOn(this.everyone.now, 'gameOver');

        this.game.validate(this.everyone.now, typedText);

        expect(this.everyone.now.gameOver).toHaveBeenCalled();
        expect(this.game.gameStatus).toEqual("Completed");
    });

    it("should start game on request",
    function() {
        spyOn(this.everyone.now, 'displayTextToBeTyped');
        spyOn(this.everyone.now, 'hideStartButton');
        spyOn(this.game, "loadText").andCallFake(function(callback) {
            callback()
        });

        this.game.startGame();

        this.clock.tick(4000);
        expect(this.everyone.now.displayTextToBeTyped).not.toHaveBeenCalled();

        this.clock.tick(1000);
        expect(this.everyone.now.displayTextToBeTyped).toHaveBeenCalled();
        expect(this.everyone.now.hideStartButton).toHaveBeenCalled();
        expect(this.game.gameStatus).toEqual("InProgress");

    });

});