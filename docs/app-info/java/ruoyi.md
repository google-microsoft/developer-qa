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

## 4.字段日期格式化

```shell
 import com.fasterxml.jackson.annotation.JsonFormat;


@JsonFormat(pattern = "yyyy-MM-dd")
private Date endTime;


带时分秒的:

@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
private Date operTime;

```

## 5.自定义dto转化器,如,把数组转成String

```java 
    @Excel(name = "发布对象")
    @JsonSerialize(using = ArrayToStringJsonSerializer.class)
    @JsonDeserialize(using = StringJsonDeserializer.class)
    private String identity;

```

ArrayToStringJsonSerializer的内容:

```java 
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;

/**
 * ArrayToStringJsonSerializer
 *
 * 
 */
public class ArrayToStringJsonSerializer extends JsonSerializer<String> {

    @Override
    public void serialize(String value, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        String text = (value==null ? null:String.valueOf(value));
        if (text!=null) {
            jsonGenerator.writeString(text);
        }
    }
}
```

StringJsonDeserializer的内容:

```java 
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;

/**
 * StringJsonDeserializer
 */
public class StringJsonDeserializer extends JsonDeserializer<String> {

    @Override
    public String deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        return jsonParser.getText();
    }
}
```

## 6.常见mybatis实体html

```html

<if test='createTime != null '> and CREATE_TIME &gt;= #{createTime}</if>
<if test='updateTime != null '> and CREATE_TIME &lt;= #{updateTime}</if>


<:的实体标签:
  &lt;
>:的实体标签:
  &gt;

  <>的实体标签:
  &lt;&gt;

```

## 7. import导入的实现

### (1) java 实现

```typescript jsx 

    @Log(title = "导入数据", businessType = BusinessType.IMPORT)
    @PreAuthorize("@ss.hasPermi('chessandcardchallenge:dataimport:import')")
    @PostMapping("/importData")
    public AjaxResult importData(MultipartFile file, boolean updateSupport) throws Exception {
        ExcelUtil<MacauChesscardchallengeDataimport> util = new ExcelUtil<>(MacauChesscardchallengeDataimport.class);
        List<MacauChesscardchallengeDataimport> userList = util.importExcel(file.getInputStream());
        LoginUser loginUser = tokenService.getLoginUser(ServletUtils.getRequest());
        String operName = loginUser.getUsername();
        String message = macauChesscardchallengeDataimportService.importUser(userList, updateSupport, operName);
        return AjaxResult.success(message);
    }
    
    @GetMapping("/importTemplate")
    public AjaxResult importTemplate() {
        ExcelUtil<MacauChesscardchallengeDataimport> util = new ExcelUtil<>(MacauChesscardchallengeDataimport.class);
        return util.importTemplateExcel("导入数据");
    }

```

### (2) vue实现

```html

<template>
  <!-- 用户导入对话框 -->
  <el-dialog :title='upload.title' :visible.sync='upload.open' width='400px' append-to-body>
    <el-upload
      ref='upload'
      :limit='1'
      accept='.xlsx, .xls'
      :headers='upload.headers'
      :action="upload.url + '?updateSupport=' + upload.updateSupport"
      :disabled='upload.isUploading'
      :on-progress='handleFileUploadProgress'
      :on-success='handleFileSuccess'
      :auto-upload='false'
      drag
    >
      <i class='el-icon-upload'></i>
      <div class='el-upload__text'>
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class='el-upload__tip' slot='tip'>
        <el-checkbox v-model='upload.updateSupport' />
        是否更新已经存在的用户数据
        <el-link type='info' style='font-size:12px' @click='importTemplate'>下载模板</el-link>
      </div>
      <div class='el-upload__tip' style='color:red' slot='tip'>提示：仅允许导入“xls”或“xlsx”格式文件！</div>
    </el-upload>
    <div slot='footer' class='dialog-footer'>
      <el-button type='primary' @click='submitFileForm'>确 定</el-button>
      <el-button @click='upload.open = false'>取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {getToken} from "@/utils/auth";
// 下载用户导入模板
function importTemplate() {
  return request({
    url: '/chessandcardchallenge/dataimport/importTemplate',
    method: 'get'
  })
}

export default {
  name: "Dataimport",
  components: {},
  data() {
    return {
      upload: {
        // 是否显示弹出层（数据导入）
        open: false,
        // 弹出层标题（数据导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的数据数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: {Authorization: "Bearer " + getToken()},
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/chessandcardchallenge/dataimport/importData"
      },
    };
  },
  methods: {
    /** 下载模板操作 */
    importTemplate() {
      importTemplate().then(response => {
        this.download(response.msg);
      });
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "数据导入";
      this.upload.open = true;
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(response.msg, "导入结果", {dangerouslyUseHTMLString: true});
      this.getList();
    },
  }
};
</script>

```

