import sys, getopt, os

def add_func(pn, acf, ucf, fn, mn, vn):
	# Set file paths for reading and writing.
	os.chdir("projects/" + pn)
	# # main_project_file_path = + acf
	# function_file_path = "~/Documents/pinkhelium/projects/" + pn + "/" + ucf

	decorator_content = " "
	# Prepare decorator content
	decorator_content = "@hug." + mn + "('/" + fn + "', versions=" + vn + ")"

	# Prepare function definition content
	with open(ucf, 'r') as function_file_object:
		function_content = function_file_object.read()
	
	# Write content to project file
	with open(acf+'.py', 'a') as main_project_file_object:
		main_project_file_object.write(decorator_content + "\n")
		main_project_file_object.write(function_content + "\n")
		main_project_file_object.write('\n')

def main(argv):
	# Define variables. Defining variables explicitly for easier readability.
	project_name = ''
	api_code_file = ''
	user_code_file = ''
	function_name = ''
	method_name = ''
	version_number = ''

	# Error handling stuff with options. Just makes for elegant code. 
	try:
		opts, args = getopt.getopt(argv,"hp:a:u:f:m:v:",["project=", "apicodefile=","usercodefile=", "function=", "method=", "version="])
	except getopt.GetoptError:
		print('code.py -p <project_name> -a <api_code_files> -u <user_code_file> -f <function_name> -m <http_request_method> -v <api_version>')
		sys.exit(2)

	# Extract command line arguments
	for opt, arg in opts:
		if opt == '-h':
			print('code.py -p <project_name> -a <api_code_files> -u <user_code_file> -f <function_name> -m <http_request_method> -v <api_version>')
			sys.exit()
		elif opt in ("-p", "--project"):
			project_name = arg	
		elif opt in ("-a", "--apicodefile"):
			api_code_file = arg
		elif opt in ("-u", "--usercodefile"):
			user_code_file = arg
		elif opt in ("-f", "--function"):
			function_name = arg
		elif opt in ("-m", "--method"):
			method_name = arg
		elif opt in ("-v", "--version"):
			version_number = arg

	# Debug printing ONLY. Uncomment the next few print lines for production.
	print('Project is : ', project_name)
	print('API Code file is : ', api_code_file)
	print('User Code file is : ', user_code_file)
	print('Function Name is : ', function_name)
	print('Method Name is : ', method_name)
	print('Version Number is : ', version_number)

	# Call add_func to add a function to the main project file which hug will call to start the api server.
	add_func(project_name, api_code_file, user_code_file, function_name, method_name, version_number)

if __name__ == "__main__":
	main(sys.argv[1:])
