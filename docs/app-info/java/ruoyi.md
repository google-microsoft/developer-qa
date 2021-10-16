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
### (1).后端的添加

#### 一. application.yml 添加

```yaml
# token配置
token:
  # 是否启动google身份验证
  googleAuthenticator: true
```

#### 二. CaptchaController 添加
```java

    @Autowired
    private TokenService tokenService;
    
      /**
     * 生成验证码
     */
    @GetMapping("/isEnabledGoogleAuth")
    public AjaxResult isEnabledGoogleAuth()  {
        var ajax = AjaxResult.success();
        ajax.put("isGoogleAuthenticatorEnabled", tokenService.isGoogleAuthenticator());
        return ajax;
    }

```
#### 三. 创建几个新类

##### GoogleAuthCodeException

```java

package com.ruoyi.common.exception.user;

/**
 * GoogleAuthCodeException
 */
public class GoogleAuthCodeException extends UserException {
    public GoogleAuthCodeException() {
        super("user.google.not.match", null);
    }
}

```

##### GoogleAuthenticator

```java
package com.ruoyi.common.utils;

import org.apache.commons.codec.binary.Base32;
import org.apache.commons.codec.binary.Hex;

import java.security.SecureRandom;

/**
 * GoogleAuthenticator
 */
public class GoogleAuthenticator {
    /**
     * 必须:创建谷歌秘钥
     *
     * @return
     */
    public static String generateSecretKey() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[10];
        random.nextBytes(bytes);
        Base32 base32 = new Base32();
        return base32.encodeToString(bytes);
    }

    /**
     * 生成6位数密码跟前端匹配
     *
     * @param secretKey
     * @return
     */
    public static String getTOTPCode(String secretKey) {
        Base32 base32 = new Base32();
        byte[] bytes = base32.decode(secretKey);
        String hexKey = Hex.encodeHexString(bytes);
        return TOTP.getOTP(hexKey);
    }

    /**
     * 生成6位数密码跟前端匹配
     * @param date
     * @param secretKey
     * @return
     */
    public static String getTOTPCode(String date,String secretKey) {
        long cNowTime= DateUtils.dateTime(DateUtils.YYYY_MM_DD_HH_MM_SS,date).getTime()/30000;
        Base32 base32 = new Base32();
        byte[] bytes = base32.decode(secretKey);
        String hexKey = Hex.encodeHexString(bytes);
        return TOTP.getOTP(cNowTime,hexKey);
    }

    /**
     * 生成6位数密码跟前端匹配
     * @param date
     * @param secretKey
     * @return
     */
    public static String getTOTPCode(long date,String secretKey) {
        long cNowTime= date/30000;
        Base32 base32 = new Base32();
        byte[] bytes = base32.decode(secretKey);
        String hexKey = Hex.encodeHexString(bytes);
        return TOTP.getOTP(cNowTime,hexKey);
    }
    /**
     * 只要秘钥一样.生成的6位数就是一样的.  配合前端谷歌身份证器测试一下
     * @param args
     */
    public static void main(String[] args) {
        String secretKey = generateSecretKey();
        String totpCode = getTOTPCode(secretKey);
        System.out.println(totpCode);
        //       String secretKey = "FIFAMOCVMDAMQNL525FU66JJIEKBKY6V";
//        String code = getTOTPCode(secretKey);
        System.out.println(secretKey);
    }
}


```
##### GoogleCodeService
```java

package com.ruoyi.framework.web.service;

import com.ruoyi.common.core.domain.entity.SysUser;
import com.ruoyi.common.exception.user.GoogleAuthCodeException;
import com.ruoyi.common.utils.GoogleAuthenticator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

/**
 * GoogleCodeService
 */
@Service
public class GoogleCodeService {
    @Autowired
    private HttpServletRequest request;

    public void verifyGooglecode(SysUser user, String googlecode) throws GoogleAuthCodeException {
        String value = request.getHeader("clientimestamp");
        String totpCode = null;
        if (null != value) {
            totpCode = GoogleAuthenticator.getTOTPCode(Long.parseLong(value), user.getGooglekey());
        } else {
            totpCode = GoogleAuthenticator.getTOTPCode(user.getGooglekey());
        }
        if (org.springframework.util.StringUtils.isEmpty(googlecode) || !googlecode.equals(totpCode)) {
            throw new GoogleAuthCodeException();
        }
    }

}


```
##### TOTP
```java
package com.ruoyi.common.utils;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.lang.reflect.UndeclaredThrowableException;
import java.math.BigInteger;
import java.security.GeneralSecurityException;

/**
 * Implementation of TOTP: Time-based One-time Password Algorithm
 *
 * @author thoeger
 */
public final class TOTP {

    private TOTP() {
        // private utility class constructor
    }

    /**
     * @param key - secret credential key (HEX)
     * @return the OTP
     */
    public static String getOTP(String key) {
        return TOTP.getOTP(TOTP.getStep(), key);
    }

    /**
     * @param key - secret credential key (HEX)
     * @param otp - OTP to validate
     * @return valid?
     */
    public static boolean validate(final String key, final String otp) {
        return TOTP.validate(TOTP.getStep(), key, otp);
    }

    private static boolean validate(final long step, final String key, final String otp) {
        return TOTP.getOTP(step, key).equals(otp) || TOTP.getOTP(step - 1, key).equals(otp);
    }

    private static long getStep() {
        // 30 seconds StepSize (ID TOTP)
        return System.currentTimeMillis() / 30000;
    }

    public static String getOTP(final long step, final String key) {
        String steps = Long.toHexString(step).toUpperCase();
        while (steps.length() < 16) {
            steps = "0" + steps;
        }

        // Get the HEX in a Byte[]
        final byte[] msg = TOTP.hexStr2Bytes(steps);
        final byte[] k = TOTP.hexStr2Bytes(key);

        final byte[] hash = TOTP.hmac_sha1(k, msg);

        // put selected bytes into result int
        final int offset = hash[hash.length - 1] & 0xf;
        final int binary = ((hash[offset] & 0x7f) << 24) | ((hash[offset + 1] & 0xff) << 16) | ((hash[offset + 2] & 0xff) << 8) | (hash[offset + 3] & 0xff);
        final int otp = binary % 1000000;

        String result = Integer.toString(otp);
        while (result.length() < 6) {
            result = "0" + result;
        }
        return result;
    }

    /**
     * This method converts HEX string to Byte[]
     *
     * @param hex the HEX string
     *
     * @return A byte array
     */
    private static byte[] hexStr2Bytes(final String hex) {
        // Adding one byte to get the right conversion
        // values starting with "0" can be converted
        final byte[] bArray = new BigInteger("10" + hex, 16).toByteArray();
        final byte[] ret = new byte[bArray.length - 1];

        // Copy all the REAL bytes, not the "first"
        System.arraycopy(bArray, 1, ret, 0, ret.length);
        return ret;
    }

    /**
     * This method uses the JCE to provide the crypto algorithm. HMAC computes a Hashed Message Authentication Code with the crypto hash
     * algorithm as a parameter.
     *
     * @param keyBytes the bytes to use for the HMAC key
     * @param text the message or text to be authenticated.
     */
    private static byte[] hmac_sha1(final byte[] keyBytes, final byte[] text) {
        try {
            final Mac hmac = Mac.getInstance("HmacSHA1");
            final SecretKeySpec macKey = new SecretKeySpec(keyBytes, "RAW");
            hmac.init(macKey);
            return hmac.doFinal(text);
        } catch (final GeneralSecurityException gse) {
            throw new UndeclaredThrowableException(gse);
        }
    }

}


```
#### 四. 添加新字段

