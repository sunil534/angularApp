var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var bodyparser = require('body-parser');
var fs = require('fs');

app.use(function (req, res, next){
   app.use(express.static(path.join(__dirname, '.')));
   next();
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}));


app.get('/get/passengerDetails', function(req,res){
 var data = fs.readFileSync('configJson/passengerDetails.json'),
     myObj;
   try {
     
	  myObj = JSON.parse(data);
	  res.end(JSON.stringify(myObj));
  }
  catch (err) {
    console.log('There has been an error parsing your JSON.')
    console.log(err);
  }
  
});

app.post('/post/passengerDetails', function(req,res){

var tempVar = JSON.stringify(req.body);
  fs.writeFile("configJson/passengerDetails.json", tempVar, function(err) {
    if(err) {
        console.log(err);
    } else {
        
		var data = fs.readFileSync('configJson/passengerDetails.json'),
     myObj;
	  myObj = JSON.parse(data);
	  res.end(JSON.stringify(myObj));
    }
}); 


  
});





var server = http.createServer(app);
server.listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

