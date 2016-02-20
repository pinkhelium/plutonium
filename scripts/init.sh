#! /bin/bash

api_project_name=$1;
remote_repo_url=$2;

# HANDLE FILE OPERATIONS
mkdir projects/$api_project_name;
cd projects/$api_project_name;

# CREATE CONFIG FILE

# GIT INIT
git init;	
git remote add origin $remote_repo_url;

# TOUCH PROJECT_NAME.PY
touch $api_project_name.py;
printf "import hug \n" >> $api_project_name.py
git add . ;
git commit -m "Initial Commit!";
git push origin master;