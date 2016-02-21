#! /bin/bash
pn=$1
acf=$1
cd projects/$1

hug -f "$acf.py" -p 7979 &
pid=$!
sleep 2
pgrep "\<hug\>"
if [ $? -ne 0 ]; then
	echo "CB FAILURE!";
else
	kill -9 $pid;
	echo "SUCCESS";
fi