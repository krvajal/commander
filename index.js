'use strict';

var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/app'));


app.get('/', function(request, response) {
  response.render('app/index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


