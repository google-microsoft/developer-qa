---
id: git
title: git常见问题
sidebar_label: git常见问题
slug: /app-info/git
---

### **1.**为特定的**respo**指定**ssh-key:**

```
git config core.sshCommand "ssh -i ~/.ssh/oswaldgong1988 -F /dev/null"

git config core.sshCommand "ssh -i ~/.ssh/frontremoto111 -F /dev/null"
```



### **2.**为**ls**格式输出**:**

```
array=($(ls))

printf "%s\n格式分隔输入” "${array[@]}"
```



3.设置当前项目git用户名

 

```
git config user.name "os"
```

### 3.安装gitlab compose

配置一个环境变量$GITLAB_HOME

```
$GITLAB_HOME
```

```
$GITLAB_HOME
```



```
version: "3.9"
services:
  gitlab_2:
    container_name: gitlab_2
    image: 'gitlab/gitlab-ee:latest'
    restart: always
    hostname: 'gitlab_2'
    environment:
      GITLAB_OMNIBUS_CONFIG: |
        #http
        external_url 'http://jp.liuzhen.vip/gitlab/'

        # Fill in the connection details for database.yml
        gitlab_rails['db_adapter'] = "postgresql"
        gitlab_rails['db_encoding'] = "utf8"
        gitlab_rails['db_host'] = "$GITLAB_POSTGRES_HOST"
        gitlab_rails['db_port'] = 15432
        gitlab_rails['db_database'] = "postgres"
        gitlab_rails['db_username'] = "postgres"
        gitlab_rails['db_password'] = "fp5rQzMf"

        #Disable the built-in Postgres
        postgresql['enable'] = false
        #postgresql ['ssl'] = "off"

        #Disable the built-in redis
        redis['enable'] = false
        gitlab_rails['redis_host'] = "$GITLAB_REDIS_HOST"
        gitlab_rails['redis_port'] = 16379

    ports:
      - '30020:80'
      - '30021:443'
      - '30022:22'
    volumes:
      - '$GITLAB_HOME/config:/etc/gitlab'
      - '$GITLAB_HOME/logs:/var/log/gitlab'
      - '$GITLAB_HOME/data:/var/opt/gitlab'
```

