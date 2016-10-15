'use strict';
var express = require("express");

var app = express();


var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)


app.set('port', process.env.PORT ||   5000);


app.use(methodOverride());

app.use(express.static(__dirname + '/app'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));


// app.use(app.router);


 // application -------------------------------------------------------------
  app.get('*', function(req, res) {
        res.sendfile('./app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



app.listen(app.get("port"), function() {
  console.log("Listening on " + app.get("port"));
});
