---
id: docusaurus
title: docusaurus常见问题
sidebar_label: docusaurus常见问题

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

## 4. Docusaurus found broken links!

```angular2html
error building locale=en
Error: Docusaurus found broken links!

Please check the pages of your site in the list bellow, and make sure you don't reference any path that does not exist.
Note: it's possible to ignore broken links with the 'onBrokenLinks' Docusaurus configuration, and let the build pass.

Exhaustive list of all broken links found:

- On source page path = /bookmarks-site/:
   -> linking to /bookmarks-site/docs/

```
这种是因为docs目录下,需要一个默认目录

比如在docs下加一个introduce.md
内容如下:

```markdown
---
id: docs
title: introduce
sidebar_label: introduce
slug: /
---

```
## 4.git push github失败，提示：SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443

在shell脚本中加:
```shell
git config --global --unset http.proxy

```
