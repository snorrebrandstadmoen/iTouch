if (typeof require === "function" && typeof module !== "undefined") {
    var TDD = {};
    TDD.scoring = require("../src/scoring");
}

describe("Scoring",
function() {

    var scoring, originalText;

    beforeEach(function() {
        originalText = "Dette er e";
        scoring = Object.create(TDD.scoring);
    });

    it("should calculate score when typed text is 100% complete",
    function() {
        var typedText = "Dette er e";
        var score = scoring.calculateScore(originalText, typedText);

        expect(score.percentage).toEqual(100);
    });

    it("should calculate score when typed text is 0% complete",
    function() {
        var typedText = "";
        var score = scoring.calculateScore(originalText, typedText);

        expect(score.percentage).toEqual(0);
    });

    it("should calculate score when typed text is incomplete",
    function() {
        var typedText = "DeTte er";
        var score = scoring.calculateScore(originalText, typedText);

        expect(score.percentage).toEqual(8 / 10 * 100);
    });

});