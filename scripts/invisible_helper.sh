#! /bin/bash
rm -rf projects/amazon_cloud/api_framework/*
cp -R projects/$1 projects/amazon_cloud/api_framework/
cd projects/amazon_cloud/api_framework/$1
mv $1.py ../API.py 
mv * ../
cd ../..

hug -f api_framework/API.py -p 3211 &
pid=$!
# sleep .1
ps -e | grep "hug"
sleep 6

curl localhost:3211 | cat > ../../doc.json

# sleep 6
kill -9 $pid
