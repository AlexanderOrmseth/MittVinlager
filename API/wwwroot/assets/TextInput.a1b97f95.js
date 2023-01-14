import{r as f,U as X,a3 as P,H as T,y as F,z as g,B as w,a5 as _,R as i,A as Y,F as W,aj as z,_ as D,w as j,ak as A,G as B,J as U,K as ee,N as te,al as N,am as re,an as ne,O as h,ao as L,P as G,ap as oe,aq as ae,I as ie,a as le}from"./index.2deef4e9.js";import{h as V,s as q,F as se,k as ue,X as ce}from"./vinmonopolet.fd01c801.js";import{e as pe,F as de,M as fe,p as xe}from"./Check.esm.a58bb0bd.js";function Z(e,o){let[r,t]=f.exports.useState(e),n=X(e);return P(()=>t(n.current),[n,t,...o]),r}var ve=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(ve||{}),be=(e=>(e[e.Single=0]="Single",e[e.Multi=1]="Multi",e))(be||{}),me=(e=>(e[e.Pointer=0]="Pointer",e[e.Other=1]="Other",e))(me||{}),he=(e=>(e[e.OpenListbox=0]="OpenListbox",e[e.CloseListbox=1]="CloseListbox",e[e.SetDisabled=2]="SetDisabled",e[e.SetOrientation=3]="SetOrientation",e[e.GoToOption=4]="GoToOption",e[e.Search=5]="Search",e[e.ClearSearch=6]="ClearSearch",e[e.RegisterOption=7]="RegisterOption",e[e.UnregisterOption=8]="UnregisterOption",e))(he||{});function $(e,o=r=>r){let r=e.activeOptionIndex!==null?e.options[e.activeOptionIndex]:null,t=ae(o(e.options.slice()),a=>a.dataRef.current.domRef.current),n=r?t.indexOf(r):null;return n===-1&&(n=null),{options:t,activeOptionIndex:n}}let ye={[1](e){return e.disabled||e.listboxState===1?e:{...e,activeOptionIndex:null,listboxState:1}},[0](e){if(e.disabled||e.listboxState===0)return e;let o=e.activeOptionIndex,{value:r,mode:t,compare:n}=e.propsRef.current,a=e.options.findIndex(u=>{let s=u.dataRef.current.value;return w(t,{[1]:()=>r.some(c=>n(c,s)),[0]:()=>n(r,s)})});return a!==-1&&(o=a),{...e,listboxState:0,activeOptionIndex:o}},[2](e,o){return e.disabled===o.disabled?e:{...e,disabled:o.disabled}},[3](e,o){return e.orientation===o.orientation?e:{...e,orientation:o.orientation}},[4](e,o){var r;if(e.disabled||e.listboxState===1)return e;let t=$(e),n=oe(o,{resolveItems:()=>t.options,resolveActiveIndex:()=>t.activeOptionIndex,resolveId:a=>a.id,resolveDisabled:a=>a.dataRef.current.disabled});return{...e,...t,searchQuery:"",activeOptionIndex:n,activationTrigger:(r=o.trigger)!=null?r:1}},[5]:(e,o)=>{if(e.disabled||e.listboxState===1)return e;let r=e.searchQuery!==""?0:1,t=e.searchQuery+o.value.toLowerCase(),n=(e.activeOptionIndex!==null?e.options.slice(e.activeOptionIndex+r).concat(e.options.slice(0,e.activeOptionIndex+r)):e.options).find(u=>{var s;return!u.dataRef.current.disabled&&((s=u.dataRef.current.textValue)==null?void 0:s.startsWith(t))}),a=n?e.options.indexOf(n):-1;return a===-1||a===e.activeOptionIndex?{...e,searchQuery:t}:{...e,searchQuery:t,activeOptionIndex:a,activationTrigger:1}},[6](e){return e.disabled||e.listboxState===1||e.searchQuery===""?e:{...e,searchQuery:""}},[7]:(e,o)=>{let r={id:o.id,dataRef:o.dataRef},t=$(e,n=>[...n,r]);if(e.activeOptionIndex===null){let{value:n,mode:a,compare:u}=e.propsRef.current,s=o.dataRef.current.value;w(a,{[1]:()=>n.some(c=>u(c,s)),[0]:()=>u(n,s)})&&(t.activeOptionIndex=t.options.indexOf(r))}return{...e,...t}},[8]:(e,o)=>{let r=$(e,t=>{let n=t.findIndex(a=>a.id===o.id);return n!==-1&&t.splice(n,1),t});return{...e,...r,activationTrigger:1}}},K=f.exports.createContext(null);K.displayName="ListboxContext";function M(e){let o=f.exports.useContext(K);if(o===null){let r=new Error(`<${e} /> is missing a parent <Listbox /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,M),r}return o}function ke(e,o){return w(o.type,ye,e,o)}let ge=f.exports.Fragment,Re=T(function(e,o){let{value:r,name:t,onChange:n,disabled:a=!1,horizontal:u=!1,multiple:s=!1,...c}=e;const v=u?"horizontal":"vertical";let O=F(o),y=f.exports.useReducer(ke,{listboxState:1,propsRef:{current:{value:r,onChange:n,mode:s?1:0,compare:g((R,S)=>R===S)}},labelRef:f.exports.createRef(),buttonRef:f.exports.createRef(),optionsRef:f.exports.createRef(),disabled:a,orientation:v,options:[],searchQuery:"",activeOptionIndex:null,activationTrigger:1}),[{listboxState:b,propsRef:d,optionsRef:x,buttonRef:m},l]=y;d.current.value=r,d.current.mode=s?1:0,P(()=>{d.current.onChange=R=>w(d.current.mode,{[0](){return n(R)},[1](){let S=d.current.value.slice(),k=S.indexOf(R);return k===-1?S.push(R):S.splice(k,1),n(S)}})},[n,d]),P(()=>l({type:2,disabled:a}),[a]),P(()=>l({type:3,orientation:v}),[v]),_([m,x],(R,S)=>{var k;l({type:1}),re(S,ne.Loose)||(R.preventDefault(),(k=m.current)==null||k.focus())},b===0);let p=f.exports.useMemo(()=>({open:b===0,disabled:a}),[b,a]),I={ref:O};return i.createElement(K.Provider,{value:y},i.createElement(Y,{value:w(b,{[0]:W.Open,[1]:W.Closed})},t!=null&&r!=null&&pe({[t]:r}).map(([R,S])=>i.createElement(V,{features:q.Hidden,...z({key:R,as:"input",type:"hidden",hidden:!0,readOnly:!0,name:R,value:S})})),D({ourProps:I,theirProps:c,slot:p,defaultTag:ge,name:"Listbox"})))}),Oe="button",Se=T(function(e,o){var r;let[t,n]=M("Listbox.Button"),a=F(t.buttonRef,o),u=`headlessui-listbox-button-${j()}`,s=A(),c=g(m=>{switch(m.key){case h.Space:case h.Enter:case h.ArrowDown:m.preventDefault(),n({type:0}),s.nextFrame(()=>{t.propsRef.current.value||n({type:4,focus:L.First})});break;case h.ArrowUp:m.preventDefault(),n({type:0}),s.nextFrame(()=>{t.propsRef.current.value||n({type:4,focus:L.Last})});break}}),v=g(m=>{switch(m.key){case h.Space:m.preventDefault();break}}),O=g(m=>{if(G(m.currentTarget))return m.preventDefault();t.listboxState===0?(n({type:1}),s.nextFrame(()=>{var l;return(l=t.buttonRef.current)==null?void 0:l.focus({preventScroll:!0})})):(m.preventDefault(),n({type:0}))}),y=Z(()=>{if(t.labelRef.current)return[t.labelRef.current.id,u].join(" ")},[t.labelRef.current,u]),b=f.exports.useMemo(()=>({open:t.listboxState===0,disabled:t.disabled}),[t]),d=e,x={ref:a,id:u,type:B(e,t.buttonRef),"aria-haspopup":!0,"aria-controls":(r=t.optionsRef.current)==null?void 0:r.id,"aria-expanded":t.disabled?void 0:t.listboxState===0,"aria-labelledby":y,disabled:t.disabled,onKeyDown:c,onKeyUp:v,onClick:O};return D({ourProps:x,theirProps:d,slot:b,defaultTag:Oe,name:"Listbox.Button"})}),Le="label",Ee=T(function(e,o){let[r]=M("Listbox.Label"),t=`headlessui-listbox-label-${j()}`,n=F(r.labelRef,o),a=g(()=>{var s;return(s=r.buttonRef.current)==null?void 0:s.focus({preventScroll:!0})}),u=f.exports.useMemo(()=>({open:r.listboxState===0,disabled:r.disabled}),[r]);return D({ourProps:{ref:n,id:t,onClick:a},theirProps:e,slot:u,defaultTag:Le,name:"Listbox.Label"})}),Pe="ul",we=U.RenderStrategy|U.Static,Ie=T(function(e,o){var r;let[t,n]=M("Listbox.Options"),a=F(t.optionsRef,o),u=`headlessui-listbox-options-${j()}`,s=A(),c=A(),v=ee(),O=(()=>v!==null?v===W.Open:t.listboxState===0)();f.exports.useEffect(()=>{var l;let p=t.optionsRef.current;!p||t.listboxState===0&&p!==((l=te(p))==null?void 0:l.activeElement)&&p.focus({preventScroll:!0})},[t.listboxState,t.optionsRef]);let y=g(l=>{switch(c.dispose(),l.key){case h.Space:if(t.searchQuery!=="")return l.preventDefault(),l.stopPropagation(),n({type:5,value:l.key});case h.Enter:if(l.preventDefault(),l.stopPropagation(),t.activeOptionIndex!==null){let{dataRef:p}=t.options[t.activeOptionIndex];t.propsRef.current.onChange(p.current.value)}t.propsRef.current.mode===0&&(n({type:1}),N().nextFrame(()=>{var p;return(p=t.buttonRef.current)==null?void 0:p.focus({preventScroll:!0})}));break;case w(t.orientation,{vertical:h.ArrowDown,horizontal:h.ArrowRight}):return l.preventDefault(),l.stopPropagation(),n({type:4,focus:L.Next});case w(t.orientation,{vertical:h.ArrowUp,horizontal:h.ArrowLeft}):return l.preventDefault(),l.stopPropagation(),n({type:4,focus:L.Previous});case h.Home:case h.PageUp:return l.preventDefault(),l.stopPropagation(),n({type:4,focus:L.First});case h.End:case h.PageDown:return l.preventDefault(),l.stopPropagation(),n({type:4,focus:L.Last});case h.Escape:return l.preventDefault(),l.stopPropagation(),n({type:1}),s.nextFrame(()=>{var p;return(p=t.buttonRef.current)==null?void 0:p.focus({preventScroll:!0})});case h.Tab:l.preventDefault(),l.stopPropagation();break;default:l.key.length===1&&(n({type:5,value:l.key}),c.setTimeout(()=>n({type:6}),350));break}}),b=Z(()=>{var l,p,I;return(I=(l=t.labelRef.current)==null?void 0:l.id)!=null?I:(p=t.buttonRef.current)==null?void 0:p.id},[t.labelRef.current,t.buttonRef.current]),d=f.exports.useMemo(()=>({open:t.listboxState===0}),[t]),x=e,m={"aria-activedescendant":t.activeOptionIndex===null||(r=t.options[t.activeOptionIndex])==null?void 0:r.id,"aria-multiselectable":t.propsRef.current.mode===1?!0:void 0,"aria-labelledby":b,"aria-orientation":t.orientation,id:u,onKeyDown:y,role:"listbox",tabIndex:0,ref:a};return D({ourProps:m,theirProps:x,slot:d,defaultTag:Pe,features:we,visible:O,name:"Listbox.Options"})}),De="li",Ce=T(function(e,o){let{disabled:r=!1,value:t,...n}=e,[a,u]=M("Listbox.Option"),s=`headlessui-listbox-option-${j()}`,c=a.activeOptionIndex!==null?a.options[a.activeOptionIndex].id===s:!1,{value:v,compare:O}=a.propsRef.current,y=w(a.propsRef.current.mode,{[1]:()=>v.some(k=>O(k,t)),[0]:()=>O(v,t)}),b=f.exports.useRef(null),d=F(o,b);P(()=>{if(a.listboxState!==0||!c||a.activationTrigger===0)return;let k=N();return k.requestAnimationFrame(()=>{var E,H;(H=(E=b.current)==null?void 0:E.scrollIntoView)==null||H.call(E,{block:"nearest"})}),k.dispose},[b,c,a.listboxState,a.activationTrigger,a.activeOptionIndex]);let x=f.exports.useRef({disabled:r,value:t,domRef:b});P(()=>{x.current.disabled=r},[x,r]),P(()=>{x.current.value=t},[x,t]),P(()=>{var k,E;x.current.textValue=(E=(k=b.current)==null?void 0:k.textContent)==null?void 0:E.toLowerCase()},[x,b]);let m=g(()=>a.propsRef.current.onChange(t));P(()=>(u({type:7,id:s,dataRef:x}),()=>u({type:8,id:s})),[x,s]);let l=g(k=>{if(r)return k.preventDefault();m(),a.propsRef.current.mode===0&&(u({type:1}),N().nextFrame(()=>{var E;return(E=a.buttonRef.current)==null?void 0:E.focus({preventScroll:!0})}))}),p=g(()=>{if(r)return u({type:4,focus:L.Nothing});u({type:4,focus:L.Specific,id:s})}),I=g(()=>{r||c||u({type:4,focus:L.Specific,id:s,trigger:0})}),R=g(()=>{r||!c||u({type:4,focus:L.Nothing})}),S=f.exports.useMemo(()=>({active:c,selected:y,disabled:r}),[c,y,r]);return D({ourProps:{id:s,ref:d,role:"option",tabIndex:r===!0?void 0:-1,"aria-disabled":r===!0?!0:void 0,"aria-selected":y===!0?!0:void 0,disabled:void 0,onClick:l,onFocus:p,onPointerMove:I,onMouseMove:I,onPointerLeave:R,onMouseLeave:R},theirProps:n,slot:S,defaultTag:De,name:"Listbox.Option"})}),Ke=Object.assign(Re,{Button:Se,Label:Ee,Options:Ie,Option:Ce}),Q=f.exports.createContext(null);Q.displayName="GroupContext";let Te=f.exports.Fragment;function Fe(e){let[o,r]=f.exports.useState(null),[t,n]=fe(),[a,u]=ue(),s=f.exports.useMemo(()=>({switch:o,setSwitch:r,labelledby:t,describedby:a}),[o,r,t,a]),c={},v=e;return i.createElement(u,{name:"Switch.Description"},i.createElement(n,{name:"Switch.Label",props:{onClick(){!o||(o.click(),o.focus({preventScroll:!0}))}}},i.createElement(Q.Provider,{value:s},D({ourProps:c,theirProps:v,defaultTag:Te,name:"Switch.Group"}))))}let je="button",Me=T(function(e,o){let{checked:r,onChange:t,name:n,value:a,...u}=e,s=`headlessui-switch-${j()}`,c=f.exports.useContext(Q),v=f.exports.useRef(null),O=F(v,o,c===null?null:c.setSwitch),y=g(()=>t(!r)),b=g(p=>{if(G(p.currentTarget))return p.preventDefault();p.preventDefault(),y()}),d=g(p=>{p.key===h.Space?(p.preventDefault(),y()):p.key===h.Enter&&xe(p.currentTarget)}),x=g(p=>p.preventDefault()),m=f.exports.useMemo(()=>({checked:r}),[r]),l={id:s,ref:O,role:"switch",type:B(e,v),tabIndex:0,"aria-checked":r,"aria-labelledby":c==null?void 0:c.labelledby,"aria-describedby":c==null?void 0:c.describedby,onClick:b,onKeyUp:d,onKeyPress:x};return i.createElement(i.Fragment,null,n!=null&&r&&i.createElement(V,{features:q.Hidden,...z({as:"input",type:"checkbox",hidden:!0,readOnly:!0,checked:r,name:n,value:a})}),D({ourProps:l,theirProps:u,slot:m,defaultTag:je,name:"Switch"}))}),Qe=Object.assign(Me,{Group:Fe,Label:de,Description:se});var C=new Map;C.set("bold",function(e){return i.createElement(i.Fragment,null,i.createElement("circle",{cx:"128",cy:"128",r:"96",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}),i.createElement("line",{x1:"88",y1:"128",x2:"168",y2:"128",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}),i.createElement("line",{x1:"128",y1:"88",x2:"128",y2:"168",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}))});C.set("duotone",function(e){return i.createElement(i.Fragment,null,i.createElement("circle",{cx:"128",cy:"128",r:"96",opacity:"0.2"}),i.createElement("circle",{cx:"128",cy:"128",r:"96",fill:"none",stroke:e,strokeMiterlimit:"10",strokeWidth:"16"}),i.createElement("line",{x1:"88",y1:"128",x2:"168",y2:"128",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),i.createElement("line",{x1:"128",y1:"88",x2:"128",y2:"168",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}))});C.set("fill",function(){return i.createElement(i.Fragment,null,i.createElement("path",{d:"M128,24A104,104,0,1,0,232,128,104.2,104.2,0,0,0,128,24Zm40,112H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32a8,8,0,0,1,0,16Z"}))});C.set("light",function(e){return i.createElement(i.Fragment,null,i.createElement("circle",{cx:"128",cy:"128",r:"96",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}),i.createElement("line",{x1:"88",y1:"128",x2:"168",y2:"128",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}),i.createElement("line",{x1:"128",y1:"88",x2:"128",y2:"168",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}))});C.set("thin",function(e){return i.createElement(i.Fragment,null,i.createElement("circle",{cx:"128",cy:"128",r:"96",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"}),i.createElement("line",{x1:"88",y1:"128",x2:"168",y2:"128",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"}),i.createElement("line",{x1:"128",y1:"88",x2:"128",y2:"168",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"}))});C.set("regular",function(e){return i.createElement(i.Fragment,null,i.createElement("circle",{cx:"128",cy:"128",r:"96",fill:"none",stroke:e,strokeMiterlimit:"10",strokeWidth:"16"}),i.createElement("line",{x1:"88",y1:"128",x2:"168",y2:"128",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),i.createElement("line",{x1:"128",y1:"88",x2:"128",y2:"168",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}))});var $e=function(o,r){return le(o,r,C)},J=f.exports.forwardRef(function(e,o){return i.createElement(ie,Object.assign({ref:o},e,{renderPath:$e}))});J.displayName="PlusCircle";const He=J,Ue=({id:e,allowEnter:o,value:r,onChange:t,hasError:n,maxLength:a,focus:u,placeholder:s,numeric:c,onEnter:v,resetValueBtn:O})=>{const y=d=>{!o&&d.code==="Enter"&&d.preventDefault(),d.code==="Enter"&&v&&v()},b=d=>{const x=a?d.target.value.slice(0,a):d.target.value;if(x){t(c?+x?+x:0:x);return}t(null)};return i.createElement("div",{className:"relative"},i.createElement("input",{id:e,onKeyDown:d=>y(d),autoComplete:"off",className:`text-input ${n?"border-wine-200 bg-wine-25 text-wine-900 placeholder:text-transparent":""}`,onChange:d=>b(d),autoFocus:u,value:r!=null?r:"",placeholder:s,inputMode:c?"decimal":"text",type:c?"number":"text"}),O&&r&&i.createElement("div",{className:"absolute right-1 top-0 flex h-full items-center"},i.createElement("button",{tabIndex:-1,onClick:()=>t(null),type:"button","aria-label":"Fjern verdi",className:"text-less-muted rounded p-1 hover:opacity-80 dark:hover:bg-gray-800 dark:hover:text-white"},i.createElement(ce,{size:"1.1rem",weight:"bold"}))))};export{He as P,Ue as T,Z as i,Ke as r,Qe as u};