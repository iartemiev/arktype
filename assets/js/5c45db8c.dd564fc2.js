"use strict";(self.webpackChunkarktype_io=self.webpackChunkarktype_io||[]).push([[7375],{7522:(e,t,r)=>{r.d(t,{Zo:()=>f,kt:()=>m});var n=r(9901);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var p=n.createContext({}),l=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},f=function(e){var t=l(e.components);return n.createElement(p.Provider,{value:t},e.children)},u="mdxType",s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},y=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,f=c(e,["components","mdxType","originalType","parentName"]),u=l(r),y=o,m=u["".concat(p,".").concat(y)]||u[y]||s[y]||a;return r?n.createElement(m,i(i({ref:t},f),{},{components:r})):n.createElement(m,i({ref:t},f))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=y;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c[u]="string"==typeof e?e:o,i[1]=c;for(var l=2;l<a;l++)i[l]=r[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}y.displayName="MDXCreateElement"},5608:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>f,contentTitle:()=>p,default:()=>m,frontMatter:()=>c,metadata:()=>l,toc:()=>u});var n=r(4805),o=r(8),a=(r(9901),r(7522)),i=["components"],c={hide_table_of_contents:!0},p="Infer",l={unversionedId:"api/infer",id:"version-1.0.25-alpha/api/infer",title:"Infer",description:"text",source:"@site/versioned_docs/version-1.0.25-alpha/api/infer.md",sourceDirName:"api",slug:"/api/infer",permalink:"/docs/1.0.25-alpha/api/infer",draft:!1,tags:[],version:"1.0.25-alpha",frontMatter:{hide_table_of_contents:!0}},f={},u=[{value:"text",id:"text",level:2}],s={toc:u},y="wrapper";function m(e){var t=e.components,r=(0,o.Z)(e,i);return(0,a.kt)(y,(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"infer"},"Infer"),(0,a.kt)("h2",{id:"text"},"text"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"export type Infer<t> = {\n    [as]?: t\n}\n")))}m.isMDXComponent=!0}}]);