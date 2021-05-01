---
id: ruoyi title: ruoyi常见运维问题 sidebar_label: ruoyi常见运维问题 slug: /app-info/ruoyi
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

## 2.ruoyi-vue自定义密码匹配器

### (1).第一步:重写SecurityUtils.encryptPassword,SecurityUtils.matchesPassword这两个方法

如:

```java
 /**
     * 生成BCryptPasswordEncoder密码
     *
     * @param password 密码
     * @return 加密字符串
     */
    public static String encryptPassword(String password)
    {
        return PHPpassword.PHPpasswordHash(password);
    }

    /**
     * 判断密码是否相同
     *
     * @param rawPassword 真实密码
     * @param encodedPassword 加密后字符
     * @return 结果
     */
    public static boolean matchesPassword(String rawPassword, String encodedPassword)
    {
        return PHPpassword.PHPpasswordVerify(rawPassword,encodedPassword);
    }

```

PHPpassword.java内容:

xml依赖:

```xml
<!--用于PHP密码兼容PHPpasswordHash和PHPpasswordVerify方法-->
<dependency>
    <groupId>at.favre.lib</groupId>
    <artifactId>bcrypt</artifactId>
    <version>0.9.0</version>
</dependency>
```

```java
package com.ruoyi.common.utils;

import at.favre.lib.crypto.bcrypt.BCrypt;

public class PHPpassword {
    public static void main(String[] args) {
        String password = "admin123";
        String hash = PHPpasswordHash(password);
        System.out.println(hash);
        boolean b = PHPpasswordVerify(password, hash);
        boolean b2 = PHPpasswordVerify(password, "$2a$13$jIFK.m0PK3xWEqAGoHi5keRblfKO./A2AU/YTOt5Q.VrQIhTKqhde");
        System.out.println(b);
        System.out.println(b2);
    }

    /**
     * java版本的passwordHash
     *
     * @param password
     * @return
     */
    public static String PHPpasswordHash(String password) {
        return BCrypt.withDefaults().hashToString(13, password.toCharArray());
    }

    /**
     * 验证passsword
     *
     * @param password
     * @param hashphpassword
     * @return
     */
    public static boolean PHPpasswordVerify(String password, String hashphpassword) {
        BCrypt.Result res = BCrypt.verifyer().verify(password.toCharArray(), hashphpassword);
        return res.verified;
    }
}

```

### (2).第二步:在SecurityConfig类里配置自己的密码匹配器

```java
  @Bean
    public AuthenticationProvider authenticationProvider() {
        AuthenticationProvider authenticationProvider = new MyAuthenticationProvider();
        return authenticationProvider;
    }
```

MyAuthenticationProvider类的内容:

```java
package com.ruoyi.framework.security.service;

import com.ruoyi.common.exception.user.UserPasswordNotMatchException;
import com.ruoyi.common.utils.PHPpassword;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import java.util.Collection;

@Component
public class MyAuthenticationProvider implements AuthenticationProvider {

    @Qualifier("userDetailsServiceImpl")
    @Autowired
    private UserDetailsService userService;

    /**
     * 自定义验证方式
     */
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = (String) authentication.getCredentials();
        UserDetails user = userService.loadUserByUsername(username);
        if (!PHPpassword.PHPpasswordVerify(password,user.getPassword())) {
            throw new UserPasswordNotMatchException();
        }

        Collection<? extends GrantedAuthority> authorities = user.getAuthorities();
        return new UsernamePasswordAuthenticationToken(user, password, authorities);
    }

    @Override
    public boolean supports(Class<?> arg0) {
        return true;
    }
}

```

## 3.在ruoyi-vue加谷歌验证码

## 4.ruoyi-vue前端问题

### 1. ruoyi-vue实现图片预览和点击这么放大

```html
把这里imgUrl改成自己的字段即可

<el-table-column label='图片url' align='center'>
  <template slot-scope='scope'>
    <el-image
      style='width: 80px; height: 80px'
      :src='scope.row.imgUrl'
      :preview-src-list='[scope.row.imgUrl]'
    ></el-image>
  </template>
</el-table-column>
```

### 2. 实现树形选择

(1) 写入html

```html

<el-form-item label='父级ID' prop='parentId'>
  <treeselect v-model='form.parentId' :options='configurationmanagement_navigationOptions'
              :normalizer='normalizer' placeholder='请选择父级ID'
  />
</el-form-item>


```

(2). 导入包

```javascript
import Treeselect from '@riophae/vue-treeselect'

export default {
  name: 'Configurationmanagement_navigation',
  components: {
    Treeselect
  },
}
```
(3). 添加字段configurationmanagement_navigationOptions,注意,自行动态改变configurationmanagement_navigationOptions数据

```javascript
import Treeselect from '@riophae/vue-treeselect'

export default {
  name: 'Configurationmanagement_navigation',
  components: {
    Treeselect
  },
  data() {
    return {
      // 导航配置树选项
      configurationmanagement_navigationOptions: [],
    }
  },
}
```
