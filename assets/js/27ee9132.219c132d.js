(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{76:function(e,r,n){"use strict";n.r(r),n.d(r,"frontMatter",(function(){return a})),n.d(r,"metadata",(function(){return i})),n.d(r,"toc",(function(){return d})),n.d(r,"default",(function(){return s}));var o=n(3),t=n(7),c=(n(0),n(94)),a={id:"docker",title:"docker\u5e38\u89c1\u95ee\u9898",sidebar_label:"docker\u5e38\u89c1\u95ee\u9898",slug:"/os-info/docker"},i={unversionedId:"os-info/docker/docker",id:"os-info/docker/docker",isDocsHomePage:!1,title:"docker\u5e38\u89c1\u95ee\u9898",description:"\u5b89\u88c5docker",source:"@site/docs/os-info/docker/docker.md",slug:"/os-info/docker",permalink:"/developer-QA/docs/os-info/docker",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/os-info/docker/docker.md",version:"current",lastUpdatedAt:1617764966,formattedLastUpdatedAt:"4/7/2021",sidebar_label:"docker\u5e38\u89c1\u95ee\u9898",sidebar:"docs",previous:{title:"Centos\u5e38\u89c1\u95ee\u9898",permalink:"/developer-QA/docs/os-info/centos"},next:{title:"git\u5e38\u89c1\u95ee\u9898",permalink:"/developer-QA/docs/app-info/git"}},d=[{value:"\u5b89\u88c5docker",id:"\u5b89\u88c5docker",children:[]}],l={toc:d};function s(e){var r=e.components,n=Object(t.a)(e,["components"]);return Object(c.b)("wrapper",Object(o.a)({},l,n,{components:r,mdxType:"MDXLayout"}),Object(c.b)("h2",{id:"\u5b89\u88c5docker"},"\u5b89\u88c5docker"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre"},'yum remove docker \\\n  docker-client \\\n  docker-client-latest \\\n  docker-common \\\n  docker-latest \\\n  docker-latest-logrotate \\\n  docker-logrotate \\\n  docker-engine\n\n\nyum install -y yum-utils\n\nyum-config-manager \\\n    --add-repo \\\n    https://download.docker.com/linux/centos/docker-ce.repo\n\n\n\n\nyum install docker-ce docker-ce-cli containerd.io -y\n\n\nsystemctl start docker\n\n\ndocker run hello-world\n\n\ncurl -L "https://github.com/docker/compose/releases/download/1.28.6/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose\n\n\nchmod +x /usr/local/bin/docker-compose\n\ndocker-compose --version\n')))}s.isMDXComponent=!0},94:function(e,r,n){"use strict";n.d(r,"a",(function(){return u})),n.d(r,"b",(function(){return m}));var o=n(0),t=n.n(o);function c(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function a(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?a(Object(n),!0).forEach((function(r){c(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function d(e,r){if(null==e)return{};var n,o,t=function(e,r){if(null==e)return{};var n,o,t={},c=Object.keys(e);for(o=0;o<c.length;o++)n=c[o],r.indexOf(n)>=0||(t[n]=e[n]);return t}(e,r);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(o=0;o<c.length;o++)n=c[o],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(t[n]=e[n])}return t}var l=t.a.createContext({}),s=function(e){var r=t.a.useContext(l),n=r;return e&&(n="function"==typeof e?e(r):i(i({},r),e)),n},u=function(e){var r=s(e.components);return t.a.createElement(l.Provider,{value:r},e.children)},p={inlineCode:"code",wrapper:function(e){var r=e.children;return t.a.createElement(t.a.Fragment,{},r)}},f=t.a.forwardRef((function(e,r){var n=e.components,o=e.mdxType,c=e.originalType,a=e.parentName,l=d(e,["components","mdxType","originalType","parentName"]),u=s(n),f=o,m=u["".concat(a,".").concat(f)]||u[f]||p[f]||c;return n?t.a.createElement(m,i(i({ref:r},l),{},{components:n})):t.a.createElement(m,i({ref:r},l))}));function m(e,r){var n=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var c=n.length,a=new Array(c);a[0]=f;var i={};for(var d in r)hasOwnProperty.call(r,d)&&(i[d]=r[d]);i.originalType=e,i.mdxType="string"==typeof e?e:o,a[1]=i;for(var l=2;l<c;l++)a[l]=n[l];return t.a.createElement.apply(null,a)}return t.a.createElement.apply(null,n)}f.displayName="MDXCreateElement"}}]);