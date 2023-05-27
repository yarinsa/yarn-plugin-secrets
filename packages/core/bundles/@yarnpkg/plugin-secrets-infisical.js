/* eslint-disable */
//prettier-ignore
module.exports = {
name: "@yarnpkg/plugin-secrets",
factory: function (require) {
var plugin=(()=>{var E=Object.defineProperty;var M=Object.getOwnPropertyDescriptor;var O=Object.getOwnPropertyNames;var A=Object.prototype.hasOwnProperty;var c=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(r,o)=>(typeof require<"u"?require:r)[o]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+e+'" is not supported')});var $=(e,r)=>{for(var o in r)E(e,o,{get:r[o],enumerable:!0})},j=(e,r,o,n)=>{if(r&&typeof r=="object"||typeof r=="function")for(let t of O(r))!A.call(e,t)&&t!==o&&E(e,t,{get:()=>r[t],enumerable:!(n=M(r,t))||n.enumerable});return e};var D=e=>j(E({},"__esModule",{value:!0}),e);var F={};$(F,{default:()=>W});var d=c("@yarnpkg/core");var a=c("@yarnpkg/core");var w=c("child_process"),m=(e,r,o=!0)=>new Promise((n,t)=>{(0,w.exec)(`${e} ${r.join(" ")}`,(s,i,p)=>{s?(o&&console.error(`Error: ${s.message}, out: ${p??i}`),t(s)):(o&&console.info(i),n(i))})});var f=class extends Error{constructor(){super("InvalidJsonError")}},l=e=>{try{return JSON.parse(e)}catch{throw new f}};var y=c("@yarnpkg/core"),P=(e,r,o)=>{for(let[n,t]of Object.entries(r)){let s=e[n];s&&s!==t&&o&&o.reportWarningOnce(y.MessageName.UNNAMED,`Overriding environment variable ${n} with value from secrets provider`),e[n]=t}};var H=new Proxy(process.env,{get(e,r,o){if(r in e)return Reflect.get(e,r,o);throw new Error(`Environment variable ${r.toString()} is not set`)}});var u="infisical",x=class extends Error{constructor(){super(`${u} cli not installed`)}},v=async e=>{try{await m(`${u} --version`,[],!1)}catch{throw new x}};var N=c("@yarnpkg/core"),g=c("fs/promises");var S=[".infisical.json"],I=async({cwd:e},r)=>{let o=(await(0,g.readdir)(e)).filter(i=>S.some(p=>i.includes(p)));if(!(o!=null&&o.length))return r.reportWarningOnce(N.MessageName.UNNAMED,"No infisical configuration file found."),null;o.length>1&&r.reportWarningOnce(N.MessageName.UNNAMED,"Multiple infisical configuration files found",{reportExtra:()=>n});let n=o[0],t=await(0,g.readFile)(`${e}/${n}`,"utf8");return l(t)};var R=c("@yarnpkg/core"),h=({secrets:e,report:r})=>Array.isArray(e)?e.reduce((n,{key:t,value:s})=>(n[t]=s,n),{}):(r.reportErrorOnce(R.MessageName.UNNAMED,"Invalid json returned from infisical"),null);var U="infisical",C=async({project:e,report:r})=>{let o=a.Report.progressViaCounter(5),n=r.reportProgress(o);try{o.set(1),await v(r),o.set(2);let t=e.getWorkspaceByCwd(process.cwd()),s=await I(t,r);s&&r.reportInfoOnce(a.MessageName.UNNAMED,`Project id: ${s.workspaceId}`),o.set(3);let i=await m(`${u} export `,["--format=json"],!1);r.reportInfoOnce(a.MessageName.UNNAMED,"Fetched successfully",{reportExtra:()=>i}),o.set(4);let p=l(i);return o.set(5),h({secrets:p,report:r})}catch(t){return t instanceof f?(r.reportErrorOnce(a.MessageName.UNNAMED,"Invalid json returned from infisical"),null):(r.reportErrorOnce(a.MessageName.UNNAMED,t.message),null)}finally{n.stop()}},k={get:C,key:U};var b={hooks:{setupScriptEnvironment:async(e,r)=>{(await d.StreamReport.start({configuration:e.configuration,stdout:process.stdout,includeLogs:!0},async n=>{await n.startTimerPromise("Fetching secrets from provider",async()=>{try{let t=await k.get({project:e,report:n});P(r,t,n)}catch(t){if(!(t instanceof Error))return;n.reportErrorOnce(d.MessageName.UNNAMED,t.message)}})})).exitCode()}}},W=b;return D(F);})();
return plugin;
}
};