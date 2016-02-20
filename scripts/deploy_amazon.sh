#! /bin/bash
rm -rf projects/amazon_cloud/api_framework/*
cp -R projects/$1 projects/amazon_cloud/api_framework/
cd projects/amazon_cloud/api_framework/$1
mv $1.py ../API.py 
mv * ../
cd ../..
git add .
git commit -m "LATEST AMAZON CLOUD DEPLOY"
git push --force --set-upstream origin

ssh -i pinkhelium.pem ubuntu@54.201.85.3 -t <<"END"
cd amazon_cloud
git pull;
cd ~/amazon_cloud/api_framework/
pid=$(pgrep "\<hug\>")
kill $pid
hug -f API.py -p 7777 &
sleep 5
pid=$(pgrep "\<node\>")
kill $pid
END

# lt -s apiamazonaws -p 7777 