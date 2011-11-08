if (typeof require === "function" && typeof module !== "undefined") {
    var TDD = {};
    TDD.scoring = require("../src/scoring");
}

describe("Validation of text and scoring",
function() {

    var originalText,
    scoring;

    beforeEach(function() {
        originalText = "Dette er en test"
        scoring = Object.create(TDD.scoring);
    });

    describe("Text validation",
    function() {

        it("should validate typed text",
        function() {
            var typedText = "DeTte er en test";

            var scoring = Object.create(TDD.scoring);

            expect(scoring.validate).toBeDefined();

            var results = scoring.validate(originalText, typedText);

            expect(results.errors.length).toEqual(1);
            expect(results.errors[0]).toEqual(2);
        });

        it("should validate text with 2 errors",
        function() {
            var typedText = "DeTte Er en test";

            expect(scoring.validate).toBeDefined();

            var results = scoring.validate(originalText, typedText);

            expect(results.errors.length).toEqual(2);
            expect(results.errors[0]).toEqual(2);
            expect(results.errors[1]).toEqual(6);
        });

    });

    describe("Score calculation",
    function() {

        it("should calculate score when typed text is 100% complete",
        function() {
            var typedText = "Dette er en test";
            var score = scoring.validate(originalText, typedText);

            expect(score.percentage).toEqual(100);
        });

        it("should calculate score when typed text is 0% complete",
        function() {
            var typedText = "";
            var score = scoring.validate(originalText, typedText);

            expect(score.percentage).toEqual(0);
        });

        it("should calculate score when typed text is incomplete",
        function() {
            var typedText = "DeTte er";
            var score = scoring.validate(originalText, typedText);

            expect(score.percentage).toEqual(5 / 10 * 100);
        });

    });
});
