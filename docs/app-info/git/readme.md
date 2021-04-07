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


