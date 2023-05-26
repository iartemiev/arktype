"use strict";(self.webpackChunkarktype_io=self.webpackChunkarktype_io||[]).push([[4173],{7522:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>f});var r=t(9901);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=r.createContext({}),l=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},c=function(e){var n=l(e.components);return r.createElement(p.Provider,{value:n},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},u=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=l(t),u=a,f=d["".concat(p,".").concat(u)]||d[u]||m[u]||o;return t?r.createElement(f,i(i({ref:n},c),{},{components:t})):r.createElement(f,i({ref:n},c))}));function f(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=u;var s={};for(var p in n)hasOwnProperty.call(n,p)&&(s[p]=n[p]);s.originalType=e,s[d]="string"==typeof e?e:a,i[1]=s;for(var l=2;l<o;l++)i[l]=t[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}u.displayName="MDXCreateElement"},2005:(e,n,t)=>{t.d(n,{g:()=>y});var r=t(6512),a=t(2286),o=t(3800),i=t(5690),s=t(9901),p=t(3346);var l=function(e){var n=c[e];return'import {populateDemo} from "./populateDemo"\n(async () => {\n    try {\n        '+n[0]+"\n        populateDemo("+n[1]+')\n    } catch(e) {\n        populateDemo({ \n            type: {\n                definition: ""\n            },\n            data: "",\n            problems: "ParseError: " + e.originalErr.message\n          } as any)\n    }\n})()'},c={type:['const { user, data, problems } = await import("./type")',"{ type: user, data, problems }"],scope:['const { types, data, problems } = await import("./scope")',"{ type: types.package, data, problems }"],demo:['const { pkg, data, problems } = await import("./demo")',"{ type: pkg, data, problems }"]};var d={"index.html":'<head>\n    <link href="http://fonts.cdnfonts.com/css/cascadia-code" rel="stylesheet" />\n</head>\n<div id="demo">\n    <div class="section">\n        <div class="card">\n            <h3>Definition</h3>\n            <pre><code id="definition"></code></pre>\n        </div>\n    </div>\n    <div class="section">\n        <div class="card">\n            <h3>Output</h3>\n            <pre><code id="output"></code></pre>\n        </div>\n    </div>\n</div>\n',"demo.css":'body {\n    font-family: "Cascadia Code", sans-serif;\n    background-color: hsl(220 18% 10%);\n}\n\n#demo {\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n    margin: -0.5rem;\n    padding: 0.5rem;\n}\n\n#input {\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n    gap: 0.5rem;\n}\n\n.section {\n    display: flex;\n    flex-direction: column;\n    flex-grow: 1;\n    gap: 0.5rem;\n}\n\np {\n    white-space: pre-wrap;\n}\n\npre {\n    white-space: pre-wrap;\n}\n\nh3 {\n    margin: 0px;\n    color: #fffff0;\n}\n\n.key {\n    color: #80cff8;\n}\n.val {\n    color: #f5cf8f;\n}\n\n.card {\n    padding: 1rem;\n    background-color: rgb(18, 18, 18);\n    color: rgb(255, 255, 255);\n    /* transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms; */\n    border-radius: 1rem;\n    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 1px -1px,\n        rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;\n    background-image: linear-gradient(\n        rgba(255, 255, 255, 0.05),\n        rgba(255, 255, 255, 0.05)\n    );\n    height: 100%;\n}\n',"populateDemo.ts":'import "./demo.css"\nimport type { Problems, Type } from "arktype"\nimport { stringify } from "arktype/internal/utils/serialize.js"\n\ntype PopulateDemoArgs = {\n    type: Type\n    data: unknown\n    problems: Problems\n}\nexport const populateDemo = ({ data, type, problems }: PopulateDemoArgs) => {\n    const defElement = document.querySelector("#definition")!\n    defElement.textContent = stringify(type.definition, 2)\n    defElement.innerHTML = recolor(defElement.innerHTML)\n\n    const resultElement = document.querySelector("#output")!\n    if (problems) {\n        resultElement.textContent = `\u274c problems:\n\n${problems}`\n    } else {\n        resultElement.textContent = `\u2705 data:\n\n${stringify(\n            type(data).data,\n            2\n        )}`\n        resultElement.innerHTML = recolor(resultElement.innerHTML)\n    }\n}\n\nconst recolor = (input: string) => {\n    const lines = input.split("\\n")\n    const fixedInput: string[] = []\n    for (const line of lines) {\n        if (line.includes(":")) {\n            const parts = line.split(":")\n            fixedInput.push(`${buildKey(parts[0])}: ${buildVal(parts[1])}`)\n        } else {\n            fixedInput.push(line)\n        }\n    }\n    return fixedInput.join("\\n")\n}\n\nconst buildKey = (key: string) => {\n    return `<span class=\'key\'>${key}</span>`\n}\nconst buildVal = (val: string) => {\n    const formatted = val.trim()\n    if (formatted[formatted.length - 1] === ",") {\n        return `<span class=\'val\'>${formatted.replace(",", "")}</span>,`\n    } else if (formatted[formatted.length - 1] === "{") {\n        return "{"\n    }\n    return `<span class=\'val\'>${formatted}</span>`\n}\n',"tsconfig.json":JSON.stringify({compilerOptions:{module:"esnext",target:"esnext",strict:!0}},null,4)},m={type:'import { type } from "arktype"\n\n// Definitions are statically parsed and inferred as TS.\nexport const user = type({\n    name: "string",\n    device: {\n        platform: "\'android\'|\'ios\'",\n        "version?": "number"\n    }\n})\n\n// Validators return typed data or clear, customizable errors.\nexport const { data, problems } = user({\n    name: "Alan Turing",\n    device: {\n        // problems.summary: "device/platform must be \'android\' or \'ios\' (was \'enigma\')"\n        platform: "enigma"\n    }\n})\n',scope:'import { scope } from "arktype"\n\n// Scopes are collections of types that can reference each other.\nexport const types = scope({\n    package: {\n        name: "string",\n        "dependencies?": "package[]",\n        "contributors?": "contributor[]"\n    },\n    contributor: {\n        // Subtypes like \'email\' are inferred like \'string\' but provide additional validation at runtime.\n        email: "email",\n        "packages?": "package[]"\n    }\n}).compile()\n\n// Cyclic types are inferred to arbitrary depth...\nexport type Package = typeof types.package.infer\n\n// And can validate cyclic data.\nconst packageData: Package = {\n    name: "arktype",\n    dependencies: [{ name: "typescript" }],\n    contributors: [{ email: "david@sharktypeio" }]\n}\npackageData.dependencies![0].dependencies = [packageData]\n\nexport const { data, problems } = types.package(packageData)\n',demo:'import { type } from "arktype"\n\n// Define your type...\nexport const pkg = type({\n    name: "string",\n    version: "semver",\n    "contributors?": "1<email[]<=10"\n})\n\n// Infer it...\nexport type Package = typeof pkg.infer\n\n// Get validated data or clear, customizable error messages.\nexport const { data, problems } = pkg({\n    name: "arktype",\n    version: "1.0.0-alpha",\n    contributors: ["david@arktype.io"]\n})\n\n// "contributors must be more than 1 items long (was 1)"\nconsole.log(problems?.summary ?? data)\n'},u="arktype-demo",f=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(n){var t,a;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.embedId,e.abrupt("return",p.Z.embedProject(u,{files:Object.assign((t={},t[a+".ts"]=m[a],t["index.ts"]=l(a),t[".prettierrc"]=JSON.stringify({tabWidth:4,semi:!1,trailingComma:"none"}),t),d),title:a,description:"ArkType "+a+" demo",template:"typescript",dependencies:{arktype:"1.0.14-alpha"},settings:{compile:{clearConsole:!1,trigger:"keystroke"}}},{height:"100%",openFile:a+".ts"}));case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),y=function(e){var n=(0,s.useState)(!0),t=n[0],r=n[1];return(0,s.useEffect)((function(){g(e,r)}),[]),s.createElement(o.Z,{width:"100%",height:"600px"},t?s.createElement(i.Z,null):null,s.createElement("div",{id:u}))},g=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(n,t){var a;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f(n);case 2:a=e.sent,setTimeout((function(){return a.applyFsDiff({create:{"tsconfig.json":JSON.stringify({compilerOptions:{module:"esnext",target:"esnext",strict:!0}},null,4)},destroy:[]})}),5e3),t(!1);case 5:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}()},8786:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>l,default:()=>y,frontMatter:()=>p,metadata:()=>c,toc:()=>m});var r=t(8179),a=t(3984),o=(t(9901),t(7522)),i=t(2005),s=["components"],p={id:"intro",hide_table_of_contents:!0,title:"Intro"},l="Getting Started",c={unversionedId:"intro",id:"intro",title:"Intro",description:'replace(./dev/arktype.io/static,) |> replace({ type },{"{"} type {"}"}) --\x3e',source:"@site/docs/index.mdx",sourceDirName:".",slug:"/",permalink:"/docs/next/",draft:!1,tags:[],version:"current",frontMatter:{id:"intro",hide_table_of_contents:!0,title:"Intro"},sidebar:"sidebar",next:{title:"Scopes",permalink:"/docs/next/scopes"}},d={},m=[{value:"Install <sub><sub>\ud83d\udce6<code>12KB</code> gzipped, <code>0</code> dependencies</sub></sub>",id:"install-12kb-gzipped-0-dependencies",level:2},{value:"Your first type",id:"your-first-type",level:2}],u={toc:m},f="wrapper";function y(e){var n=e.components,t=(0,a.Z)(e,s);return(0,o.kt)(f,(0,r.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"getting-started"},"Getting Started"),(0,o.kt)("h2",{id:"install-12kb-gzipped-0-dependencies"},"Install ",(0,o.kt)("sub",null,(0,o.kt)("sub",null,"\ud83d\udce6",(0,o.kt)("inlineCode",{parentName:"h2"},"12KB")," gzipped, ",(0,o.kt)("inlineCode",{parentName:"h2"},"0")," dependencies"))),(0,o.kt)("img",{src:"/img/npm.svg",alt:"Npm Icon",height:"16px"})," ",(0,o.kt)("code",null,"npm install arktype"),(0,o.kt)("sub",null,"(or whatever package manager you prefer)"),(0,o.kt)("br",null),(0,o.kt)("p",null,"Our types are tested in ",(0,o.kt)("a",{parentName:"p",href:"https://www.typescriptlang.org/tsconfig#strict"},"strict-mode")," with TypeScript versions ",(0,o.kt)("inlineCode",{parentName:"p"},"4.8"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"4.9"),", and ",(0,o.kt)("inlineCode",{parentName:"p"},"5.0"),"."),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"Our APIs have mostly stabilized, but details may still change during the alpha/beta stages of our 1.0 release. If you have suggestions that may require a breaking change, now is the time to let us know!")," \u26f5"),(0,o.kt)("h2",{id:"your-first-type"},"Your first type"),(0,o.kt)(i.g,{embedId:"type",mdxType:"StackBlitzDemo"}))}y.isMDXComponent=!0}}]);