##### LoginBody

```java
import lombok.Data;

@Data
public class LoginBody {
  private String googlecode;
}
```
##### messages.properties添加翻译

```text
user.google.not.match=googlecode校验失败
```
##### SecurityConfig 添加配置

```java

.authorizeRequests.antMatchers("/login", "/captchaImage","/isEnabledGoogleAuth").anonymous()

```
##### sql添加字段

```sql
googlekey   VARCHAR(32)  DEFAULT '' COMMENT 'googlekey',

添加插入

'SWYKZ6EJWR3Y5XVHX5HZEHJJEEK7HIQZ'

```

```sql
-- ----------------------------
-- 2、用户信息表
-- ----------------------------
DROP TABLE IF EXISTS sys_user;
CREATE TABLE sys_user
(
    user_id     BIGINT(20)  NOT NULL AUTO_INCREMENT COMMENT '用户ID',
    user_name   VARCHAR(30) NOT NULL COMMENT '用户账号',
    nick_name   VARCHAR(30) NOT NULL COMMENT '用户昵称',
    user_type   VARCHAR(2)   DEFAULT '00' COMMENT '用户类型（00系统用户）',
    email       VARCHAR(50)  DEFAULT '' COMMENT '用户邮箱',
    phonenumber VARCHAR(11)  DEFAULT '' COMMENT '手机号码',
    googlekey   VARCHAR(32)  DEFAULT '' COMMENT 'googlekey',
    sex         CHAR(1)      DEFAULT '0' COMMENT '用户性别（0男 1女）',
    avatar      VARCHAR(100) DEFAULT '' COMMENT '头像地址',
    password    VARCHAR(100) DEFAULT '' COMMENT '密码',
    status      CHAR(1)      DEFAULT '0' COMMENT '帐号状态（0正常 1停用）',
    del_flag    CHAR(1)      DEFAULT '0' COMMENT '删除标志（0代表存在 2代表删除）',
    login_ip    VARCHAR(128) DEFAULT '' COMMENT '最后登录IP',
    login_date  DATETIME COMMENT '最后登录时间',
    create_by   VARCHAR(64)  DEFAULT '' COMMENT '创建者',
    create_time DATETIME COMMENT '创建时间',
    update_by   VARCHAR(64)  DEFAULT '' COMMENT '更新者',
    update_time DATETIME COMMENT '更新时间',
    remark      VARCHAR(500) DEFAULT NULL COMMENT '备注',
    PRIMARY KEY (user_id)
) ENGINE = innodb
  AUTO_INCREMENT = 100 COMMENT = '用户信息表';

-- ----------------------------
-- 初始化-用户信息表数据
-- ----------------------------
INSERT INTO sys_user
VALUES (1, 'admin', 'admin', '00', 'tao@163.com', '15888888888','SWYKZ6EJWR3Y5XVHX5HZEHJJEEK7HIQZ', '1', '',
        '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2', '0', '0', '127.0.0.1', SYSDATE(), 'admin',
        SYSDATE(), '', NULL, '管理员');
INSERT INTO sys_user
VALUES (2, 'tao', 'tao', '00', 'tao@qq.com', '15666666666','SWYKZ6EJWR3Y5XVHX5HZEHJJEEK7HIQZ', '1', '',
        '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2', '0', '0', '127.0.0.1', SYSDATE(), 'admin',
        SYSDATE(), '', NULL, '测试员');
```

