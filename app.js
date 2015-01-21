var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var fs = require('fs');

app.use(function (req, res, next){
   app.use(express.static(path.join(__dirname, '.')));
   next();
});

var server = http.createServer(app);
server.listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

