---
id: java
title: java常见运维问题
sidebar_label: java常见运维问题
slug: /app-info/java
---

### 1.查找jar的进程并杀掉进度shell

```
p=`jcmd | grep test-admin.jar | cut -d " " -f 1`

kill -9 $p
```

### 2.打包targ.gz压缩和解压命令

```
压缩
tar -zcvf develop-project.tar.gz dist

解压
tar -zxvf develop-project.tar.gz

```

### 3.修改springboot启动端口

```
idea运行配置上,VM options上加-Dserver.port=8006
```

### 4.经验部署java的脚本
如:
```markdown

ssh -p 16070 root@localhost <<eeooff

sh /home/work/server/server.sh

eeooff

```

server.sh 内容:

```shell
project=test-admin

cd /home/work/project/server

git pull

mvn clean package

PID=$(cat /home/work/server/pid)

kill -9 $PID

cd /home/work/project/server/test-admin/target/

java -jar -Dfile.encoding=UTF-8 $project.jar > /home/work/server/log 2>&1 &

echo $! > /home/work/server/pid


```