## 8.ruoyi多数据源

[参考:]: http://doc.ruoyi.vip/ruoyi/document/htsc.html#%E5%A4%9A%E6%95%B0%E6%8D%AE%E6%BA%90

在实际开发中，经常可能遇到在一个应用中可能需要访问多个数据库的情况
在需要切换数据源`Service`或`Mapper`方法上添加`@DataSource`注解
`@DataSource(value = DataSourceType.MASTER)`，其中`value`用来表示数据源名称

提示

关于多数据源使用流程（如果有多个，可以参考slave添加）

支持参数如下：

| 参数  | 类型           | 默认值                | 描述 |
| ----- | -------------- | --------------------- | ---- |
| value | DataSourceType | DataSourceType.MASTER | 主库 |

1、在`application-druid.yml`配置从库数据源

```yaml
# 从库数据源
slave:
	# 从数据源开关/默认关闭
	enabled: true
	url: jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=true&serverTimezone=GMT%2B8
	username: root
	password: password
```

2、在`DataSourceType`类添加数据源枚举

```javascript
/**
 * 从库
 */
SLAVE
```



3、在`DruidConfig`配置读取数据源

```javascript
@Bean
@ConfigurationProperties("spring.datasource.druid.slave")
@ConditionalOnProperty(prefix = "spring.datasource.druid.slave", name = "enabled", havingValue = "true")
public DataSource slaveDataSource(DruidProperties druidProperties)
{
	DruidDataSource dataSource = DruidDataSourceBuilder.create().build();
	return druidProperties.dataSource(dataSource);
}
```



4、在`DruidConfig`类`dataSource`方法添加数据源

```javascript
setDataSource(targetDataSources, DataSourceType.SLAVE.name(), "slaveDataSource");
```

5、在需要使用多数据源方法或类上添加`@DataSource`注解，其中`value`用来表示数据源



```javascript
@DataSource(value = DataSourceType.SLAVE)
public List<SysUser> selectUserList(SysUser user)
{
	return userMapper.selectUserList(user);
}
```





```javascript
@Service
@DataSource(value = DataSourceType.SLAVE)
public class SysUserServiceImpl
```



对于特殊情况可以通过`DynamicDataSourceContextHolder`手动实现数据源切换

```javascript
public List<SysUser> selectUserList(SysUser user)
{
	DynamicDataSourceContextHolder.setDataSourceType(DataSourceType.SLAVE.name());
	List<SysUser> userList = userMapper.selectUserList(user);
	DynamicDataSourceContextHolder.clearDataSourceType();
	return userList;
}
```



逻辑实现代码 `com.ruoyi.framework.aspectj.DataSourceAspect`

```javascript
注意：目前配置了一个从库，默认关闭状态。如果不需要多数据源不用做任何配置。 另外可新增多个从库。支持不同数据源（Mysql、Oracle、SQLServer）
```

提示

如果有Service方法内多个注解无效的情况使用内部方法调用
SpringUtils.getAopProxy(this).xxxxxx(xxxx);