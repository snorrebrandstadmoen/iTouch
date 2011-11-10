var express = require('express');
var app = express.createServer();
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/lib'));

app.listen(8080);

var nowjs = require("now");
var everyone = nowjs.initialize(app);


nowjs.on("connect", function(){
  console.log("Joined: " + this.now.name);
});

nowjs.on("disconnect", function(){
  console.log("Left: " + this.now.name);
});

