---
id: mysql
title: mysql常见运维问题
sidebar_label: mysql常见运维问题
slug: /app-info/mysql 
---



# 1.centos 8安装mysql

On CentOS 8, MySQL version 8 is available from the default repositories.

Run the following command to install the `mysql-server` package and a number of its dependencies:

```bash
dnf install mysql-server
```



When prompted, press `y` and then `ENTER` to confirm that you want to proceed:

```
Output. . .
Install  49 Packages

Total download size: 46 M
Installed size: 252 M
Is this ok [y/N]: y
```

With that, MySQL is installed on your server but it isn’t yet operational. The package you just installed configures MySQL to run as a `systemd` service named `mysqld.service`. In order to use MySQL, you will need to start it with the `systemctl` command:

```bash
systemctl start mysqld.service
```

 

Next, set MySQL to start whenever the server boots up with the following command:

```bash
sudo systemctl enable mysqld
```

  

## Step 2 — Securing MySQL(reset root password)

MySQL includes a security script that allows you to change some default configuration options in order to improve MySQL’s security.

To use the security script, run the following command:

```bash
sudo mysql_secure_installation
```

 

This will take you through a series of prompts asking if you want to make certain changes to your MySQL installation’s security options. The first prompt will ask whether you’d like to set up the Validate Password Plugin, which you can use to test the strength of your MySQL password.

If you elect to set up the Validate Password Plugin, the script will ask you to choose a password validation level. The strongest level — which you select by entering `2` — will require your password to be at least eight characters long and include a mix of uppercase, lowercase, numeric, and special characters:

```
OutputSecuring the MySQL server deployment.

Connecting to MySQL using a blank password.

VALIDATE PASSWORD COMPONENT can be used to test passwords
and improve security. It checks the strength of password
and allows the users to set only those passwords which are
secure enough. Would you like to setup VALIDATE PASSWORD component?

Press y|Y for Yes, any other key for No: Y

There are three levels of password validation policy:

LOW    Length >= 8
MEDIUM Length >= 8, numeric, mixed case, and special characters
STRONG Length >= 8, numeric, mixed case, special characters and dictionary                  file

Please enter 0 = LOW, 1 = MEDIUM and 2 = STRONG: 2
```

Regardless of whether you choose to set up the Validate Password Plugin, the next prompt will be to set a password for the MySQL **root** user. Enter and then confirm a secure password of your choice:

```
OutputPlease set the password for root here.


New password: 

Re-enter new password: 
```

If you used the Validate Password Plugin, you’ll receive feedback on the strength of your new password. Then the script will ask if you want to continue with the password you just entered or if you want to enter a new one. Assuming you’re satisfied with the strength of the password you just entered, enter `Y` to continue the script:

```
OutputEstimated strength of the password: 100 
Do you wish to continue with the password provided?(Press y|Y for Yes, any other key for No) : Y
```

Following that, you can press `Y` and then `ENTER` to accept the defaults for all the subsequent questions. This will remove some anonymous users and the test database, disable remote root logins, and load these new rules so that MySQL immediately respects the changes you have made.

With that, you’ve installed and secured MySQL on your CentOS 8 server. As a final step, we will test that the database is accessible and working as expected.

 



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

### 5.导出,导入mysql数据库命令

```
导出:
mysqldump -u root -p ry-vue > sql/all.sql

导入:

mysql -u root -p  ry-vue < sql/all.sql
```

## 2. 自动输入msyql密码:

### 第一种方法:

```shell
#!/usr/bin/env bash

mysqldump -uroot -p123456 -hlocalhost --databases tao --tables gen_table gen_table_column sys_dict_data sys_dict_type  >sql/backupsetup.sql
```

### 第二种方法:

```shell
#!/usr/bin/expect
spawn ./exportdb.sh
expect "Enter password:"
send "password\n"

或者

#!/usr/bin/expect
spawn ./importdb.sh
expect "Enter password:"
send "password\n"
```

这里重点命令是:spawn,expect,send,这里的"interact"可以不要
可以不要
注意:
这里的

```shell
./exportdb.sh
./importdb.sh
```

这里是必需分开写的,不然,自动输入密码会无效

1.入口文件要加头:

```shell
#!/usr/bin/expect
```

2.exportdb.sh文件内容

```shell
#!/usr/bin/env bash
mysqldump -u root -p ry-vue > sql/all.sql
```

3.importdb.sh文件内容

```shell
#!/usr/bin/env bash
mysql -u root -p  ry-vue < sql/all.sql
```

## 3. docker上部署并远程访问mysql

### (1) docker-compose配置:

```yaml
# This configuration is intended for development purpose, it's **your** responsibility to harden it for production
version: '3.8'
services:
  e2edemo-mysql:
    image: mysql:8.0.23
    volumes:
     - ~/volumes/jhipster/e2edemo/mysql/:/var/lib/mysql/
    environment:
      MYSQL_ROOT_PASSWORD: password
    # If you want to expose these ports outside your dev PC,
    # remove the "127.0.0.1:" prefix
    ports:
      - 3306:3306
    command: mysqld --lower_case_table_names=1 --skip-ssl --character_set_server=utf8mb4 --explicit_defaults_for_timestamp
```

### (2) 设置远程访问

```shell
进入容器:

docker exec -it app_e2edemo-mysql_1 bash

登陆 mysql 
mysql -uroot -p

alter user 'root'@'%' identified with mysql_native_password by 'your-password';

flush privileges;

记得退出容器,即可
```
