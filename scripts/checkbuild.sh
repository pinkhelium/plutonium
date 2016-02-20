#! /bin/bash
pn=$1
acf=$1
cd projects/$1

hug -f "$acf.py" &
sleep .5
pid=$(pgrep "\<hug\>")
if [ $? -ne 0 ]; then
	echo "FAILURE!";
else
	sudo pkill "hug"
	echo "SUCCESS";
fi