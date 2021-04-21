---
id: centos
title: Centos常见问题
sidebar_label: Centos常见问题
slug: /os-info/centos
---

## 1.查看版本

```
cat /etc/centos-release

```

## 3.防火墙开启和关闭
通过
``` 
systemctl status firewalld

```
查看firewalld状态，发现当前是dead状态，即防火墙未开启。

通过
``` 
systemctl start firewalld
```
开启防火墙，没有任何提示即开启成功。

## 4.centos7打开,关闭3306端口

```
firewall-cmd --zone=public --add-port=3306/tcp --permanent

firewall-cmd --reload

firewall-cmd --remove-port=3306/tcp --permanent

firewall-cmd --reload

```

## 2.安装redis

```
wget https://download.redis.io/releases/redis-6.2.1.tar.gz
tar xzf redis-6.2.1.tar.gz
cd redis-6.2.1
make
make install

redis-server &

```

如遇到报错一般是gcc太旧,更新一下

```
yum install gcc-c++ yum install gcc 
```

然后重新解压,重新make

### (1).redis打开6379端口

```
firewall-cmd --zone=public --add-port=6379/tcp --permanent

firewall-cmd --reload

```

### (2).Redis启动多端口、运行多实例

```
redis-server --port 6380 & 
```

需要启动多个Redis实例：
一台Redis服务器，分成多个节点，每个节点分配一个端口（6380，6381…），默认端口是6379。
每个节点对应一个Redis配置文件，如： redis6380.conf、redis6381.conf

#cp redis.confredis6380.conf

#vi redis6380.conf

pidfile : pidfile/var/run/redis/redis_6380.pid

port 6380

logfile : logfile/var/log/redis/redis_6380.log

rdbfile : dbfilenamedump_6380.rdb

