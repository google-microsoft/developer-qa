---

id: java

title: java常见运维问题

sidebar_label: java常见运维问题

slug: /app-info/java

---

### 1.查找jar的进程并杀掉进度shell

```
p=`jcmd | grep test-admin.jar | cut -d " " -f 1`

kill -9 $p
```

### 2.打包targ.gz压缩和解压命令

```
压缩
tar -zcvf develop-project.tar.gz dist

解压
tar -zxvf develop-project.tar.gz

```

### 3.修改springboot启动端口

```
idea运行配置上,VM options上加-Dserver.port=8006
```

### 4.经验部署java的脚本

如:

```markdown

ssh -p 16070 root@localhost <<eeooff

sh /home/work/server/server.sh

eeooff

```

server.sh 内容:

```shell

project=test-admin

cd /home/work/project/server

git pull

mvn clean package

PID=$(cat /home/work/server/pid)

kill -9 $PID

cd /home/work/project/server/test-admin/target/

java -jar -Dfile.encoding=UTF-8 $project.jar > /home/work/server/log 2>&1 &

echo $! > /home/work/server/pid


```

## 5. java打印并输出文件
记得加绝对路径比较好.因为有时不知道它相对什么路径打印了

```java

try {
	System.setOut(new PrintStream("/Users/richard/WebstormProjects/develop-QA/tmp.md"));
	System.out.println(sql);
} catch (FileNotFoundException e) {
	e.printStackTrace();
}

// append模式 
System.setOut(new PrintStream(new FileOutputStream("Users/richard/WebstormProjects/develop-QA/tmp.md", true)));

```
