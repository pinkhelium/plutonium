var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

var port = 8000;

const spawn = require('child_process').spawn;

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
	//console.log(request.body);
	var project_name = request.body.name;
	var project_repo_url = request.body.repo_url;

	console.log(project_name);
	console.log(project_repo_url);
	const init_spawn = spawn('./scripts/init.sh', [project_name, project_repo_url]);

	init_spawn.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`);
	});

	init_spawn.stderr.on('data', (data) => {
		console.log(`stderr: ${data}`);
	});

	init_spawn.on('close', (code) => {
		console.log(`child process exited with code ${code}`);
	});
})

