import{r as o,H as w,x as M,y as D,z as O,R as n,A as y,B as A,F as C,G as S,_ as T,J as U,K as N,M as H,N as K,O as P,P as Z,I as z,a as G,W as J}from"./index.0af769d6.js";var Q=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(Q||{}),V=(e=>(e[e.ToggleDisclosure=0]="ToggleDisclosure",e[e.CloseDisclosure=1]="CloseDisclosure",e[e.SetButtonId=2]="SetButtonId",e[e.SetPanelId=3]="SetPanelId",e[e.LinkPanel=4]="LinkPanel",e[e.UnlinkPanel=5]="UnlinkPanel",e))(V||{});let X={[0]:e=>({...e,disclosureState:C(e.disclosureState,{[0]:1,[1]:0})}),[1]:e=>e.disclosureState===1?e:{...e,disclosureState:1},[4](e){return e.linkedPanel===!0?e:{...e,linkedPanel:!0}},[5](e){return e.linkedPanel===!1?e:{...e,linkedPanel:!1}},[2](e,r){return e.buttonId===r.buttonId?e:{...e,buttonId:r.buttonId}},[3](e,r){return e.panelId===r.panelId?e:{...e,panelId:r.panelId}}},R=o.exports.createContext(null);R.displayName="DisclosureContext";function L(e){let r=o.exports.useContext(R);if(r===null){let t=new Error(`<${e} /> is missing a parent <Disclosure /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(t,L),t}return r}let F=o.exports.createContext(null);F.displayName="DisclosureAPIContext";function W(e){let r=o.exports.useContext(F);if(r===null){let t=new Error(`<${e} /> is missing a parent <Disclosure /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(t,W),t}return r}let $=o.exports.createContext(null);$.displayName="DisclosurePanelContext";function Y(){return o.exports.useContext($)}function _(e,r){return C(r.type,X,e,r)}let q=o.exports.Fragment,ee=w(function(e,r){let{defaultOpen:t=!1,...s}=e,l=`headlessui-disclosure-button-${M()}`,u=`headlessui-disclosure-panel-${M()}`,i=o.exports.useRef(null),k=D(r,O(f=>{i.current=f},e.as===void 0||e.as===n.Fragment)),x=o.exports.useRef(null),h=o.exports.useRef(null),d=o.exports.useReducer(_,{disclosureState:t?0:1,linkedPanel:!1,buttonRef:h,panelRef:x,buttonId:l,panelId:u}),[{disclosureState:c},p]=d;o.exports.useEffect(()=>p({type:2,buttonId:l}),[l,p]),o.exports.useEffect(()=>p({type:3,panelId:u}),[u,p]);let E=y(f=>{p({type:1});let I=K(i);if(!I)return;let B=(()=>f?f instanceof HTMLElement?f:f.current instanceof HTMLElement?f.current:I.getElementById(l):I.getElementById(l))();B==null||B.focus()}),v=o.exports.useMemo(()=>({close:E}),[E]),a=o.exports.useMemo(()=>({open:c===0,close:E}),[c,E]),m={ref:k};return n.createElement(R.Provider,{value:d},n.createElement(F.Provider,{value:v},n.createElement(A,{value:C(c,{[0]:S.Open,[1]:S.Closed})},T({ourProps:m,theirProps:s,slot:a,defaultTag:q,name:"Disclosure"}))))}),te="button",ne=w(function(e,r){let[t,s]=L("Disclosure.Button"),l=Y(),u=l===null?!1:l===t.panelId,i=o.exports.useRef(null),k=D(i,r,u?null:t.buttonRef),x=y(a=>{var m;if(u){if(t.disclosureState===1)return;switch(a.key){case P.Space:case P.Enter:a.preventDefault(),a.stopPropagation(),s({type:0}),(m=t.buttonRef.current)==null||m.focus();break}}else switch(a.key){case P.Space:case P.Enter:a.preventDefault(),a.stopPropagation(),s({type:0});break}}),h=y(a=>{switch(a.key){case P.Space:a.preventDefault();break}}),d=y(a=>{var m;Z(a.currentTarget)||e.disabled||(u?(s({type:0}),(m=t.buttonRef.current)==null||m.focus()):s({type:0}))}),c=o.exports.useMemo(()=>({open:t.disclosureState===0}),[t]),p=U(e,i),E=e,v=u?{ref:k,type:p,onKeyDown:x,onClick:d}:{ref:k,id:t.buttonId,type:p,"aria-expanded":e.disabled?void 0:t.disclosureState===0,"aria-controls":t.linkedPanel?t.panelId:void 0,onKeyDown:x,onKeyUp:h,onClick:d};return T({ourProps:v,theirProps:E,slot:c,defaultTag:te,name:"Disclosure.Button"})}),re="div",oe=N.RenderStrategy|N.Static,se=w(function(e,r){let[t,s]=L("Disclosure.Panel"),{close:l}=W("Disclosure.Panel"),u=D(r,t.panelRef,()=>{t.linkedPanel||s({type:4})}),i=H(),k=(()=>i!==null?i===S.Open:t.disclosureState===0)();o.exports.useEffect(()=>()=>s({type:5}),[s]),o.exports.useEffect(()=>{var c;t.disclosureState===1&&((c=e.unmount)!=null?c:!0)&&s({type:5})},[t.disclosureState,e.unmount,s]);let x=o.exports.useMemo(()=>({open:t.disclosureState===0,close:l}),[t,l]),h=e,d={ref:u,id:t.panelId};return n.createElement($.Provider,{value:t.panelId},T({ourProps:d,theirProps:h,slot:x,defaultTag:re,features:oe,visible:k,name:"Disclosure.Panel"}))}),b=Object.assign(ee,{Button:ne,Panel:se});var g=new Map;g.set("bold",function(e){return n.createElement(n.Fragment,null,n.createElement("polyline",{points:"48 160 128 80 208 160",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}))});g.set("duotone",function(e){return n.createElement(n.Fragment,null,n.createElement("polygon",{points:"48 160 128 80 208 160 48 160",opacity:"0.2"}),n.createElement("polygon",{points:"48 160 128 80 208 160 48 160",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}))});g.set("fill",function(){return n.createElement(n.Fragment,null,n.createElement("path",{d:"M213.7,154.3l-80-80a8.1,8.1,0,0,0-11.4,0l-80,80a8.4,8.4,0,0,0-1.7,8.8A8,8,0,0,0,48,168H208a8,8,0,0,0,7.4-4.9A8.4,8.4,0,0,0,213.7,154.3Z"}))});g.set("light",function(e){return n.createElement(n.Fragment,null,n.createElement("polyline",{points:"48 160 128 80 208 160",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}))});g.set("thin",function(e){return n.createElement(n.Fragment,null,n.createElement("polyline",{points:"48 160 128 80 208 160",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"}))});g.set("regular",function(e){return n.createElement(n.Fragment,null,n.createElement("polyline",{points:"48 160 128 80 208 160",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}))});var ae=function(r,t){return G(r,t,g)},j=o.exports.forwardRef(function(e,r){return n.createElement(z,Object.assign({ref:r},e,{renderPath:ae}))});j.displayName="CaretUp";const le=j,ie=({title:e,children:r,defaultOpen:t=!0})=>n.createElement(b,{as:"div",className:"overflow-hidden",defaultOpen:t},({open:s})=>n.createElement(n.Fragment,null,n.createElement(b.Button,{className:`bg-green-wine-100 focus:ring-green-wine-200/50 dark:bg-green-wine-300/50 text-green-wine-600 hover:bg-green-wine-200/40 dark:hover:bg-green-wine-300/60 relative flex w-full select-none justify-between
              rounded px-5 py-3 text-left text-sm font-medium outline-none focus:ring-2
              focus:ring-inset dark:text-white`},n.createElement("span",null,e),n.createElement(le,{className:`transition-transform ${s?"rotate-180":""} h-5 w-5`})),n.createElement(J,{show:s,enter:"transition transition-[max-height] duration-500 ease-in",enterFrom:"transform max-h-0",enterTo:"transform max-h-screen",leave:"transition transition-[max-height] duration-200 ease-out",leaveFrom:"transform max-h-screen",leaveTo:"transform max-h-0"},n.createElement(b.Panel,{className:"p-2"},r))));export{ie as A};