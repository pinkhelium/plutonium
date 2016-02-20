var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var fs = require('fs');

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
		if(code==0){
			response.send(0);
		}
		else {
			response.send(1);
		}
	});
})

app.post('/function', function(request,response){
	console.log('Creating Function');
	//console.log(request.body);
	var project_name = request.body.name;
	var api_code_file = request.body.name;
	var user_code_file = request.body.function_name + ".py";
	var function_name = request.body.function_name;
	var method_type = request.body.method_type;
	var version_number = request.body.version_number;
	var user_code_file_content = request.body.code;

	var createCodeFile = function(checkCode){
		fs.writeFile(user_code_file, function(err){
			if(err){
				return console.log(err);
			}
			console.log("Created File");
		})
	}

	var checkCode = function(err, data){
		if(err){
			console.log("oopsies");
		}
		else{
			const function_spawn = spawn('python3.4', ['/scripts/code.py', '-p', project_name, '-a',api_code_file,'-u', user_code_file, '-f',function_name, '-m',method_type, '-v',version_number]);

			function_spawn.stdout.on('data', (data) => {
				console.log(`stdout: ${data}`);
			});

			function_spawn.stderr.on('data', (data) => {
				console.log(`stderr: ${data}`);
			});

			function_spawn.on('close', (code) => {
				console.log(`child process exited with code ${code}`);
			});
		}
		
	}
	
})


