---
id: ubuntu
title: ubuntu常见问题
sidebar_label: ubuntu常见问题
slug: /os-info/ubuntu
---

## 1.查看版本

```
lsb_release -a
```



## 2.安装node.js

参考:https://github.com/nodesource/distributions/blob/master/README.md



```
# Using Ubuntu

curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Using Debian, as root
curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
apt-get install -y nodejs

```
## 3.添加 authorized_keys 
在.ssh/authorized_keys 添加key


## 4.解决Ubuntu 中vim编辑器使用上下键出现[A][B][C][D]问题

原因在于ubuntu系统自带的 vi 不完整导致。

```shell

apt-get update

apt-get install vim-gtk

```

②解决资源不可用问题

输入如下命令进行强制解锁

```shell

sudo rm /var/cache/apt/archives/lock
sudo rm /var/lib/dpkg/lock
sudo apt-get remove vim-common

然后:

sudo apt-get install vim
sudo apt-get install vim-gtk

```

## 5.解决Linux中su命令，鉴定失败问题

Ubuntu安装完成后，root用户默认是被锁定了的，不允许登录，也不允许su到root，解决办法如下

```shell
sudo passwd

重置密码即可

```

## 6.解决SSH会话连接超时问题

下面我们就介绍三种防止超时被踢出的方法，后两种情况的设置方法以及通过设置shell变量来达到此目的的方法：

```shell
vi /etc/ssh/sshd_config


修改或添加下面两行：

# 3600秒=1小时
ClientAliveInterval 3600
# 允许超时3次
ClientAliveCountMax 3



重启sshd service：
# Ubuntu下
sudo /etc/init.d/ssh restart
# CentOS下
systemctl restart sshd.service

```

## 7.升级git到最新版本
```shell
apt install software-properties-common -y
add-apt-repository -y ppa:git-core/ppa
apt-get update
apt-get install git -y

# centos:

yum install git


```
## 8. 查询在linux包含某个字符的文件:

```shell

grep -iRl "/usr/share/nginx" /


Here are the switches:
-i - ignore text case
-R - recursively search files in subdirectories.
-l - show file names instead of file contents portions.

./ - the last parameter is the path to the folder containing files you need to search for your text. In our case, it is the current folder with the file mask. You can change it to the full path of the folder. For example, here is my command
```
