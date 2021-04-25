---
id: ruoyi
title: ruoyi常见运维问题
sidebar_label: ruoyi常见运维问题
slug: /app-info/ruoyi
---

## 1.升级jdk到15

### 1.Execution default of goal org.springframework.boot:spring-boot-maven-plugin:2.1.1.RELEASE:repackage failed: Unsupported class file major version 59 -> [Help 1]

```xml
<groupId>org.springframework.boot</groupId>
<artifactId>spring-boot-maven-plugin</artifactId>
<version>2.1.1.RELEASE</version>
<configuration>
    <fork>true</fork> <!-- 如果没有该配置，devtools不会生效 -->
</configuration>
```

这里加spring-boot-maven-plugin插件要加class入口:

```xml
<mainClass>com.ruoyi.RuoYiApplication</mainClass>
如:

<groupId>org.springframework.boot</groupId>
<artifactId>spring-boot-maven-plugin</artifactId>
<version>2.1.1.RELEASE</version>
<configuration>
  <fork>true</fork> <!-- 如果没有该配置，devtools不会生效 -->
  <mainClass>com.ruoyi.RuoYiApplication</mainClass>
</configuration>

```

### 2.ruoyi-framework 的模块下加以下依赖

```xml
<dependency>
    <groupId>javax.xml.bind</groupId>
    <artifactId>jaxb-api</artifactId>
    <version>2.3.0</version>
</dependency>
```

### 3.登录出现DatatypeConverter异常

[参考文档来源](http://doc.ruoyi.vip/ruoyi-cloud/other/faq.html#%E5%A6%82%E4%BD%95%E4%BF%AE%E6%94%B9%E8%B6%85%E7%BA%A7%E7%AE%A1%E7%90%86%E5%91%98%E7%99%BB%E5%BD%95%E5%AF%86%E7%A0%81)

错误提示：`Handler dispatch failed; nested exception is java.lang.NoClassDefFoundError: javax/xml/bind/DatatypeConverter`

由于`>= jdk9`中不再包含这个`jar`包，所以需要在`ruoyi-framework\pom.xml`手动添加依赖。

```xml
<dependency>
	<groupId>javax.xml.bind</groupId>
	<artifactId>jaxb-api</artifactId>
	<version>2.3.0</version>
</dependency>
```

