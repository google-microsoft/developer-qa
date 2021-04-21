---
id: mysql
title: mysql常见运维问题
sidebar_label: mysql常见运维问题
slug: /app-info/mysql
---

## 1.xampp相关

下载地址:https://www.apachefriends.org/index.html

如果是在centos上,可以使用:jdk15-maven-gradle-with-xampp.zip来安装比较好

添加到环境变量:






### (1).重置xampp mysql root密码

```
vi /opt/lampp/etc/my.cnf

[client]
user = root
password        = password
port            =3306

然后,登陆用root/passowrd

update mysql.user set password=password('hedaye') where user='root';
FLUSH PRIVILEGES;


```

 

### 2.xampp在centos中报错如下:

```
opt/lampp/bin/gettext: error while loading shared libraries: libc.so.6: cannot open shared object file: No such file or directory 
```

##### 解决方法:

```
vi /opt/lampp/lampp
```

找到

```
if egrep "9 " /etc/redhat-release > /dev/null 
```

Change the number “9 “ to the CentOS version you are using (for example I use CentOS version 6.x)

把这个9,改成自己的操作系统的版本,比如我用的是centos 7,那就把这个9改成7

```
if egrep "7 " /etc/redhat-release > /dev/null 
```



### 3.远程访问mysql

```output
update user set host='%' where user='root';
flush privileges;
```


#### 3.[com.mysql.jdbc.PacketTooBigException](https://stackoverflow.com/questions/11320236/com-mysql-jdbc-packettoobigexception)

```
SET GLOBAL max_allowed_packet = 1024*1024*14;
```

### 4.查询mysql死锁并杀死进程

```
SELECT trx_mysql_thread_id, trx_state, trx_query
FROM INFORMATION_SCHEMA.INNODB_TRX;
```

杀死进程

```
杀掉进程          KILL 进程id;
```



### 5.导出mysql数据库命令



```
mysqldump -u root -p ry-vue > sql/all.sql
```

