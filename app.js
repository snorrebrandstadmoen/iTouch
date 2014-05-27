var express = require('express');
var app = express.createServer();
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/lib'));
app.use(express.static(__dirname + '/src/client'));
app.listen(process.env.PORT || 5000);

var nowjs = require("now");
everyone = nowjs.initialize(app);

var playerPointers = [];
var players = [];

var TDD = TDD || {};
TDD.game = require("./src/server/game");
TDD.scoring = require("./src/server/scoring");

var game = TDD.game.create({
    originalText: "Dette er en test",
    scoring: TDD.scoring.create(),
    everyone: everyone,
	playerPointers: playerPointers,
	players: players
});

nowjs.on('disconnect',
function() {
	game.disconnectUser(this.user);
});

game.init();