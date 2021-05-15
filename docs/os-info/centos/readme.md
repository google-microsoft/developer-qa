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

## 2.防火墙开启和关闭

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

关闭防火墙:

``` 
systemctl stop firewalld
```


## 3.centos7打开,关闭3306端口

```
firewall-cmd --zone=public --add-port=3306/tcp --permanent

firewall-cmd --reload

firewall-cmd --remove-port=3306/tcp --permanent

firewall-cmd --reload

```

## 4.安装redis

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

## 5. 自动输入密码:
 在这之前要有expect 如果没有请如下安装expect
```shell
yum -y install expect
```
然后
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

## 6.v2ray安装

参考: https://github.com/v2fly/fhs-install-v2ray

### 安装

```shell
bash <(curl -L https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-release.sh)
```

// 只更新 .dat 資料檔
```shell

 bash <(curl -L https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-dat-release.sh)
 
```

移除 V2Ray
```shell

bash <(curl -L https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-release.sh) --remove

```


结果如下:

```shell
# /etc/systemd/system/v2ray.service
[Unit]
Description=V2Ray Service
Documentation=https://www.v2fly.org/
After=network.target nss-lookup.target

[Service]
User=nobody
CapabilityBoundingSet=CAP_NET_ADMIN CAP_NET_BIND_SERVICE
AmbientCapabilities=CAP_NET_ADMIN CAP_NET_BIND_SERVICE
NoNewPrivileges=true
ExecStart=/usr/local/bin/v2ray -config /usr/local/etc/v2ray/config.json
Restart=on-failure
RestartPreventExitStatus=23

[Install]
WantedBy=multi-user.target

# /etc/systemd/system/v2ray.service.d/10-donot_touch_single_conf.conf
# In case you have a good reason to do so, duplicate this file in the same directory and make your customizes there.
# Or all changes you made will be lost!  # Refer: https://www.freedesktop.org/software/systemd/man/systemd.unit.html
[Service]
ExecStart=
ExecStart=/usr/local/bin/v2ray -config /usr/local/etc/v2ray/config.json

installed: /usr/local/bin/v2ray
installed: /usr/local/bin/v2ctl
installed: /usr/local/share/v2ray/geoip.dat
installed: /usr/local/share/v2ray/geosite.dat
installed: /usr/local/etc/v2ray/config.json
installed: /var/log/v2ray/
installed: /var/log/v2ray/access.log
installed: /var/log/v2ray/error.log
installed: /etc/systemd/system/v2ray.service
installed: /etc/systemd/system/v2ray@.service
removed: /tmp/tmp.wFWVhIKA3O
info: V2Ray v4.37.3 is installed.
You may need to execute a command to remove dependent software: apt purge curl unzip
Please execute the command: systemctl enable v2ray; systemctl start v2ray
  

```

在/usr/local/etc/v2ray/config.json里配置内容:

### 服务配置文件:

```
{
    "log": {
        "access": "/var/log/v2ray/access.log",
        "error": "/var/log/v2ray/error.log",
        "loglevel": "warning"
    },
    "inbound": {
        "port": 36170,
        "protocol": "vmess",
        "settings": {
            "clients": [
                {
                    "id": "a6195a7f-6f50-a98a-6d9a-72f4be66fdbd",
                    "level": 1,
                    "alterId": 100
                }
            ]
        },
        "streamSettings": {
            "network": "kcp"
        }
    },
    "outbound": {
        "protocol": "freedom",
        "settings": {}
    },
    "inboundDetour": [],
    "outboundDetour": [
        {
            "protocol": "blackhole",
            "settings": {},
            "tag": "blocked"
        }
    ],
    "routing": {
        "strategy": "rules",
        "settings": {
            "rules": [
                {
                    "type": "field",
                    "ip": [
                        "0.0.0.0/8",
                        "10.0.0.0/8",
                        "100.64.0.0/10",
                        "127.0.0.0/8",
                        "169.254.0.0/16",
                        "172.16.0.0/12",
                        "192.0.0.0/24",
                        "192.0.2.0/24",
                        "192.168.0.0/16",
                        "198.18.0.0/15",
                        "198.51.100.0/24",
                        "203.0.113.0/24",
                        "::1/128",
                        "fc00::/7",
                        "fe80::/10"
                    ],
                    "outboundTag": "blocked"
                }
            ]
        }
    }
}
```



### 客户商用配置文件:

参考:https://intmainreturn0.com/v2ray-config-gen/#

记得把"address": "localhost",改成远程的服务器的地址

```
{
    "log": {
        "loglevel": "warning"
    },
    "inbound": {
        "listen": "127.0.0.1",
        "port": 36170,
        "protocol": "socks",
        "settings": {
            "auth": "noauth",
            "udp": true,
            "ip": "127.0.0.1"
        }
    },
    "outbound": {
        "protocol": "vmess",
        "settings": {
            "vnext": [
                {
                    "address": "localhost",
                    "port": 36170,
                    "users": [
                        {
                            "id": "a6195a7f-6f50-a98a-6d9a-72f4be66fdbd",
                            "level": 1,
                            "alterId": 100
                        }
                    ]
                }
            ]
        },
        "streamSettings": {
            "network": "kcp"
        }
    },
    "outboundDetour": [
        {
            "protocol": "freedom",
            "settings": {},
            "tag": "direct"
        }
    ],
    "routing": {
        "strategy": "rules",
        "settings": {
            "rules": [
                {
                    "type": "field",
                    "port": "54-79",
                    "outboundTag": "direct"
                },
                {
                    "type": "field",
                    "port": "81-442",
                    "outboundTag": "direct"
                },
                {
                    "type": "field",
                    "port": "444-65535",
                    "outboundTag": "direct"
                },
                {
                    "type": "field",
                    "domain": [
                        "gc.kis.scr.kaspersky-labs.com"
                    ],
                    "outboundTag": "direct"
                },
                {
                    "type": "chinasites",
                    "outboundTag": "direct"
                },
                {
                    "type": "field",
                    "ip": [
                        "0.0.0.0/8",
                        "10.0.0.0/8",
                        "100.64.0.0/10",
                        "127.0.0.0/8",
                        "169.254.0.0/16",
                        "172.16.0.0/12",
                        "192.0.0.0/24",
                        "192.0.2.0/24",
                        "192.168.0.0/16",
                        "198.18.0.0/15",
                        "198.51.100.0/24",
                        "203.0.113.0/24",
                        "::1/128",
                        "fc00::/7",
                        "fe80::/10"
                    ],
                    "outboundTag": "direct"
                },
                {
                    "type": "chinaip",
                    "outboundTag": "direct"
                }
            ]
        }
    }
}
```



### 启动v2ray

```

# 开机启动
systemctl enable v2ray 

# 启动

systemctl start v2ray.service

停止:

systemctl stop v2ray.service

```

### 客户端下载

ShadowsocksX-NG.1.9.4.zip

https://github-releases.githubusercontent.com/60844036/38762500-0a36-11ea-9005-6dbb85ecde70?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20210515%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210515T055457Z&X-Amz-Expires=300&X-Amz-Signature=45429c9490b30476789831764de0af097513ab4808d42f352aca8d0e060affba&X-Amz-SignedHeaders=host&actor_id=4687708&key_id=0&repo_id=60844036&response-content-disposition=attachment%3B%20filename%3DShadowsocksX-NG.1.9.4.zip&response-content-type=application%2Foctet-stream

参考:https://www.v2ray.com/en/awesome/tools.html

#### mac端V2rayU

```
https://github.com/yanue/V2rayU/releases
```

#### ios:

在app store搜索,注意要是国外的apple ID

```
i2Ray
```



