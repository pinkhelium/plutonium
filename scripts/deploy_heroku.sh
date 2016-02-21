#!/bin/bash

rm -rf projects/heroku_cloud/$1/*
cd projects/heroku_cloud
mkdir $1
cd $1
git init

cp -R ../../$1 ../


# cp -R ../../projects/$1 .

# mv $1.py API.py

# touch Procfile requirements.txt
touch Procfile conda-requirements.txt requirements.txt
echo "python-3.4.3" | cat > runtime.txt

echo "web: hug -f $1.py" | cat > Procfile
echo "pip>=8.0.0" | cat > requirements.txt
echo "hug>=1.9.9" | cat >> requirements.txt
echo "hug" | cat > conda-requirements.txt

heroku create $1
heroku buildpacks:set heroku/python
# heroku config:add BUILDPACK_URL=https://github.com/kennethreitz/conda-buildpack.git
git add .
git commit -m "buildpack"
git push heroku master