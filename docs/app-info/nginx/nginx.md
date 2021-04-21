---
id: nginx
title: nginx常见问题
sidebar_label: nginx常见问题
slug: /app-info/nginx
---


## 1. 安装nginx

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

## 2. centos7下配置nginx

配置文件一般在:/etc/nginx/nginx.conf

内容如:

```shell

# For more information on configuration, see:
#   * Official English Documentation: http://nginx.org/en/docs/
#   * Official Russian Documentation: http://nginx.org/ru/docs/

user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 2048;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    # Load modular configuration files from the /etc/nginx/conf.d directory.
    # See http://nginx.org/en/docs/ngx_core_module.html#include
    # for more information.
    include /etc/nginx/conf.d/*.conf;

   server {
           listen       80;
           server_name  localhost;

   		location / {
               root /home/app/test/ruoyi-ui/dist;
   			try_files $uri $uri/ /index.html;
               index  index.html index.htm;
           }

   		location /prod-api/{
   			proxy_set_header Host $http_host;
   			proxy_set_header X-Real-IP $remote_addr;
   			proxy_set_header REMOTE-HOST $remote_addr;
   			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
   			proxy_pass http://localhost:8007/;
   		}

           error_page   500 502 503 504  /50x.html;
           location = /50x.html {
               root   html;
           }
   }
   server {
           listen       1024;
           server_name  localhost;

        location / {
               root /home/app/preferential-activities-frontend/questionnaire;
            try_files $uri $uri/ /index.html;
               index  index.html index.htm;
           }

        location /prod-api/{
            proxy_set_header Host $http_host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header REMOTE-HOST $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass http://localhost:8007/;
        }

           error_page   500 502 503 504  /50x.html;
           location = /50x.html {
               root   html;
           }
   }
# Settings for a TLS enabled server.
#
#    server {
#        listen       443 ssl http2 default_server;
#        listen       [::]:443 ssl http2 default_server;
#        server_name  _;
#        root         /usr/share/nginx/html;
#
#        ssl_certificate "/etc/pki/nginx/server.crt";
#        ssl_certificate_key "/etc/pki/nginx/private/server.key";
#        ssl_session_cache shared:SSL:1m;
#        ssl_session_timeout  10m;
#        ssl_ciphers HIGH:!aNULL:!MD5;
#        ssl_prefer_server_ciphers on;
#
#        # Load configuration files for the default server block.
#        include /etc/nginx/default.d/*.conf;
#
#        location / {
#        }
#
#        error_page 404 /404.html;
#        location = /404.html {
#        }
#
#        error_page 500 502 503 504 /50x.html;
#        location = /50x.html {
#        }
#    }

}

```
