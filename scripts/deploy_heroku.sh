#!/bin/bash

rm -rf projects/heroku_cloud/api_framework/*
cp -R projects/$1 projects/heroku_cloud/api_framework/
cd projects/heroku_cloud/api_framework/$1
mv $1.py API.py

touch Procfile requirements.txt
echo "web: hug -f API.py" | cat > Procfile
echo "hug --upgrade" | cat requirements.txt

heroku create --buildpack git://github.com/heroku/heroku-buildpack-python.git

git push heroku master