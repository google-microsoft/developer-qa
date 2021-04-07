---
id: java
title: java常见运维问题
sidebar_label: java常见运维问题
slug: /app-info/java
---

### 1.查找jar的进程并杀掉进度shell

```
p=`jcmd | grep tao-admin.jar | cut -d " " -f 1`

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

