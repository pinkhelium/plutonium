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
console.log("***********************************************************************************");

app.post('/openproject', function(request, response){
	console.log(request);
	var p_name = request.body.project_name;


	const invisblehelper_spawn = spawn('./scripts/invisible_helper.sh', [p_name]);

	invisblehelper_spawn.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`);
	});

	invisblehelper_spawn.stderr.on('data', (data) => {
		console.log(`stderr: ${data}`);
	});

	invisblehelper_spawn.on('close', (code) => {
		console.log(`invisible_helper process exited with code ${code}`);
		console.log("***********************************************************************************");
		if(code==0){
			const inhelper_spawn = spawn('pwd');
			fs.readFile('doc.json', function (err, data) {
   				if (err) {
       				return console.error(err);
   				}
   				documentation_struct = JSON.parse(data);
				response.send({"fail": false, "doc": documentation_struct});
				console.log(documentation_struct)
				});	//false means it didn't fail
		}
		else {
			response.send(true);
		}
	});
});

//app.use(express.static(__dirname + '/dist'));

app.post('/build',function(request,response){
	console.log('recv build');
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
		console.log("***********************************************************************************");	
		if(code==0){
			response.send("0");
		}
		else {
			response.send("1");
		}
	});
})

app.post('/function', function(request,response){
	console.log('Creating Function');
	//console.log(request.body);
	var project_name = request.body.project_name;
	var api_code_file = request.body.project_name;
	var user_code_file = request.body.function_name + ".py";
	var function_name = request.body.function_name;
	var method_type = request.body.method_type;
	var version_number = request.body.version_number;
	var user_code_file_content = request.body.code;

	var createCodeFile = function(){
		fs.appendFile("projects/" + project_name +  "/" + user_code_file, user_code_file_content, checkCode);
		console.log(user_code_file_content);
	}

	var checkCode = function(err, data){
		if(err){
			console.log("oopsies");
			returnValue = {
				value: "1"
			}
			response.send(true);
			//true means it failed.
		}
		else{
			const function_spawn = spawn('./scripts/expose.sh', [project_name, api_code_file, user_code_file, function_name, method_type, version_number]);

			function_spawn.stdout.on('data', (data) => {
				console.log(`stdout: ${data}`);
			});

			function_spawn.stderr.on('data', (data) => {
				console.log(`stderr: ${data}`);
			});

			function_spawn.on('close', (code) => {
				console.log(`expose process exited with code ${code}`);
				console.log("***********************************************************************************");

				const checkbuild_spawn =  spawn('./scripts/checkbuild.sh', [project_name]);

				checkbuild_spawn.stdout.on('data', (data) => {
					console.log(`stdout: ${data}`);
				});
				
				checkbuild_spawn.stderr.on('data', (data) => {
					console.log(`stderr: ${data}`);
				});

				checkbuild_spawn.on('close', (code) => {
					console.log(`checkbuild process exited with code ${code}`);
					console.log("***********************************************************************************");	

					const invisblehelper_spawn = spawn('./scripts/invisible_helper.sh', [project_name]);

					invisblehelper_spawn.stdout.on('data', (data) => {
						console.log(`stdout: ${data}`);
					});

					invisblehelper_spawn.stderr.on('data', (data) => {
						console.log(`stderr: ${data}`);
					});

					invisblehelper_spawn.on('close', (code) => {
						console.log(`invisible_helper process exited with code ${code}`);
						console.log("***********************************************************************************");
						if(code==0){
						const inhelper_spawn = spawn('pwd');
						fs.readFile('doc.json', function (err, data) {
   							if (err) {
       							return console.error(err);
   							}
   							documentation_struct = JSON.parse(data);

   							if (!documentation_struct){
   								fs.readFile('doc.json', function (err, data) {
   									if (err) {
       									return console.error(err);
   									}
   								console.log("GOT IT THE SECOND TIME!")
   								documentation_struct = JSON.parse(data)});
   							}
							response.send({"fail": false, "doc": documentation_struct});
						});	//false means it didn't fail
					}
					else {
						response.send({"fail":true,"doc": ""});
					}

					});
					// if(code==0){
					// 	const inhelper_spawn = spawn('pwd');
					// 	fs.readFile('doc.json', function (err, data) {
   		// 					if (err) {
     //   							return console.error(err);
   		// 					}
   		// 					documentation_struct = JSON.parse(data);

   		// 					if (!documentation_struct){
   		// 						fs.readFile('doc.json', function (err, data) {
   		// 							if (err) {
     //   									return console.error(err);
   		// 							}
   		// 						console.log("GOT IT THE SECOND TIME!")
   		// 						documentation_struct = JSON.parse(data)});
   		// 					}
					// 		response.send({"fail": false, "doc": documentation_struct});
					// 	});	//false means it didn't fail
					// }
					// else {
					// 	response.send(true);
					// }
				});
			});
		}
	}
	createCodeFile();
})

app.post('/deploy', function(request,response){
	console.log(request.body);

	//response.send("Hi");

	var project_name = request.body.project_name;
	var type = request.body.type;

	if(type=="aws"){
		const deploy_spawn = spawn('./scripts/deploy_amazon.sh', [project_name]);

		deploy_spawn.stdout.on('data', (data) => {
			console.log(`stdout: ${data}`);
		});

		deploy_spawn.stderr.on('data', (data) => {
			console.log(`stderr: ${data}`);
		});

		deploy_spawn.on('close', (code) => {
			console.log(`child process exited with code ${code}`);
			console.log("***********************************************************************************");	
			if(code==0){
				response.send({fail:false});
			}
			else {
				response.send({fail:true});
			}
		});
	}
	else if(type=="local"){

	}
	else if(type=="heroku"){

	}
})