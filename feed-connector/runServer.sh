#!/bin/sh

CLASSPATH="wrapper.jar:./conf/:../libs/*:"
echo "$CLASSPATH" > cp.txt

java -cp "$CLASSPATH" -Xmx1024m -Dlogback.configurationFile="./conf/logback.xml" -Dhost="127.0.0.1" -Dport="8992" -Dconfig="libSportConfig.json" jayeson.service.feedwrapper.server.Main &

read -rsp $'\e[32mServer is running. Press <ENTER> to continue...\e[0m\n'