#### 五. 添加controller参数

##### SysLoginController.java

添加loginBody.getGooglecode()

```java

public AjaxResult login(@RequestBody LoginBody loginBody) {
        AjaxResult ajax = AjaxResult.success();
        // 生成令牌
        String token = loginService.login(loginBody.getUsername(), loginBody.getPassword(), loginBody.getCode(),
                loginBody.getUuid(),loginBody.getGooglecode());
        ajax.put(Constants.TOKEN, token);
        return ajax;
    }
    
```
##### SysLoginService.java
添加
```java
    @Resource
    GoogleCodeService googleCodeService;

```

```java
   LoginUser principal = (LoginUser) authentication.getPrincipal();
        SysUser user = principal.getUser();
        if (tokenService.isGoogleAuthenticator()) {
          googleCodeService.verifyGooglecode(user,googlecode);
        }
```
完全的参考:
```java

    @Resource
    GoogleCodeService googleCodeService;

    public String login(String username, String password, String code, String uuid, String googlecode)
    {
      // 用户验证
      Authentication authentication = null;
      try
      {
        // 该方法会去调用UserDetailsServiceImpl.loadUserByUsername
        authentication = authenticationManager
          .authenticate(new UsernamePasswordAuthenticationToken(username, password));
        LoginUser principal = (LoginUser) authentication.getPrincipal();
        SysUser user = principal.getUser();
        if (tokenService.isGoogleAuthenticator()) {
          googleCodeService.verifyGooglecode(user,googlecode);
        }
      }
      catch (Exception e)
      {
        if (e instanceof BadCredentialsException)
        {
          AsyncManager.me().execute(AsyncFactory.recordLogininfor(username, Constants.LOGIN_FAIL, MessageUtils.message("user.password.not.match")));
          throw new UserPasswordNotMatchException();
        }
        else
        {
          AsyncManager.me().execute(AsyncFactory.recordLogininfor(username, Constants.LOGIN_FAIL, e.getMessage()));
          throw new CustomException(e.getMessage());
        }
      }
      AsyncManager.me().execute(AsyncFactory.recordLogininfor(username, Constants.LOGIN_SUCCESS, MessageUtils.message("user.login.success")));
      LoginUser loginUser = (LoginUser) authentication.getPrincipal();
      // 生成token
      return tokenService.createToken(loginUser);
    }

```
##### SysUser类添加字段:

