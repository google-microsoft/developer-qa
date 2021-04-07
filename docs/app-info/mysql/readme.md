---
id: mysql
title: mysql常见运维问题
sidebar_label: mysql常见运维问题
slug: /app-info/mysql
---

### 1.xampp相关

下载地址:https://www.apachefriends.org/index.html

如果是在centos上,可以使用:jdk15-maven-gradle-with-xampp.zip来安装比较好

添加到环境变量:





#### (1).重置xampp mysql root密码

```
vi /opt/lampp/etc/my.cnf
Add a sentence to the paragraph of [mysqld]:skip-grant-tables,which is:
E.g:
[mysqld]
datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock
skip-name-resolve
skip-grant-tables


update mysql.user set password=password('hedaye') where user='root';
FLUSH PRIVILEGES;


```

 

#### 2.xampp在centos中报错如下:

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



#### 3.远程访问mysql

```output
update user set host='%' where user='root';
flush privileges;
```

#### 4.centos7打开3306端口

```
firewall-cmd --zone=public --add-port=3306/tcp --permanent

firewall-cmd --reload

```

#### 5.[com.mysql.jdbc.PacketTooBigException](https://stackoverflow.com/questions/11320236/com-mysql-jdbc-packettoobigexception)

```
SET GLOBAL max_allowed_packet = 1024*1024*14;
```

#### 6.mysql_upgrade

Error encountered when performing Introspect schema mysql: Column count of mysql.proc is wrong. Expected 21, found 20. Created with MariaDB 100108, now running 100418. Please use mysql_upgrade to fix this error.
Column count of mysql.proc is wrong. Expected 21, found 20. Created with MariaDB 100108, now running 100418. Please use mysql_upgrade to fix this error
 (5 sec, 296 ms)

