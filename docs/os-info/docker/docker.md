---
id: docker
title: docker常见问题
sidebar_label: docker常见问题
slug: /os-info/docker
---



## 安装docker

```
yum remove docker \
  docker-client \
  docker-client-latest \
  docker-common \
  docker-latest \
  docker-latest-logrotate \
  docker-logrotate \
  docker-engine


yum install -y yum-utils

yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo




yum install docker-ce docker-ce-cli containerd.io -y


systemctl start docker


docker run hello-world


curl -L "https://github.com/docker/compose/releases/download/1.28.6/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose


chmod +x /usr/local/bin/docker-compose

docker-compose --version
```

