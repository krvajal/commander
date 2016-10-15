'use strict';
var express = require("express");

var app = express();


var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)


app.set('port', process.env.PORT || 9000);


app.use(methodOverride());
app.use(express.static(__dirname + '/app'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

// app.use(app.router);



app.get('/', function(request, response) {
  response.render('index.html');
});

var port = 9000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
