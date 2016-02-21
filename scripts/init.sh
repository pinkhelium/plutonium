#! /bin/bash

api_project_name=$1;
remote_repo_url=$2;

# HANDLE FILE OPERATIONS
mkdir projects/$api_project_name || exit 1
cd projects/$api_project_name || exit 1;

# CREATE CONFIG FILE

# GIT INIT
git init || exit 1;	
git remote add origin $remote_repo_url || exit 1;

# TOUCH PROJECT_NAME.PY
touch $api_project_name.py || exit 1;
printf "import hug \n\n@hug.get('/dummy', versions=range(1,3))\ndef dummy(values):\n\treturn(values)\n" >> $api_project_name.py || exit 1
git add . || exit 1;
git commit -m "Initial Commit!" || exit 1;
git push --force --set-upstream origin master || exit 1;