```java

    /** 谷歌密钥 */
    @Excel(name = "googlekey")
    private String googlekey;

```
##### SysUserMapper.xml 添加

注意:由于东西多,所以建议搜索googlekey关键字,来区分添加了什么

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.ruoyi.system.mapper.SysUserMapper">

    <resultMap type="SysUser" id="SysUserResult">
        <id property="userId" column="user_id"/>
        <result property="userName" column="user_name"/>
        <result property="nickName" column="nick_name"/>
        <result property="email" column="email"/>
        <result property="phonenumber" column="phonenumber"/>
        <result property="googlekey"  column="googlekey"  />
        <result property="sex" column="sex"/>
        <result property="avatar" column="avatar"/>
        <result property="password" column="password"/>
        <result property="status" column="status"/>
        <result property="delFlag" column="del_flag"/>
        <result property="loginIp" column="login_ip"/>
        <result property="loginDate" column="login_date"/>
        <result property="createBy" column="create_by"/>
        <result property="createTime" column="create_time"/>
        <result property="updateBy" column="update_by"/>
        <result property="updateTime" column="update_time"/>
        <result property="remark" column="remark"/>
        <collection property="roles" javaType="java.util.List" resultMap="RoleResult"/>
    </resultMap>


    <resultMap id="RoleResult" type="SysRole">
        <id property="roleId" column="role_id"/>
        <result property="roleName" column="role_name"/>
        <result property="roleKey" column="role_key"/>
        <result property="roleSort" column="role_sort"/>
        <result property="dataScope" column="data_scope"/>
        <result property="status" column="role_status"/>
    </resultMap>

    <sql id="selectUserVo">
        SELECT u.user_id,
        u.user_name,
        u.nick_name,
        u.email,
        u.avatar,
        u.phonenumber,
        u.googlekey,
        u.password,
        u.sex,
        u.status,
        u.del_flag,
        u.login_ip,
        u.login_date,
        u.create_by,
        u.create_time,
        u.remark,
        r.role_id,
        r.role_name,
        r.role_key,
        r.role_sort,
        r.data_scope,
        r.status AS role_status
        FROM sys_user u
        LEFT JOIN sys_user_role ur ON u.user_id = ur.user_id
        LEFT JOIN sys_role r ON r.role_id = ur.role_id
    </sql>

    <select id="selectUserList" parameterType="SysUser" resultMap="SysUserResult">
        select u.user_id, u.nick_name, u.user_name, u.email, u.avatar, u.phonenumber,u.googlekey, u.password, u.sex,
        u.status, u.del_flag, u.login_ip, u.login_date, u.create_by, u.create_time, u.remark from sys_user u
        where u.del_flag = '0'
        <if test="userName != null and userName != ''">
            AND u.user_name like concat('%', #{userName}, '%')
        </if>
        <if test="status != null and status != ''">
            AND u.status = #{status}
        </if>
        <if test="phonenumber != null and phonenumber != ''">
            AND u.phonenumber like concat('%', #{phonenumber}, '%')
        </if>
        <if test="params.beginTime != null and params.beginTime != ''"><!-- 开始时间检索 -->
            AND date_format(u.create_time,'%y%m%d') &gt;= date_format(#{params.beginTime},'%y%m%d')
        </if>
        <if test="params.endTime != null and params.endTime != ''"><!-- 结束时间检索 -->
            AND date_format(u.create_time,'%y%m%d') &lt;= date_format(#{params.endTime},'%y%m%d')
        </if>
        <!-- 数据范围过滤 -->
        ${params.dataScope}
    </select>

    <select id="selectUserByUserName" parameterType="String" resultMap="SysUserResult">
        <include refid="selectUserVo"/>
        where u.user_name = #{userName}
    </select>

    <select id="selectUserById" parameterType="Long" resultMap="SysUserResult">
        <include refid="selectUserVo"/>
        where u.user_id = #{userId}
    </select>

    <select id="checkUserNameUnique" parameterType="String" resultType="int">
        SELECT COUNT(1)
        FROM sys_user
        WHERE user_name = #{userName}
        LIMIT 1
    </select>

    <select id="checkPhoneUnique" parameterType="String" resultMap="SysUserResult">
        SELECT user_id, phonenumber
        FROM sys_user
        WHERE phonenumber = #{phonenumber}
        LIMIT 1
    </select>

    <select id="checkEmailUnique" parameterType="String" resultMap="SysUserResult">
        SELECT user_id, email
        FROM sys_user
        WHERE email = #{email}
        LIMIT 1
    </select>

    <insert id="insertUser" parameterType="SysUser" useGeneratedKeys="true" keyProperty="userId">
        insert into sys_user(
        <if test="userId != null and userId != 0">user_id,</if>
        <if test="userName != null and userName != ''">user_name,</if>
        <if test="nickName != null and nickName != ''">nick_name,</if>
        <if test="email != null and email != ''">email,</if>
        <if test="avatar != null and avatar != ''">avatar,</if>
        <if test="phonenumber != null and phonenumber != ''">phonenumber,</if>
        <if test="googlekey != null and googlekey != ''">googlekey,</if>
        <if test="sex != null and sex != ''">sex,</if>
        <if test="password != null and password != ''">password,</if>
        <if test="status != null and status != ''">status,</if>
        <if test="createBy != null and createBy != ''">create_by,</if>
        <if test="remark != null and remark != ''">remark,</if>
        create_time
        )values(
        <if test="userId != null and userId != ''">#{userId},</if>
        <if test="userName != null and userName != ''">#{userName},</if>
        <if test="nickName != null and nickName != ''">#{nickName},</if>
        <if test="email != null and email != ''">#{email},</if>
        <if test="avatar != null and avatar != ''">#{avatar},</if>
        <if test="phonenumber != null and phonenumber != ''">#{phonenumber},</if>
        <if test="googlekey != null and googlekey != ''">#{googlekey},</if>
        <if test="sex != null and sex != ''">#{sex},</if>
        <if test="password != null and password != ''">#{password},</if>
        <if test="status != null and status != ''">#{status},</if>
        <if test="createBy != null and createBy != ''">#{createBy},</if>
        <if test="remark != null and remark != ''">#{remark},</if>
        sysdate()
        )
    </insert>

    <update id="updateUser" parameterType="SysUser">
        update sys_user
        <set>
            <if test="userName != null and userName != ''">user_name = #{userName},</if>
            <if test="nickName != null and nickName != ''">nick_name = #{nickName},</if>
            <if test="email != null ">email = #{email},</if>
            <if test="phonenumber != null ">phonenumber = #{phonenumber},</if>
            <if test="googlekey != null and googlekey != ''">googlekey = #{googlekey},</if>
            <if test="sex != null and sex != ''">sex = #{sex},</if>
            <if test="avatar != null and avatar != ''">avatar = #{avatar},</if>
            <if test="password != null and password != ''">password = #{password},</if>
            <if test="status != null and status != ''">status = #{status},</if>
            <if test="loginIp != null and loginIp != ''">login_ip = #{loginIp},</if>
            <if test="loginDate != null">login_date = #{loginDate},</if>
            <if test="updateBy != null and updateBy != ''">update_by = #{updateBy},</if>
            <if test="remark != null">remark = #{remark},</if>
            update_time = sysdate()
        </set>
        where user_id = #{userId}
    </update>

    <update id="updateUserStatus" parameterType="SysUser">
        UPDATE sys_user
        SET status = #{status}
        WHERE user_id = #{userId}
    </update>

    <update id="updateUserAvatar" parameterType="SysUser">
        UPDATE sys_user
        SET avatar = #{avatar}
        WHERE user_name = #{userName}
    </update>

    <update id="resetUserPwd" parameterType="SysUser">
        UPDATE sys_user
        SET password = #{password}
        WHERE user_name = #{userName}
    </update>

    <delete id="deleteUserById" parameterType="Long">
        DELETE
        FROM sys_user
        WHERE user_id = #{userId}
    </delete>

    <delete id="deleteUserByIds" parameterType="Long">
        update sys_user set del_flag = '2' where user_id in
        <foreach collection="array" item="userId" open="(" separator="," close=")">
            #{userId}
        </foreach>
    </delete>

</mapper>

```
##### TokenService.java

```java
    @Data
    public class TokenService
    {
        // 是否启动google身份验证
        @Value("${token.googleAuthenticator}")
        private boolean googleAuthenticator;

```
### (2). 前端的添加
#### user/index.vue

```html
添加展示
<el-table-column label="google key" align="center" prop="googlekey"  />

添加form字段

<el-col :span="12">
  <el-form-item label="googlekey" prop="googlekey">
    <el-input v-model="form.googlekey" placeholder="googlekey"  />
  </el-form-item>
</el-col>


```
```java
 this.form = {
  googlekey: undefined,
}
```
#### login.js
```javascript
##加字段
export function login(username, password, code, uuid, googlecode) {
  const data = {
    username,
    password,
    code,
    uuid,
    googlecode
  }
  return request({
    url: '/login',
    method: 'post',
    data: data
  })
}

创建方法:

// 获取验证码
  export function getIsEnabledGoogleAuth() {
    return request({
      url: '/isEnabledGoogleAuth',
      method: 'get'
    })
  }
  
  
```
#### login.vue

```html
添加form

<el-form-item v-if="isGoogleAuthenticatorEnabled">
  <el-input v-model="loginForm.googlecode" type="number" placeholder="google code"  @keyup.enter.native="handleLogin">
  </el-input>
</el-form-item>


```

```javascript
import {getIsEnabledGoogleAuth } from '@/api/login'

data() {
  return {
    isGoogleAuthenticatorEnabled: false,
    loginForm: {
      googlecode: ""
    },
  }
},
created() {
  this.getIsEnabledGoogleAuth();
},
methods: {
  getIsEnabledGoogleAuth() {
    getIsEnabledGoogleAuth().then(res => {
      if (res) {
        this.isGoogleAuthenticatorEnabled = res.isGoogleAuthenticatorEnabled;
      }
    });
  },
```

#### request.js

```javascript
service.interceptors.request.use(config => {
  config.headers['clientimestamp'] = Date.now();
}
```
#### user.js

```javascript
actions: {
 // 登录
    Login({ commit }, userInfo) {
      const googlecode = userInfo.googlecode
      return new Promise((resolve, reject) => {
        login(username, password, code, uuid, googlecode).then(res => {
      })
    },
```

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

  <el-col :span="1.5">
    <el-button
      type="info"
      plain
      icon="el-icon-upload2"
      size="mini"
      @click="handleImport"
      v-hasPermi="['chessandcardchallenge:dataimport:import']"
    >导入
    </el-button>
  </el-col>
  
  
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

```java
/**
 * 从库
 */
SLAVE
```



3、在`DruidConfig`配置读取数据源

```java
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

```java
setDataSource(targetDataSources, DataSourceType.SLAVE.name(), "slaveDataSource");
```

5、在需要使用多数据源方法或类上添加`@DataSource`注解，其中`value`用来表示数据源



```java
@DataSource(value = DataSourceType.SLAVE)
public List<SysUser> selectUserList(SysUser user)
{
	return userMapper.selectUserList(user);
}
```





```java
@Service
@DataSource(value = DataSourceType.SLAVE)
public class SysUserServiceImpl
```



对于特殊情况可以通过`DynamicDataSourceContextHolder`手动实现数据源切换

```java
public List<SysUser> selectUserList(SysUser user)
{
	DynamicDataSourceContextHolder.setDataSourceType(DataSourceType.SLAVE.name());
	List<SysUser> userList = userMapper.selectUserList(user);
	DynamicDataSourceContextHolder.clearDataSourceType();
	return userList;
}
```



逻辑实现代码 `com.ruoyi.framework.aspectj.DataSourceAspect`

```java
注意：目前配置了一个从库，默认关闭状态。如果不需要多数据源不用做任何配置。 另外可新增多个从库。支持不同数据源（Mysql、Oracle、SQLServer）
```

提示

如果有Service方法内多个注解无效的情况使用内部方法调用
SpringUtils.getAopProxy(this).xxxxxx(xxxx);

## linux上excel导出报错问题解决:

linux上excel导出报错问题解决:

如果是centos linux是少了fontconfig三方模块:

参考如下方式安装:

yum -y install fontconfig

fc-cache --force

重新启动java服务即可
