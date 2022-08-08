import{H as P,_ as R,r as a,q as Se,t as Le,v as k,y as F,w as se,x as _,z as Y,A as ee,B as te,R as u,F as ge,G as Ie,J as N,K as Ne,M as q,N as Ee,O as Oe,P as Be,Q as O,S as pe,U as He,V as me,W as je,Y as We,Z as Ye,$ as be,a0 as re,a1 as Ge,a2 as Ve,a3 as ze,a4 as Ue,a5 as _e,a6 as qe,a7 as Je,a8 as Ke,a9 as Qe,aa as Xe,m as ve}from"./index.f8ab7f74.js";let Ze="div";var z=(e=>(e[e.None=1]="None",e[e.Focusable=2]="Focusable",e[e.Hidden=4]="Hidden",e))(z||{});let ne=P(function(e,r){let{features:t=1,...n}=e,o={ref:r,"aria-hidden":(t&2)===2?!0:void 0,style:{position:"absolute",width:1,height:1,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0",...(t&4)===4&&(t&2)!==2&&{display:"none"}}};return R({ourProps:o,theirProps:n,slot:{},defaultTag:Ze,name:"Hidden"})});var oe=(e=>(e[e.Forwards=0]="Forwards",e[e.Backwards=1]="Backwards",e))(oe||{});function et(){let e=a.exports.useRef(0);return Se("keydown",r=>{r.key==="Tab"&&(e.current=r.shiftKey?1:0)},!0),e}function ue(e,r,t,n){let o=Le(t);a.exports.useEffect(()=>{e=e!=null?e:window;function l(i){o.current(i)}return e.addEventListener(r,l,n),()=>e.removeEventListener(r,l,n)},[e,r,n])}function ye(e,r){let t=a.exports.useRef([]),n=k(e);a.exports.useEffect(()=>{for(let[o,l]of r.entries())if(t.current[o]!==l){let i=n(r);return t.current=r,i}},[n,...r])}let tt="div";var we=(e=>(e[e.None=1]="None",e[e.InitialFocus=2]="InitialFocus",e[e.TabLock=4]="TabLock",e[e.FocusLock=8]="FocusLock",e[e.RestoreFocus=16]="RestoreFocus",e[e.All=30]="All",e))(we||{});let j=Object.assign(P(function(e,r){let t=a.exports.useRef(null),n=F(t,r),{initialFocus:o,containers:l,features:i=30,...s}=e;se()||(i=1);let c=_(t);rt({ownerDocument:c},Boolean(i&16));let v=nt({ownerDocument:c,container:t,initialFocus:o},Boolean(i&2));ot({ownerDocument:c,container:t,containers:l,previousActiveElement:v},Boolean(i&8));let f=et(),p=k(()=>{let E=t.current;!E||Y(f.current,{[oe.Forwards]:()=>ee(E,te.First),[oe.Backwards]:()=>ee(E,te.Last)})}),D={ref:n};return u.createElement(u.Fragment,null,Boolean(i&4)&&u.createElement(ne,{as:"button",type:"button",onFocus:p,features:z.Focusable}),R({ourProps:D,theirProps:s,defaultTag:tt,name:"FocusTrap"}),Boolean(i&4)&&u.createElement(ne,{as:"button",type:"button",onFocus:p,features:z.Focusable}))}),{features:we});function rt({ownerDocument:e},r){let t=a.exports.useRef(null);ue(e==null?void 0:e.defaultView,"focusout",o=>{!r||t.current||(t.current=o.target)},!0),ye(()=>{r||((e==null?void 0:e.activeElement)===(e==null?void 0:e.body)&&N(t.current),t.current=null)},[r]);let n=a.exports.useRef(!1);a.exports.useEffect(()=>(n.current=!1,()=>{n.current=!0,ge(()=>{!n.current||(N(t.current),t.current=null)})}),[])}function nt({ownerDocument:e,container:r,initialFocus:t},n){let o=a.exports.useRef(null);return ye(()=>{if(!n)return;let l=r.current;if(!l)return;let i=e==null?void 0:e.activeElement;if(t!=null&&t.current){if((t==null?void 0:t.current)===i){o.current=i;return}}else if(l.contains(i)){o.current=i;return}t!=null&&t.current?N(t.current):ee(l,te.First)===Ne.Error&&console.warn("There are no focusable elements inside the <FocusTrap />"),o.current=e==null?void 0:e.activeElement},[n]),o}function ot({ownerDocument:e,container:r,containers:t,previousActiveElement:n},o){let l=Ie();ue(e==null?void 0:e.defaultView,"focus",i=>{if(!o||!l.current)return;let s=new Set(t==null?void 0:t.current);s.add(r);let c=n.current;if(!c)return;let v=i.target;v&&v instanceof HTMLElement?at(s,v)?(n.current=v,N(v)):(i.preventDefault(),i.stopPropagation(),N(c)):N(n.current)},!0)}function at(e,r){var t;for(let n of e)if((t=n.current)!=null&&t.contains(r))return!0;return!1}let L=new Set,T=new Map;function xe(e){e.setAttribute("aria-hidden","true"),e.inert=!0}function he(e){let r=T.get(e);!r||(r["aria-hidden"]===null?e.removeAttribute("aria-hidden"):e.setAttribute("aria-hidden",r["aria-hidden"]),e.inert=r.inert)}function it(e,r=!0){q(()=>{if(!r||!e.current)return;let t=e.current,n=Ee(t);if(n){L.add(t);for(let o of T.keys())o.contains(t)&&(he(o),T.delete(o));return n.querySelectorAll("body > *").forEach(o=>{if(o instanceof HTMLElement){for(let l of L)if(o.contains(l))return;L.size===1&&(T.set(o,{"aria-hidden":o.getAttribute("aria-hidden"),inert:o.inert}),xe(o))}}),()=>{if(L.delete(t),L.size>0)n.querySelectorAll("body > *").forEach(o=>{if(o instanceof HTMLElement&&!T.has(o)){for(let l of L)if(o.contains(l))return;T.set(o,{"aria-hidden":o.getAttribute("aria-hidden"),inert:o.inert}),xe(o)}});else for(let o of T.keys())he(o),T.delete(o)}}},[r])}let Ce=a.exports.createContext(!1);function lt(){return a.exports.useContext(Ce)}function ae(e){return u.createElement(Ce.Provider,{value:e.force},e.children)}function st(e){let r=lt(),t=a.exports.useContext(Pe),n=_(e),[o,l]=a.exports.useState(()=>{if(!r&&t!==null||typeof window>"u")return null;let i=n==null?void 0:n.getElementById("headlessui-portal-root");if(i)return i;if(n===null)return null;let s=n.createElement("div");return s.setAttribute("id","headlessui-portal-root"),n.body.appendChild(s)});return a.exports.useEffect(()=>{o!==null&&(n!=null&&n.body.contains(o)||n==null||n.body.appendChild(o))},[o,n]),a.exports.useEffect(()=>{r||t!==null&&l(t.current)},[t,l,r]),o}let ut=a.exports.Fragment,ct=P(function(e,r){let t=e,n=a.exports.useRef(null),o=F(Oe(f=>{n.current=f}),r),l=_(n),i=st(n),[s]=a.exports.useState(()=>{var f;return typeof window>"u"?null:(f=l==null?void 0:l.createElement("div"))!=null?f:null}),c=se(),v=a.exports.useRef(!1);return q(()=>{if(v.current=!1,!(!i||!s))return i.contains(s)||(s.setAttribute("data-headlessui-portal",""),i.appendChild(s)),()=>{v.current=!0,ge(()=>{var f;!v.current||!i||!s||(i.removeChild(s),i.childNodes.length<=0&&((f=i.parentElement)==null||f.removeChild(i)))})}},[i,s]),c?!i||!s?null:Be.exports.createPortal(R({ourProps:{ref:o},theirProps:t,defaultTag:ut,name:"Portal"}),s):null}),dt=a.exports.Fragment,Pe=a.exports.createContext(null),ft=P(function(e,r){let{target:t,...n}=e,o={ref:F(r)};return u.createElement(Pe.Provider,{value:t},R({ourProps:o,theirProps:n,defaultTag:dt,name:"Popover.Group"}))}),ie=Object.assign(ct,{Group:ft}),Re=a.exports.createContext(null);function $e(){let e=a.exports.useContext(Re);if(e===null){let r=new Error("You used a <Description /> component, but it is not inside a relevant parent.");throw Error.captureStackTrace&&Error.captureStackTrace(r,$e),r}return e}function pt(){let[e,r]=a.exports.useState([]);return[e.length>0?e.join(" "):void 0,a.exports.useMemo(()=>function(t){let n=k(l=>(r(i=>[...i,l]),()=>r(i=>{let s=i.slice(),c=s.indexOf(l);return c!==-1&&s.splice(c,1),s}))),o=a.exports.useMemo(()=>({register:n,slot:t.slot,name:t.name,props:t.props}),[n,t.slot,t.name,t.props]);return u.createElement(Re.Provider,{value:o},t.children)},[r])]}let mt="p",vt=P(function(e,r){let t=$e(),n=`headlessui-description-${O()}`,o=F(r);q(()=>t.register(n),[n,t.register]);let l=e,i={ref:o,...t.props,id:n};return R({ourProps:i,theirProps:l,slot:t.slot||{},defaultTag:mt,name:t.name||"Description"})}),ce=a.exports.createContext(()=>{});ce.displayName="StackContext";var le=(e=>(e[e.Add=0]="Add",e[e.Remove=1]="Remove",e))(le||{});function xt(){return a.exports.useContext(ce)}function ht({children:e,onUpdate:r,type:t,element:n}){let o=xt(),l=k((...i)=>{r==null||r(...i),o(...i)});return q(()=>(l(0,t,n),()=>l(1,t,n)),[l,t,n]),u.createElement(ce.Provider,{value:l},e)}var gt=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(gt||{}),Et=(e=>(e[e.SetTitleId=0]="SetTitleId",e))(Et||{});let bt={[0](e,r){return e.titleId===r.id?e:{...e,titleId:r.id}}},U=a.exports.createContext(null);U.displayName="DialogContext";function G(e){let r=a.exports.useContext(U);if(r===null){let t=new Error(`<${e} /> is missing a parent <Dialog /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(t,G),t}return r}function yt(e,r){return Y(r.type,bt,e,r)}let wt="div",Ct=pe.RenderStrategy|pe.Static,Pt=P(function(e,r){let{open:t,onClose:n,initialFocus:o,__demoMode:l=!1,...i}=e,[s,c]=a.exports.useState(0),v=He();t===void 0&&v!==null&&(t=Y(v,{[me.Open]:!0,[me.Closed]:!1}));let f=a.exports.useRef(new Set),p=a.exports.useRef(null),D=F(p,r),E=a.exports.useRef(null),d=_(p),b=e.hasOwnProperty("open")||v!==null,y=e.hasOwnProperty("onClose");if(!b&&!y)throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");if(!b)throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");if(!y)throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");if(typeof t!="boolean")throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${t}`);if(typeof n!="function")throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${n}`);let h=t?0:1,[w,B]=a.exports.useReducer(yt,{titleId:null,descriptionId:null,panelRef:a.exports.createRef()}),$=k(()=>n(!1)),V=k(g=>B({type:0,id:g})),A=se()?l?!1:h===0:!1,M=s>1,x=a.exports.useContext(U)!==null,S=M?"parent":"leaf";it(p,M?A:!1),je(()=>{var g,C;return[...Array.from((g=d==null?void 0:d.querySelectorAll("body > *, [data-headlessui-portal]"))!=null?g:[]).filter(m=>!(!(m instanceof HTMLElement)||m.contains(E.current)||w.panelRef.current&&m.contains(w.panelRef.current))),(C=w.panelRef.current)!=null?C:p.current]},$,A&&!M),ue(d==null?void 0:d.defaultView,"keydown",g=>{g.defaultPrevented||g.key===We.Escape&&h===0&&(M||(g.preventDefault(),g.stopPropagation(),$()))}),a.exports.useEffect(()=>{var g;if(h!==0||x)return;let C=Ee(p);if(!C)return;let m=C.documentElement,H=(g=C.defaultView)!=null?g:window,De=m.style.overflow,Te=m.style.paddingRight,fe=H.innerWidth-m.clientWidth;if(m.style.overflow="hidden",fe>0){let Ae=m.clientWidth-m.offsetWidth,Me=fe-Ae;m.style.paddingRight=`${Me}px`}return()=>{m.style.overflow=De,m.style.paddingRight=Te}},[h,x]),a.exports.useEffect(()=>{if(h!==0||!p.current)return;let g=new IntersectionObserver(C=>{for(let m of C)m.boundingClientRect.x===0&&m.boundingClientRect.y===0&&m.boundingClientRect.width===0&&m.boundingClientRect.height===0&&$()});return g.observe(p.current),()=>g.disconnect()},[h,p,$]);let[J,K]=pt(),Q=`headlessui-dialog-${O()}`,X=a.exports.useMemo(()=>[{dialogState:h,close:$,setTitleId:V},w],[h,w,$,V]),de=a.exports.useMemo(()=>({open:h===0}),[h]),Fe={ref:D,id:Q,role:"dialog","aria-modal":h===0?!0:void 0,"aria-labelledby":w.titleId,"aria-describedby":J};return u.createElement(ht,{type:"Dialog",element:p,onUpdate:k((g,C,m)=>{C==="Dialog"&&Y(g,{[le.Add](){f.current.add(m),c(H=>H+1)},[le.Remove](){f.current.add(m),c(H=>H-1)}})})},u.createElement(ae,{force:!0},u.createElement(ie,null,u.createElement(U.Provider,{value:X},u.createElement(ie.Group,{target:p},u.createElement(ae,{force:!1},u.createElement(K,{slot:de,name:"Dialog.Description"},u.createElement(j,{initialFocus:o,containers:f,features:A?Y(S,{parent:j.features.RestoreFocus,leaf:j.features.All&~j.features.FocusLock}):j.features.None},R({ourProps:Fe,theirProps:i,slot:de,defaultTag:wt,features:Ct,visible:h===0,name:"Dialog"})))))))),u.createElement(ne,{features:z.Hidden,ref:E}))}),Rt="div",$t=P(function(e,r){let[{dialogState:t,close:n}]=G("Dialog.Overlay"),o=F(r),l=`headlessui-dialog-overlay-${O()}`,i=k(c=>{if(c.target===c.currentTarget){if(Ye(c.currentTarget))return c.preventDefault();c.preventDefault(),c.stopPropagation(),n()}}),s=a.exports.useMemo(()=>({open:t===0}),[t]);return R({ourProps:{ref:o,id:l,"aria-hidden":!0,onClick:i},theirProps:e,slot:s,defaultTag:Rt,name:"Dialog.Overlay"})}),kt="div",Ft=P(function(e,r){let[{dialogState:t},n]=G("Dialog.Backdrop"),o=F(r),l=`headlessui-dialog-backdrop-${O()}`;a.exports.useEffect(()=>{if(n.panelRef.current===null)throw new Error("A <Dialog.Backdrop /> component is being used, but a <Dialog.Panel /> component is missing.")},[n.panelRef]);let i=a.exports.useMemo(()=>({open:t===0}),[t]);return u.createElement(ae,{force:!0},u.createElement(ie,null,R({ourProps:{ref:o,id:l,"aria-hidden":!0},theirProps:e,slot:i,defaultTag:kt,name:"Dialog.Backdrop"})))}),Dt="div",Tt=P(function(e,r){let[{dialogState:t},n]=G("Dialog.Panel"),o=F(r,n.panelRef),l=`headlessui-dialog-panel-${O()}`,i=a.exports.useMemo(()=>({open:t===0}),[t]),s=k(c=>{c.stopPropagation()});return R({ourProps:{ref:o,id:l,onClick:s},theirProps:e,slot:i,defaultTag:Dt,name:"Dialog.Panel"})}),At="h2",Mt=P(function(e,r){let[{dialogState:t,setTitleId:n}]=G("Dialog.Title"),o=`headlessui-dialog-title-${O()}`,l=F(r);a.exports.useEffect(()=>(n(o),()=>n(null)),[o,n]);let i=a.exports.useMemo(()=>({open:t===0}),[t]);return R({ourProps:{ref:l,id:o},theirProps:e,slot:i,defaultTag:At,name:"Dialog.Title"})}),W=Object.assign(Pt,{Backdrop:Ft,Panel:Tt,Overlay:$t,Title:Mt,Description:vt});function ke(){var e=a.exports.useRef(!1);return be(function(){return e.current=!0,function(){e.current=!1}},[]),e}function St(){var e=ke(),r=re(a.exports.useState(0),2),t=r[0],n=r[1],o=a.exports.useCallback(function(){e.current&&n(t+1)},[t]),l=a.exports.useCallback(function(){return Ge.postRender(o)},[o]);return[l,t]}var Z=function(e){var r=e.children,t=e.initial,n=e.isPresent,o=e.onExitComplete,l=e.custom,i=e.presenceAffectsLayout,s=Ve(Lt),c=ze(),v=a.exports.useMemo(function(){return{id:c,initial:t,isPresent:n,custom:l,onExitComplete:function(f){var p,D;s.set(f,!0);try{for(var E=Ue(s.values()),d=E.next();!d.done;d=E.next()){var b=d.value;if(!b)return}}catch(y){p={error:y}}finally{try{d&&!d.done&&(D=E.return)&&D.call(E)}finally{if(p)throw p.error}}o==null||o()},register:function(f){return s.set(f,!1),function(){return s.delete(f)}}}},i?void 0:[n]);return a.exports.useMemo(function(){s.forEach(function(f,p){return s.set(p,!1)})},[n]),a.exports.useEffect(function(){!n&&!s.size&&(o==null||o())},[n]),a.exports.createElement(_e.Provider,{value:v},r)};function Lt(){return new Map}var I=function(e){return e.key||""};function It(e,r){e.forEach(function(t){var n=I(t);r.set(n,t)})}function Nt(e){var r=[];return a.exports.Children.forEach(e,function(t){a.exports.isValidElement(t)&&r.push(t)}),r}var Ot=function(e){var r=e.children,t=e.custom,n=e.initial,o=n===void 0?!0:n,l=e.onExitComplete,i=e.exitBeforeEnter,s=e.presenceAffectsLayout,c=s===void 0?!0:s,v=re(St(),1),f=v[0],p=a.exports.useContext(qe).forceRender;p&&(f=p);var D=ke(),E=Nt(r),d=E,b=new Set,y=a.exports.useRef(d),h=a.exports.useRef(new Map).current,w=a.exports.useRef(!0);if(be(function(){w.current=!1,It(E,h),y.current=d}),Je(function(){w.current=!0,h.clear(),b.clear()}),w.current)return a.exports.createElement(a.exports.Fragment,null,d.map(function(x){return a.exports.createElement(Z,{key:I(x),isPresent:!0,initial:o?void 0:!1,presenceAffectsLayout:c},x)}));d=Ke([],re(d),!1);for(var B=y.current.map(I),$=E.map(I),V=B.length,A=0;A<V;A++){var M=B[A];$.indexOf(M)===-1&&b.add(M)}return i&&b.size&&(d=[]),b.forEach(function(x){if($.indexOf(x)===-1){var S=h.get(x);if(!!S){var J=B.indexOf(x),K=function(){h.delete(x),b.delete(x);var Q=y.current.findIndex(function(X){return X.key===x});if(y.current.splice(Q,1),!b.size){if(y.current=E,D.current===!1)return;f(),l&&l()}};d.splice(J,0,a.exports.createElement(Z,{key:I(S),isPresent:!1,onExitComplete:K,custom:t,presenceAffectsLayout:c},S))}}}),d=d.map(function(x){var S=x.key;return b.has(S)?x:a.exports.createElement(Z,{key:I(x),isPresent:!0,presenceAffectsLayout:c},x)}),Qe!=="production"&&i&&d.length>1&&console.warn("You're attempting to animate multiple children within AnimatePresence, but its exitBeforeEnter prop is set to true. This will lead to odd visual behaviour."),a.exports.createElement(a.exports.Fragment,null,b.size?d:d.map(function(x){return a.exports.cloneElement(x)}))};const jt=({loading:e,onClick:r,children:t,className:n,disabled:o,loadingText:l,isPrimary:i=!0,type:s="button"})=>u.createElement("button",{type:s,onClick:r,disabled:o||e,className:`${i?"btn-primary":"btn-white"} disabled-btn inline-flex h-10 items-center gap-2 ${n||""}`},e?u.createElement(u.Fragment,null,u.createElement(Xe,{height:"1.5rem",stroke:"rgb(55 65 81)",width:"1.5rem",strokeWidth:4}),l):t),Wt=({isOpen:e,setIsOpen:r,description:t,title:n,children:o,xl:l})=>{const i=a.exports.useRef(null);return a.exports.useEffect(()=>{i.current&&i.current.focus()},[i]),u.createElement(Ot,null,e&&u.createElement(W,{as:"div",className:"relative z-10",open:e,onClose:r},u.createElement(W.Overlay,{as:ve.div,initial:{opacity:0},animate:{opacity:1,transition:{duration:.15,ease:"easeInOut"}},exit:{opacity:0,transition:{duration:.15,ease:"easeIn"}},className:"fixed inset-0 bg-black/30 backdrop-blur dark:bg-black/60","aria-hidden":"true"}),u.createElement("div",{className:"fixed inset-0 overflow-y-auto"},u.createElement("div",{className:"flex min-h-full items-center justify-center p-4"},u.createElement(W.Panel,{as:ve.div,initial:{opacity:0,scale:.75},animate:{opacity:1,scale:1,transition:{ease:"easeOut",duration:.2}},exit:{scale:.75,opacity:0,transition:{ease:"easeIn",duration:.15}},className:`mx-auto w-full overflow-hidden align-middle ${l?"max-w-2xl":"max-w-md"}  rounded bg-white p-4 shadow-lg dark:border dark:border-gray-700 dark:bg-gray-900 dark:shadow-2xl`},u.createElement(W.Title,{as:"h3",className:"mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-gray-50"},n),u.createElement(W.Description,{className:"mb-4 border-b pb-2 text-sm text-slate-600 dark:border-gray-700 dark:text-gray-300"},t),u.createElement("div",{tabIndex:0,ref:i},o,u.createElement("button",{className:"btn-white mt-4 h-10 rounded-full",onClick:()=>r(!1)},"Tilbake")))))))},Yt=(e,r=!1)=>{if(!e||typeof e.getMonth!="function")return"";const t=["Januar","Februar","Mars","April","Mai","Juni","Juli","August","September","Oktober","November","Desember"],n=r?t[e.getMonth()].substring(0,3):t[e.getMonth()];return`${e.getDate()}. ${n} ${e.getFullYear()}`},Gt=e=>e?`${e*100} cl`:"",Vt=e=>e?`${e}%`:"",zt=e=>e==null||isNaN(e)?"0 kr":e.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1.")+" kr",Ut=(e,r)=>e?`https://bilder.vinmonopolet.no/cache/${r}x${r}-0/${e}-1.jpg`:Bt,_t=e=>`https://www.vinmonopolet.no/p/${e}`,Bt="https://res.cloudinary.com/djfkqypit/image/upload/v1655034560/bottle_li9ari.png";export{Ot as A,ue as E,vt as F,jt as L,Wt as M,Vt as a,zt as b,Yt as c,_t as d,oe as e,Gt as f,ne as h,pt as k,et as n,Bt as p,z as s,Ut as v};