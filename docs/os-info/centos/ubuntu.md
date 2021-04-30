---
id: ubuntu
title: ubuntu常见问题
sidebar_label: ubuntu常见问题
slug: /os-info/ubuntu
---

## 查看版本

```
lsb_release -a
```



## 安装node.js

参考:https://github.com/nodesource/distributions/blob/master/README.md



```
# Using Ubuntu

curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Using Debian, as root
curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
apt-get install -y nodejs

```
## 添加 authorized_keys 
在.ssh/authorized_keys 添加key



