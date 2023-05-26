/* eslint-disable */
//prettier-ignore
module.exports = {
name: "@yarnpkg/plugin-secrets",
factory: function (require) {
var plugin=(()=>{var m=Object.defineProperty;var v=Object.getOwnPropertyDescriptor;var E=Object.getOwnPropertyNames;var R=Object.prototype.hasOwnProperty;var d=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(r,o)=>(typeof require<"u"?require:r)[o]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+e+'" is not supported')});var w=(e,r)=>{for(var o in r)m(e,o,{get:r[o],enumerable:!0})},N=(e,r,o,n)=>{if(r&&typeof r=="object"||typeof r=="function")for(let t of E(r))!R.call(e,t)&&t!==o&&m(e,t,{get:()=>r[t],enumerable:!(n=v(r,t))||n.enumerable});return e};var y=e=>N(m({},"__esModule",{value:!0}),e);var S={};w(S,{default:()=>O});var c=d("@yarnpkg/core");var f=d("@yarnpkg/core");var l=d("child_process");function g(e,r=!0){return new Promise((o,n)=>{(0,l.exec)(e,(t,s,i)=>{t?(r&&console.error(`Error: ${t.message}, out: ${i??s}`),n(t)):(r&&console.info(s),o(s))})})}var a=class{constructor(){this.prefix=process.env.SECRET_PROJECT_PREFIX??"frontend-"}async get({project:r,report:o}){try{let n=r.getWorkspaceByCwd(process.cwd()),t=n==null?void 0:n.manifest.name.name,s=r.topLevelWorkspace.manifest.name.name===t;o.reportInfoOnce(f.MessageName.UNNAMED,`Getting secrets from doppler for ${t}`);let i=await g(`doppler secrets download --no-file --format=json -p ${this.getProjectName(t,s)}`,!1);return o.reportJson(i),JSON.parse(i)}catch{return o.reportErrorOnce(f.MessageName.UNNAMED,"Running doppler command went wrong"),null}}getProjectName(r,o){return o?r:`${this.prefix}${r}`}};var u={doppler:a};var x={hooks:{setupScriptEnvironment:async(e,r)=>{let o=process.env.SECRETS_PROVIDER||"doppler",n=u[o];(await c.StreamReport.start({configuration:e.configuration,stdout:process.stdout,includeLogs:!0},async s=>{try{let i=await new n().get({project:e,report:s});for(let[p,P]of Object.entries(i))r[p]&&s.reportWarningOnce(c.MessageName.UNNAMED,`Overriding environment variable ${p} with value from doppler`),r[p]=P}catch{s.reportErrorOnce(c.MessageName.UNNAMED,`Running ${o} command went wrong`)}})).exitCode()}}},O=x;return y(S);})();
return plugin;
}
};
