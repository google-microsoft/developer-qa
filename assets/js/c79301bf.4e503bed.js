(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{91:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return s})),t.d(n,"metadata",(function(){return c})),t.d(n,"toc",(function(){return o})),t.d(n,"default",(function(){return b}));var r=t(3),a=t(7),l=(t(0),t(97)),s={id:"centos",title:"Centos\u5e38\u89c1\u95ee\u9898",sidebar_label:"Centos\u5e38\u89c1\u95ee\u9898",slug:"/os-info/centos"},c={unversionedId:"os-info/centos/centos",id:"os-info/centos/centos",isDocsHomePage:!1,title:"Centos\u5e38\u89c1\u95ee\u9898",description:"1.\u67e5\u770b\u7248\u672c",source:"@site/docs/os-info/centos/readme.md",sourceDirName:"os-info/centos",slug:"/os-info/centos",permalink:"/developer-QA/docs/os-info/centos",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/os-info/centos/readme.md",version:"current",lastUpdatedAt:1621171870,formattedLastUpdatedAt:"5/16/2021",sidebar_label:"Centos\u5e38\u89c1\u95ee\u9898",frontMatter:{id:"centos",title:"Centos\u5e38\u89c1\u95ee\u9898",sidebar_label:"Centos\u5e38\u89c1\u95ee\u9898",slug:"/os-info/centos"},sidebar:"docs",next:{title:"ubuntu\u5e38\u89c1\u95ee\u9898",permalink:"/developer-QA/docs/os-info/ubuntu"}},o=[{value:"1.\u67e5\u770b\u7248\u672c",id:"1\u67e5\u770b\u7248\u672c",children:[]},{value:"2.\u9632\u706b\u5899",id:"2\u9632\u706b\u5899",children:[{value:"(1). \u5f00\u542f\u548c\u5173\u95ed",id:"1-\u5f00\u542f\u548c\u5173\u95ed",children:[]},{value:"(2). linux\u7684ip\u52a0\u767d\u547d\u4ee4:",id:"2-linux\u7684ip\u52a0\u767d\u547d\u4ee4",children:[]},{value:"(3) \u6253\u5f00,\u5173\u95ed\u7aef\u53e3",id:"3-\u6253\u5f00\u5173\u95ed\u7aef\u53e3",children:[]}]},{value:"4.\u5b89\u88c5redis",id:"4\u5b89\u88c5redis",children:[{value:"(1).redis\u6253\u5f006379\u7aef\u53e3",id:"1redis\u6253\u5f006379\u7aef\u53e3",children:[]},{value:"(2).Redis\u542f\u52a8\u591a\u7aef\u53e3\u3001\u8fd0\u884c\u591a\u5b9e\u4f8b",id:"2redis\u542f\u52a8\u591a\u7aef\u53e3\u3001\u8fd0\u884c\u591a\u5b9e\u4f8b",children:[]}]},{value:"5. \u81ea\u52a8\u8f93\u5165\u5bc6\u7801:",id:"5-\u81ea\u52a8\u8f93\u5165\u5bc6\u7801",children:[]},{value:"6.v2ray\u5b89\u88c5",id:"6v2ray\u5b89\u88c5",children:[{value:"\u5b89\u88c5",id:"\u5b89\u88c5",children:[]},{value:"\u670d\u52a1\u914d\u7f6e\u6587\u4ef6:",id:"\u670d\u52a1\u914d\u7f6e\u6587\u4ef6",children:[]},{value:"\u5ba2\u6237\u5546\u7528\u914d\u7f6e\u6587\u4ef6:",id:"\u5ba2\u6237\u5546\u7528\u914d\u7f6e\u6587\u4ef6",children:[]},{value:"\u542f\u52a8v2ray",id:"\u542f\u52a8v2ray",children:[]},{value:"\u5ba2\u6237\u7aef\u4e0b\u8f7d",id:"\u5ba2\u6237\u7aef\u4e0b\u8f7d",children:[]}]}],i={toc:o};function b(e){var n=e.components,t=Object(a.a)(e,["components"]);return Object(l.b)("wrapper",Object(r.a)({},i,t,{components:n,mdxType:"MDXLayout"}),Object(l.b)("h2",{id:"1\u67e5\u770b\u7248\u672c"},"1.\u67e5\u770b\u7248\u672c"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre"},"cat /etc/centos-release\n\n")),Object(l.b)("h2",{id:"2\u9632\u706b\u5899"},"2.\u9632\u706b\u5899"),Object(l.b)("h3",{id:"1-\u5f00\u542f\u548c\u5173\u95ed"},"(1). \u5f00\u542f\u548c\u5173\u95ed"),Object(l.b)("p",null,"\u901a\u8fc7"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre"},"systemctl status firewalld\n\n")),Object(l.b)("p",null,"\u67e5\u770bfirewalld\u72b6\u6001\uff0c\u53d1\u73b0\u5f53\u524d\u662fdead\u72b6\u6001\uff0c\u5373\u9632\u706b\u5899\u672a\u5f00\u542f\u3002"),Object(l.b)("p",null,"\u901a\u8fc7"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre"},"systemctl start firewalld\n")),Object(l.b)("p",null,"\u5f00\u542f\u9632\u706b\u5899\uff0c\u6ca1\u6709\u4efb\u4f55\u63d0\u793a\u5373\u5f00\u542f\u6210\u529f\u3002"),Object(l.b)("p",null,"\u5173\u95ed\u9632\u706b\u5899:"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre"},"systemctl stop firewalld\n")),Object(l.b)("h3",{id:"2-linux\u7684ip\u52a0\u767d\u547d\u4ee4"},"(2). linux\u7684ip\u52a0\u767d\u547d\u4ee4:"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-shell"},"\nfirewall-cmd  --zone=trusted --add-source=185.888.8.8\nfirewall-cmd  --zone=trusted --add-source=185.888.8.8  --permanent\n\n")),Object(l.b)("h3",{id:"3-\u6253\u5f00\u5173\u95ed\u7aef\u53e3"},"(3) \u6253\u5f00,\u5173\u95ed\u7aef\u53e3"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre"},"firewall-cmd --zone=public --add-port=3306/tcp --permanent\n\nfirewall-cmd --reload\n\nfirewall-cmd --remove-port=3306/tcp --permanent\n\nfirewall-cmd --reload\n\n")),Object(l.b)("h2",{id:"4\u5b89\u88c5redis"},"4.\u5b89\u88c5redis"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre"},"wget https://download.redis.io/releases/redis-6.2.1.tar.gz\ntar xzf redis-6.2.1.tar.gz\ncd redis-6.2.1\nmake\nmake install\n\nredis-server &\n\n")),Object(l.b)("p",null,"\u5982\u9047\u5230\u62a5\u9519\u4e00\u822c\u662fgcc\u592a\u65e7,\u66f4\u65b0\u4e00\u4e0b"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre"},"yum install gcc-c++ yum install gcc \n")),Object(l.b)("p",null,"\u7136\u540e\u91cd\u65b0\u89e3\u538b,\u91cd\u65b0make"),Object(l.b)("h3",{id:"1redis\u6253\u5f006379\u7aef\u53e3"},"(1).redis\u6253\u5f006379\u7aef\u53e3"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre"},"firewall-cmd --zone=public --add-port=6379/tcp --permanent\n\nfirewall-cmd --reload\n\n")),Object(l.b)("h3",{id:"2redis\u542f\u52a8\u591a\u7aef\u53e3\u3001\u8fd0\u884c\u591a\u5b9e\u4f8b"},"(2).Redis\u542f\u52a8\u591a\u7aef\u53e3\u3001\u8fd0\u884c\u591a\u5b9e\u4f8b"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre"},"redis-server --port 6380 & \n")),Object(l.b)("p",null,"\u9700\u8981\u542f\u52a8\u591a\u4e2aRedis\u5b9e\u4f8b\uff1a\n\u4e00\u53f0Redis\u670d\u52a1\u5668\uff0c\u5206\u6210\u591a\u4e2a\u8282\u70b9\uff0c\u6bcf\u4e2a\u8282\u70b9\u5206\u914d\u4e00\u4e2a\u7aef\u53e3\uff086380\uff0c6381\u2026\uff09\uff0c\u9ed8\u8ba4\u7aef\u53e3\u662f6379\u3002\n\u6bcf\u4e2a\u8282\u70b9\u5bf9\u5e94\u4e00\u4e2aRedis\u914d\u7f6e\u6587\u4ef6\uff0c\u5982\uff1a redis6380.conf\u3001redis6381.conf"),Object(l.b)("h4",{id:"cp-redisconfredis6380conf"},"cp redis.confredis6380.conf"),Object(l.b)("h4",{id:"vi-redis6380conf"},"vi redis6380.conf"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-shell"},"\npidfile : pidfile/var/run/redis/redis_6380.pid\n\nport 6380\n\nlogfile : logfile/var/log/redis/redis_6380.log\n\nrdbfile : dbfilenamedump_6380.rdb\n\n")),Object(l.b)("h2",{id:"5-\u81ea\u52a8\u8f93\u5165\u5bc6\u7801"},"5. \u81ea\u52a8\u8f93\u5165\u5bc6\u7801:"),Object(l.b)("p",null," \u5728\u8fd9\u4e4b\u524d\u8981\u6709expect \u5982\u679c\u6ca1\u6709\u8bf7\u5982\u4e0b\u5b89\u88c5expect"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-shell"},"yum -y install expect\n")),Object(l.b)("p",null,"\u7136\u540e"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-shell"},'#!/usr/bin/expect\nspawn ./exportdb.sh\nexpect "Enter password:"\nsend "password\\n"\n\n\u6216\u8005\n\n#!/usr/bin/expect\nspawn ./importdb.sh\nexpect "Enter password:"\nsend "password\\n"\n\n')),Object(l.b)("p",null,'\u8fd9\u91cc\u91cd\u70b9\u547d\u4ee4\u662f:spawn,expect,send,\u8fd9\u91cc\u7684"interact"\u53ef\u4ee5\u4e0d\u8981\n\u6ce8\u610f:\n\u8fd9\u91cc\u7684'),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-shell"},"./exportdb.sh\n./importdb.sh\n")),Object(l.b)("p",null,"\u8fd9\u91cc\u662f\u5fc5\u9700\u5206\u5f00\u5199\u7684,\u4e0d\u7136,\u81ea\u52a8\u8f93\u5165\u5bc6\u7801\u4f1a\u65e0\u6548"),Object(l.b)("p",null,"1.\u5165\u53e3\u6587\u4ef6\u8981\u52a0\u5934:"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-shell"},"#!/usr/bin/expect\n")),Object(l.b)("p",null,"2.exportdb.sh\u6587\u4ef6\u5185\u5bb9"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-shell"},"#!/usr/bin/env bash\nmysqldump -u root -p ry-vue > sql/all.sql\n\n")),Object(l.b)("p",null,"3.importdb.sh\u6587\u4ef6\u5185\u5bb9"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-shell"},"#!/usr/bin/env bash\nmysql -u root -p  ry-vue < sql/all.sql\n\n")),Object(l.b)("h2",{id:"6v2ray\u5b89\u88c5"},"6.v2ray\u5b89\u88c5"),Object(l.b)("p",null,"\u53c2\u8003: ",Object(l.b)("a",{parentName:"p",href:"https://github.com/v2fly/fhs-install-v2ray"},"https://github.com/v2fly/fhs-install-v2ray")),Object(l.b)("h3",{id:"\u5b89\u88c5"},"\u5b89\u88c5"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-shell"},"bash <(curl -L https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-release.sh)\n")),Object(l.b)("p",null,"// \u53ea\u66f4\u65b0 .dat \u8cc7\u6599\u6a94"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-shell"},"\n bash <(curl -L https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-dat-release.sh)\n \n")),Object(l.b)("p",null,"\u79fb\u9664 V2Ray"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-shell"},"\nbash <(curl -L https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-release.sh) --remove\n\n")),Object(l.b)("p",null,"\u7ed3\u679c\u5982\u4e0b:"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-shell"},"# /etc/systemd/system/v2ray.service\n[Unit]\nDescription=V2Ray Service\nDocumentation=https://www.v2fly.org/\nAfter=network.target nss-lookup.target\n\n[Service]\nUser=nobody\nCapabilityBoundingSet=CAP_NET_ADMIN CAP_NET_BIND_SERVICE\nAmbientCapabilities=CAP_NET_ADMIN CAP_NET_BIND_SERVICE\nNoNewPrivileges=true\nExecStart=/usr/local/bin/v2ray -config /usr/local/etc/v2ray/config.json\nRestart=on-failure\nRestartPreventExitStatus=23\n\n[Install]\nWantedBy=multi-user.target\n\n# /etc/systemd/system/v2ray.service.d/10-donot_touch_single_conf.conf\n# In case you have a good reason to do so, duplicate this file in the same directory and make your customizes there.\n# Or all changes you made will be lost!  # Refer: https://www.freedesktop.org/software/systemd/man/systemd.unit.html\n[Service]\nExecStart=\nExecStart=/usr/local/bin/v2ray -config /usr/local/etc/v2ray/config.json\n\ninstalled: /usr/local/bin/v2ray\ninstalled: /usr/local/bin/v2ctl\ninstalled: /usr/local/share/v2ray/geoip.dat\ninstalled: /usr/local/share/v2ray/geosite.dat\ninstalled: /usr/local/etc/v2ray/config.json\ninstalled: /var/log/v2ray/\ninstalled: /var/log/v2ray/access.log\ninstalled: /var/log/v2ray/error.log\ninstalled: /etc/systemd/system/v2ray.service\ninstalled: /etc/systemd/system/v2ray@.service\nremoved: /tmp/tmp.wFWVhIKA3O\ninfo: V2Ray v4.37.3 is installed.\nYou may need to execute a command to remove dependent software: apt purge curl unzip\nPlease execute the command: systemctl enable v2ray; systemctl start v2ray\n  \n\n")),Object(l.b)("p",null,"\u5728/usr/local/etc/v2ray/config.json\u91cc\u914d\u7f6e\u5185\u5bb9:"),Object(l.b)("h3",{id:"\u670d\u52a1\u914d\u7f6e\u6587\u4ef6"},"\u670d\u52a1\u914d\u7f6e\u6587\u4ef6:"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre"},'{\n    "log": {\n        "access": "/var/log/v2ray/access.log",\n        "error": "/var/log/v2ray/error.log",\n        "loglevel": "warning"\n    },\n    "inbound": {\n        "port": 36170,\n        "protocol": "vmess",\n        "settings": {\n            "clients": [\n                {\n                    "id": "a6195a7f-6f50-a98a-6d9a-72f4be66fdbd",\n                    "level": 1,\n                    "alterId": 100\n                }\n            ]\n        },\n        "streamSettings": {\n            "network": "kcp"\n        }\n    },\n    "outbound": {\n        "protocol": "freedom",\n        "settings": {}\n    },\n    "inboundDetour": [],\n    "outboundDetour": [\n        {\n            "protocol": "blackhole",\n            "settings": {},\n            "tag": "blocked"\n        }\n    ],\n    "routing": {\n        "strategy": "rules",\n        "settings": {\n            "rules": [\n                {\n                    "type": "field",\n                    "ip": [\n                        "0.0.0.0/8",\n                        "10.0.0.0/8",\n                        "100.64.0.0/10",\n                        "127.0.0.0/8",\n                        "169.254.0.0/16",\n                        "172.16.0.0/12",\n                        "192.0.0.0/24",\n                        "192.0.2.0/24",\n                        "192.168.0.0/16",\n                        "198.18.0.0/15",\n                        "198.51.100.0/24",\n                        "203.0.113.0/24",\n                        "::1/128",\n                        "fc00::/7",\n                        "fe80::/10"\n                    ],\n                    "outboundTag": "blocked"\n                }\n            ]\n        }\n    }\n}\n')),Object(l.b)("h3",{id:"\u5ba2\u6237\u5546\u7528\u914d\u7f6e\u6587\u4ef6"},"\u5ba2\u6237\u5546\u7528\u914d\u7f6e\u6587\u4ef6:"),Object(l.b)("p",null,"\u53c2\u8003:",Object(l.b)("a",{parentName:"p",href:"https://intmainreturn0.com/v2ray-config-gen/#"},"https://intmainreturn0.com/v2ray-config-gen/#")),Object(l.b)("p",null,'\u8bb0\u5f97\u628a"address": "localhost",\u6539\u6210\u8fdc\u7a0b\u7684\u670d\u52a1\u5668\u7684\u5730\u5740'),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre"},'{\n    "log": {\n        "loglevel": "warning"\n    },\n    "inbound": {\n        "listen": "127.0.0.1",\n        "port": 36170,\n        "protocol": "socks",\n        "settings": {\n            "auth": "noauth",\n            "udp": true,\n            "ip": "127.0.0.1"\n        }\n    },\n    "outbound": {\n        "protocol": "vmess",\n        "settings": {\n            "vnext": [\n                {\n                    "address": "localhost",\n                    "port": 36170,\n                    "users": [\n                        {\n                            "id": "a6195a7f-6f50-a98a-6d9a-72f4be66fdbd",\n                            "level": 1,\n                            "alterId": 100\n                        }\n                    ]\n                }\n            ]\n        },\n        "streamSettings": {\n            "network": "kcp"\n        }\n    },\n    "outboundDetour": [\n        {\n            "protocol": "freedom",\n            "settings": {},\n            "tag": "direct"\n        }\n    ],\n    "routing": {\n        "strategy": "rules",\n        "settings": {\n            "rules": [\n                {\n                    "type": "field",\n                    "port": "54-79",\n                    "outboundTag": "direct"\n                },\n                {\n                    "type": "field",\n                    "port": "81-442",\n                    "outboundTag": "direct"\n                },\n                {\n                    "type": "field",\n                    "port": "444-65535",\n                    "outboundTag": "direct"\n                },\n                {\n                    "type": "field",\n                    "domain": [\n                        "gc.kis.scr.kaspersky-labs.com"\n                    ],\n                    "outboundTag": "direct"\n                },\n                {\n                    "type": "chinasites",\n                    "outboundTag": "direct"\n                },\n                {\n                    "type": "field",\n                    "ip": [\n                        "0.0.0.0/8",\n                        "10.0.0.0/8",\n                        "100.64.0.0/10",\n                        "127.0.0.0/8",\n                        "169.254.0.0/16",\n                        "172.16.0.0/12",\n                        "192.0.0.0/24",\n                        "192.0.2.0/24",\n                        "192.168.0.0/16",\n                        "198.18.0.0/15",\n                        "198.51.100.0/24",\n                        "203.0.113.0/24",\n                        "::1/128",\n                        "fc00::/7",\n                        "fe80::/10"\n                    ],\n                    "outboundTag": "direct"\n                },\n                {\n                    "type": "chinaip",\n                    "outboundTag": "direct"\n                }\n            ]\n        }\n    }\n}\n')),Object(l.b)("h3",{id:"\u542f\u52a8v2ray"},"\u542f\u52a8v2ray"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre"},"\n# \u5f00\u673a\u542f\u52a8\nsystemctl enable v2ray \n\n# \u542f\u52a8\n\nsystemctl start v2ray.service\n\n\u505c\u6b62:\n\nsystemctl stop v2ray.service\n\n")),Object(l.b)("h3",{id:"\u5ba2\u6237\u7aef\u4e0b\u8f7d"},"\u5ba2\u6237\u7aef\u4e0b\u8f7d"),Object(l.b)("p",null,Object(l.b)("a",{parentName:"p",href:"https://github.com/shadowsocks/ShadowsocksX-NG/tags"},"https://github.com/shadowsocks/ShadowsocksX-NG/tags")),Object(l.b)("p",null,"ShadowsocksX-NG.1.9.4.zip"),Object(l.b)("p",null,"\u53c2\u8003:",Object(l.b)("a",{parentName:"p",href:"https://www.v2ray.com/en/awesome/tools.html"},"https://www.v2ray.com/en/awesome/tools.html")),Object(l.b)("h4",{id:"mac\u7aefv2rayu"},"mac\u7aefV2rayU"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre"},"https://github.com/yanue/V2rayU/releases\n")),Object(l.b)("h4",{id:"ios"},"ios:"),Object(l.b)("p",null,"\u5728app store\u641c\u7d22,\u6ce8\u610f\u8981\u662f\u56fd\u5916\u7684apple ID"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre"},"i2Ray\n")))}b.isMDXComponent=!0},97:function(e,n,t){"use strict";t.d(n,"a",(function(){return d})),t.d(n,"b",(function(){return m}));var r=t(0),a=t.n(r);function l(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function s(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?s(Object(t),!0).forEach((function(n){l(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var i=a.a.createContext({}),b=function(e){var n=a.a.useContext(i),t=n;return e&&(t="function"==typeof e?e(n):c(c({},n),e)),t},d=function(e){var n=b(e.components);return a.a.createElement(i.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return a.a.createElement(a.a.Fragment,{},n)}},u=a.a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,i=o(e,["components","mdxType","originalType","parentName"]),d=b(t),u=r,m=d["".concat(s,".").concat(u)]||d[u]||p[u]||l;return t?a.a.createElement(m,c(c({ref:n},i),{},{components:t})):a.a.createElement(m,c({ref:n},i))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var l=t.length,s=new Array(l);s[0]=u;var c={};for(var o in n)hasOwnProperty.call(n,o)&&(c[o]=n[o]);c.originalType=e,c.mdxType="string"==typeof e?e:r,s[1]=c;for(var i=2;i<l;i++)s[i]=t[i];return a.a.createElement.apply(null,s)}return a.a.createElement.apply(null,t)}u.displayName="MDXCreateElement"}}]);