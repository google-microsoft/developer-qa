---
id: nginx
title: nginx常见问题
sidebar_label: nginx常见问题
slug: /app-info/nginx
---

## 安装nginx

To add NGINX yum repository, create a file named 

/etc/yum.repos.d/nginx.repo

 and paste one of the configurations below:

CentOS:

```
[nginx-stable]
name=nginx stable repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true

[nginx-mainline]
name=nginx mainline repo
baseurl=http://nginx.org/packages/mainline/centos/$releasever/$basearch/
gpgcheck=1
enabled=0
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true

```

```
then:

yum install nginx


if error

 yum-config-manager --disable epel

```

