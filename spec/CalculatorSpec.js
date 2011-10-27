(function() {
    describe("Calculator",
    function() {
        var calculator;

        beforeEach(function() {
            calculator = new Calculator();
        });

        it("should add numbers",
        function() {
            var sum = calculator.add(1, 2);
            console.log(sum);
            expect(sum).toEqual(3);
        });

    });
})();

