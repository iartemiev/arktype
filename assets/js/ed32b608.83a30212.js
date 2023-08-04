"use strict";(self.webpackChunkarktype_io=self.webpackChunkarktype_io||[]).push([[2576],{7522:(e,r,t)=>{t.d(r,{Zo:()=>u,kt:()=>d});var n=t(9901);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function l(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function p(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var i=n.createContext({}),c=function(e){var r=n.useContext(i),t=r;return e&&(t="function"==typeof e?e(r):l(l({},r),e)),t},u=function(e){var r=c(e.components);return n.createElement(i.Provider,{value:r},e.children)},s="mdxType",f={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},m=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),s=c(t),m=a,d=s["".concat(i,".").concat(m)]||s[m]||f[m]||o;return t?n.createElement(d,l(l({ref:r},u),{},{components:t})):n.createElement(d,l({ref:r},u))}));function d(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=t.length,l=new Array(o);l[0]=m;var p={};for(var i in r)hasOwnProperty.call(r,i)&&(p[i]=r[i]);p.originalType=e,p[s]="string"==typeof e?e:a,l[1]=p;for(var c=2;c<o;c++)l[c]=t[c];return n.createElement.apply(null,l)}return n.createElement.apply(null,t)}m.displayName="MDXCreateElement"},8594:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>u,contentTitle:()=>i,default:()=>d,frontMatter:()=>p,metadata:()=>c,toc:()=>s});var n=t(3050),a=t(3146),o=(t(9901),t(7522)),l=["components"],p={hide_table_of_contents:!0},i="narrow",c={unversionedId:"api/narrow",id:"version-1.0.19-alpha/api/narrow",title:"narrow",description:"operator",source:"@site/versioned_docs/version-1.0.19-alpha/api/narrow.md",sourceDirName:"api",slug:"/api/narrow",permalink:"/docs/api/narrow",draft:!1,tags:[],version:"1.0.19-alpha",frontMatter:{hide_table_of_contents:!0}},u={},s=[{value:"operator",id:"operator",level:2},{value:"tuple",id:"tuple",level:2},{value:"example",id:"example",level:2}],f={toc:s},m="wrapper";function d(e){var r=e.components,t=(0,a.Z)(e,l);return(0,o.kt)(m,(0,n.Z)({},f,t,{components:r,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"narrow"},"narrow"),(0,o.kt)("h2",{id:"operator"},"operator"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/docs/api/narrow"},"=>"))),(0,o.kt)("h2",{id:"tuple"},"tuple"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},'["type", "=>" , condition]'," ",(0,o.kt)("br",null)),(0,o.kt)("li",{parentName:"ul"},"const narrow = type( ",'["number", "=>" , (n) => n % 2 === 0]',")",(0,o.kt)("br",null))),(0,o.kt)("h2",{id:"example"},"example"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"     const isEven = (x: unknown): x is number => x % 2 === 0\n")))))}d.isMDXComponent=!0}}]);