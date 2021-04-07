---
id: docusaurus
title: docusaurus常见问题
sidebar_label: Centos常见问题
slug: /ide-info/docusaurus
---



## 1.部署命令



```
yarn deploy
```

## 2.DEPLOYMENT_BRANCH和CURRENT_BRANCH相同异常

查询一下

```
echo $DEPLOYMENT_BRANCH一下,看看是不是真的一样
如果一样,就改一下即可解决
```

## 3.部署到github上,浏览异常,一般是如下修改

```
  url: 'https://google-microsoft.github.io/developer-QA', // Your website URL
  baseUrl: '/developer-QA/',

把url最后的"/"去掉
把baseUrl改成二级路径
```

