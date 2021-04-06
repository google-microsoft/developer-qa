(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{105:function(e,r,t){"use strict";t.d(r,"a",(function(){return d})),t.d(r,"b",(function(){return f}));var n=t(0),a=t.n(n);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function c(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?c(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function l(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=a.a.createContext({}),u=function(e){var r=a.a.useContext(p),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},d=function(e){var r=u(e.components);return a.a.createElement(p.Provider,{value:r},e.children)},s={inlineCode:"code",wrapper:function(e){var r=e.children;return a.a.createElement(a.a.Fragment,{},r)}},b=a.a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,o=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=u(t),b=n,f=d["".concat(c,".").concat(b)]||d[b]||s[b]||o;return t?a.a.createElement(f,i(i({ref:r},p),{},{components:t})):a.a.createElement(f,i({ref:r},p))}));function f(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var o=t.length,c=new Array(o);c[0]=b;var i={};for(var l in r)hasOwnProperty.call(r,l)&&(i[l]=r[l]);i.originalType=e,i.mdxType="string"==typeof e?e:n,c[1]=i;for(var p=2;p<o;p++)c[p]=t[p];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,t)}b.displayName="MDXCreateElement"},84:function(e,r,t){"use strict";t.r(r),t.d(r,"frontMatter",(function(){return c})),t.d(r,"metadata",(function(){return i})),t.d(r,"toc",(function(){return l})),t.d(r,"default",(function(){return u}));var n=t(3),a=t(7),o=(t(0),t(105)),c={id:"java",title:"Style Guide",sidebar_label:"Style Guide"},i={unversionedId:"java/java",id:"java/java",isDocsHomePage:!1,title:"Style Guide",description:"1.\u67e5\u627ejar\u7684\u8fdb\u7a0b\u5e76\u6740\u6389\u8fdb\u5ea6shell",source:"@site/docs/java/readme.md",slug:"/java/java",permalink:"/developer-QA/docs/java/java",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/java/readme.md",version:"current",sidebar_label:"Style Guide"},l=[{value:"1.\u67e5\u627ejar\u7684\u8fdb\u7a0b\u5e76\u6740\u6389\u8fdb\u5ea6shell",id:"1\u67e5\u627ejar\u7684\u8fdb\u7a0b\u5e76\u6740\u6389\u8fdb\u5ea6shell",children:[]},{value:"2.\u6253\u5305targ.gz\u538b\u7f29\u548c\u89e3\u538b\u547d\u4ee4",id:"2\u6253\u5305targgz\u538b\u7f29\u548c\u89e3\u538b\u547d\u4ee4",children:[]},{value:"3.\u4fee\u6539springboot\u542f\u52a8\u7aef\u53e3",id:"3\u4fee\u6539springboot\u542f\u52a8\u7aef\u53e3",children:[]}],p={toc:l};function u(e){var r=e.components,t=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},p,t,{components:r,mdxType:"MDXLayout"}),Object(o.b)("h3",{id:"1\u67e5\u627ejar\u7684\u8fdb\u7a0b\u5e76\u6740\u6389\u8fdb\u5ea6shell"},"1.\u67e5\u627ejar\u7684\u8fdb\u7a0b\u5e76\u6740\u6389\u8fdb\u5ea6shell"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},'p=`jcmd | grep tao-admin.jar | cut -d " " -f 1`\n\nkill -9 $p\n')),Object(o.b)("h3",{id:"2\u6253\u5305targgz\u538b\u7f29\u548c\u89e3\u538b\u547d\u4ee4"},"2.\u6253\u5305targ.gz\u538b\u7f29\u548c\u89e3\u538b\u547d\u4ee4"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},"\u538b\u7f29\ntar -zcvf develop-project.tar.gz dist\n\n\u89e3\u538b\ntar -zxvf develop-project.tar.gz\n\n")),Object(o.b)("h3",{id:"3\u4fee\u6539springboot\u542f\u52a8\u7aef\u53e3"},"3.\u4fee\u6539springboot\u542f\u52a8\u7aef\u53e3"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},"idea\u8fd0\u884c\u914d\u7f6e\u4e0a,VM options\u4e0a\u52a0-Dserver.port=8006\n")))}u.isMDXComponent=!0}}]);