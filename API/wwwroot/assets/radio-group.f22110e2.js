import{R as a,r as s,I as te,a as re,z as h,H as M,X as D,A as W,Q as w,_ as U,ar as ne,aj as oe,G as ae,U as le,a1 as C,J as H,K as A,P as K,aq as ie}from"./index.a80f4a55.js";import{k as J,h as se,s as ue,F as pe}from"./vinmonopolet.1080456f.js";var y=new Map;y.set("bold",function(e){return a.createElement(a.Fragment,null,a.createElement("polyline",{points:"216 72 104 184 48 128",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}))});y.set("duotone",function(e){return a.createElement(a.Fragment,null,a.createElement("polyline",{points:"216 72 104 184 48 128",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}))});y.set("fill",function(){return a.createElement(a.Fragment,null,a.createElement("path",{d:"M104,192a8.5,8.5,0,0,1-5.7-2.3l-56-56a8.1,8.1,0,0,1,11.4-11.4L104,172.7,210.3,66.3a8.1,8.1,0,0,1,11.4,11.4l-112,112A8.5,8.5,0,0,1,104,192Z"}))});y.set("light",function(e){return a.createElement(a.Fragment,null,a.createElement("polyline",{points:"216 72 104 184 48 128",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}))});y.set("thin",function(e){return a.createElement(a.Fragment,null,a.createElement("polyline",{points:"216 72 104 184 48 128",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"}))});y.set("regular",function(e){return a.createElement(a.Fragment,null,a.createElement("polyline",{points:"216 72 104 184 48 128",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}))});var ce=function(r,t){return re(r,t,y)},Q=s.exports.forwardRef(function(e,r){return a.createElement(te,Object.assign({ref:r},e,{renderPath:ce}))});Q.displayName="Check";const Fe=Q;function q(e={},r=null,t=[]){for(let[o,i]of Object.entries(e))X(t,z(r,o),i);return t}function z(e,r){return e?e+"["+r+"]":r}function X(e,r,t){if(Array.isArray(t))for(let[o,i]of t.entries())X(e,z(r,o.toString()),i);else t instanceof Date?e.push([r,t.toISOString()]):typeof t=="boolean"?e.push([r,t?"1":"0"]):typeof t=="string"?e.push([r,t]):typeof t=="number"?e.push([r,`${t}`]):t==null?e.push([r,""]):q(t,r,e)}function de(e){var r;let t=(r=e==null?void 0:e.form)!=null?r:e.closest("form");if(t){for(let o of t.elements)if(o.tagName==="INPUT"&&o.type==="submit"||o.tagName==="BUTTON"&&o.type==="submit"||o.nodeName==="INPUT"&&o.type==="image"){o.click();return}}}function fe(e=0){let[r,t]=s.exports.useState(e),o=s.exports.useCallback(l=>t(d=>d|l),[r]),i=s.exports.useCallback(l=>Boolean(r&l),[r]),p=s.exports.useCallback(l=>t(d=>d&~l),[t]),m=s.exports.useCallback(l=>t(d=>d^l),[t]);return{addFlag:o,hasFlag:i,removeFlag:p,toggleFlag:m}}let Y=s.exports.createContext(null);function Z(){let e=s.exports.useContext(Y);if(e===null){let r=new Error("You used a <Label /> component, but it is not inside a relevant parent.");throw Error.captureStackTrace&&Error.captureStackTrace(r,Z),r}return e}function V(){let[e,r]=s.exports.useState([]);return[e.length>0?e.join(" "):void 0,s.exports.useMemo(()=>function(t){let o=h(p=>(r(m=>[...m,p]),()=>r(m=>{let l=m.slice(),d=l.indexOf(p);return d!==-1&&l.splice(d,1),l}))),i=s.exports.useMemo(()=>({register:o,slot:t.slot,name:t.name,props:t.props}),[o,t.slot,t.name,t.props]);return a.createElement(Y.Provider,{value:i},t.children)},[r])]}let me="label",ge=M(function(e,r){let{passive:t=!1,...o}=e,i=Z(),p=`headlessui-label-${D()}`,m=W(r);w(()=>i.register(p),[p,i.register]);let l={ref:m,...i.props,id:p};return t&&("onClick"in l&&delete l.onClick,"onClick"in o&&delete o.onClick),U({ourProps:l,theirProps:o,slot:i.slot||{},defaultTag:me,name:i.name||"Label"})});var ve=(e=>(e[e.RegisterOption=0]="RegisterOption",e[e.UnregisterOption=1]="UnregisterOption",e))(ve||{});let he={[0](e,r){let t=[...e.options,{id:r.id,element:r.element,propsRef:r.propsRef}];return{...e,options:ie(t,o=>o.element.current)}},[1](e,r){let t=e.options.slice(),o=e.options.findIndex(i=>i.id===r.id);return o===-1?e:(t.splice(o,1),{...e,options:t})}},_=s.exports.createContext(null);_.displayName="RadioGroupContext";function ee(e){let r=s.exports.useContext(_);if(r===null){let t=new Error(`<${e} /> is missing a parent <RadioGroup /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(t,ee),t}return r}function ke(e,r){return ae(r.type,he,e,r)}let be="div",Ee=M(function(e,r){let{value:t,name:o,onChange:i,disabled:p=!1,...m}=e,l=h((n,f)=>n===f),[d,F]=s.exports.useReducer(ke,{options:[]}),g=d.options,[O,k]=V(),[x,S]=J(),b=`headlessui-radiogroup-${D()}`,$=s.exports.useRef(null),I=W($,r),P=s.exports.useMemo(()=>g.find(n=>!n.propsRef.current.disabled),[g]),L=s.exports.useMemo(()=>g.some(n=>l(n.propsRef.current.value,t)),[g,t]),E=h(n=>{var f;if(p||l(n,t))return!1;let u=(f=g.find(v=>l(v.propsRef.current.value,n)))==null?void 0:f.propsRef.current;return u!=null&&u.disabled?!1:(i(n),!0)});ne({container:$.current,accept(n){return n.getAttribute("role")==="radio"?NodeFilter.FILTER_REJECT:n.hasAttribute("role")?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT},walk(n){n.setAttribute("role","none")}});let N=h(n=>{let f=$.current;if(!f)return;let u=le(f),v=g.filter(c=>c.propsRef.current.disabled===!1).map(c=>c.element.current);switch(n.key){case C.Enter:de(n.currentTarget);break;case C.ArrowLeft:case C.ArrowUp:if(n.preventDefault(),n.stopPropagation(),H(v,A.Previous|A.WrapAround)===K.Success){let c=g.find(R=>R.element.current===(u==null?void 0:u.activeElement));c&&E(c.propsRef.current.value)}break;case C.ArrowRight:case C.ArrowDown:if(n.preventDefault(),n.stopPropagation(),H(v,A.Next|A.WrapAround)===K.Success){let c=g.find(R=>R.element.current===(u==null?void 0:u.activeElement));c&&E(c.propsRef.current.value)}break;case C.Space:{n.preventDefault(),n.stopPropagation();let c=g.find(R=>R.element.current===(u==null?void 0:u.activeElement));c&&E(c.propsRef.current.value)}break}}),T=h(n=>(F({type:0,...n}),()=>F({type:1,id:n.id}))),j=s.exports.useMemo(()=>({registerOption:T,firstOption:P,containsCheckedOption:L,change:E,disabled:p,value:t,compare:l}),[T,P,L,E,p,t,l]),G={ref:I,id:b,role:"radiogroup","aria-labelledby":O,"aria-describedby":x,onKeyDown:N};return a.createElement(S,{name:"RadioGroup.Description"},a.createElement(k,{name:"RadioGroup.Label"},a.createElement(_.Provider,{value:j},o!=null&&t!=null&&q({[o]:t}).map(([n,f])=>a.createElement(se,{features:ue.Hidden,...oe({key:n,as:"input",type:"radio",checked:f!=null,hidden:!0,readOnly:!0,name:n,value:f})})),U({ourProps:G,theirProps:m,defaultTag:be,name:"RadioGroup"}))))});var Re=(e=>(e[e.Empty=1]="Empty",e[e.Active=2]="Active",e))(Re||{});let ye="div",xe=M(function(e,r){let t=s.exports.useRef(null),o=W(t,r),i=`headlessui-radiogroup-option-${D()}`,[p,m]=V(),[l,d]=J(),{addFlag:F,removeFlag:g,hasFlag:O}=fe(1),{value:k,disabled:x=!1,...S}=e,b=s.exports.useRef({value:k,disabled:x});w(()=>{b.current.value=k},[k,b]),w(()=>{b.current.disabled=x},[x,b]);let{registerOption:$,disabled:I,change:P,firstOption:L,containsCheckedOption:E,value:N,compare:T}=ee("RadioGroup.Option");w(()=>$({id:i,element:t,propsRef:b}),[i,$,t,e]);let j=h(()=>{var B;!P(k)||(F(2),(B=t.current)==null||B.focus())}),G=h(()=>F(2)),n=h(()=>g(2)),f=(L==null?void 0:L.id)===i,u=I||x,v=T(N,k),c={ref:o,id:i,role:"radio","aria-checked":v?"true":"false","aria-labelledby":p,"aria-describedby":l,"aria-disabled":u?!0:void 0,tabIndex:(()=>u?-1:v||!E&&f?0:-1)(),onClick:u?void 0:j,onFocus:u?void 0:G,onBlur:u?void 0:n},R=s.exports.useMemo(()=>({checked:v,disabled:u,active:O(2)}),[v,u,O]);return a.createElement(d,{name:"RadioGroup.Description"},a.createElement(m,{name:"RadioGroup.Label"},U({ourProps:c,theirProps:S,slot:R,defaultTag:ye,name:"RadioGroup.Option"})))}),Le=Object.assign(Ee,{Option:xe,Label:ge,Description:pe});export{Fe as C,ge as F,V as M,q as e,Le as j,de as p};
