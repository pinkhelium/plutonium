var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

var port = 8000;

app.use(cors());
app.use(bodyParser.json()); 

app.listen(port);

console.log("Server Running");

//app.use(express.static(__dirname + '/dist'));

app.post('/build',function(request,response){
	console.log('recv');
	console.log(request.body);
})

app.post('/init', function(request,response){
	console.log('Creating Project');
})

