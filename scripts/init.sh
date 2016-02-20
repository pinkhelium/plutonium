#! /bin/bash

api_project_name=$1;
remote_repo_url=$2;

# HANDLE FILE OPERATIONS
mkdir ~/Documents/pinkhelium/projects/$api_project_name;
cd ~/Documents/pinkhelium/projects/$api_project_name;

# CREATE CONFIG FILE

# GIT INIT
git init;	
git remote add origin $remote_repo_url;

# TOUCH PROJECT_NAME.PY
touch $api_project_name.py;
echo "import hug \n" >> $api_project_name.py
git add . ;
git commit -m "Initial Commit!";
git push origin master;