"use strict";(self.webpackChunkarktype_io=self.webpackChunkarktype_io||[]).push([[3708],{57522:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>y});var r=n(29901);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var d=r.createContext({}),f=function(e){var t=r.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=f(e.components);return r.createElement(d.Provider,{value:t},e.children)},c="mdxType",s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,d=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),c=f(n),u=i,y=c["".concat(d,".").concat(u)]||c[u]||s[u]||a;return n?r.createElement(y,o(o({ref:t},p),{},{components:n})):r.createElement(y,o({ref:t},p))}));function y(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=u;var l={};for(var d in t)hasOwnProperty.call(t,d)&&(l[d]=t[d]);l.originalType=e,l[c]="string"==typeof e?e:i,o[1]=l;for(var f=2;f<a;f++)o[f]=n[f];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},18301:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>d,default:()=>y,frontMatter:()=>l,metadata:()=>f,toc:()=>c});var r=n(54805),i=n(30008),a=(n(29901),n(57522)),o=["components"],l={hide_table_of_contents:!0},d="validateDefinition",f={unversionedId:"api/validatedefinition",id:"version-1.0.27-alpha/api/validatedefinition",title:"validateDefinition",description:"text",source:"@site/versioned_docs/version-1.0.27-alpha/api/validatedefinition.md",sourceDirName:"api",slug:"/api/validatedefinition",permalink:"/docs/1.0.27-alpha/api/validatedefinition",draft:!1,tags:[],version:"1.0.27-alpha",frontMatter:{hide_table_of_contents:!0}},p={},c=[{value:"text",id:"text",level:2}],s={toc:c},u="wrapper";function y(e){var t=e.components,n=(0,i.Z)(e,o);return(0,a.kt)(u,(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"validatedefinition"},"validateDefinition"),(0,a.kt)("h2",{id:"text"},"text"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"export type validateDefinition<def, $> = [def] extends [(...args: any[]) => any]\n    ? def\n    : def extends Terminal\n    ? def\n    : def extends string\n    ? validateString<def, $>\n    : def extends TupleExpression\n    ? validateTupleExpression<def, $>\n    : def extends BadDefinitionType\n    ? writeBadDefinitionTypeMessage<\n          objectKindOf<def> extends string ? objectKindOf<def> : domainOf<def>\n      >\n    : isUnknown<def> extends true\n    ? stringKeyOf<$>\n    : evaluate<{\n          [k in keyof def]: validateDefinition<def[k], $>\n      }>\n")))}y.isMDXComponent=!0}}]);