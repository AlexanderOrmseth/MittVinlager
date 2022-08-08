import{R as t,r as i,I as me,a as fe,a8 as Q,P as pe,m as ve,ao as ge,ap as he,L as ke}from"./index.f0d72e0c.js";import{D as Ee}from"./DeleteWineModal.0adefafa.js";import{D as xe,W as ye}from"./DatePicker.b98ad4f3.js";import{p as Le,v as we,M as Ce,L as be,d as Se}from"./vinmonopolet.a7605b4a.js";import{S as J}from"./Spinner.7090200c.js";import{T as V,C as De}from"./Time.5f79b4f1.js";import{T as _}from"./Trash.esm.277657a0.js";import{A as Te}from"./AsideDisclosure.c80768d5.js";import{E as ee}from"./ErrorBox.ede9c3d3.js";import{I as q}from"./InfoBox.de115390.js";import{u as We}from"./useFetchSingleWine.9a847435.js";import{T as Ne}from"./Title.a102e97e.js";import{L as je}from"./Link.esm.c3d16cfd.js";import"./Score.8c4f5bc1.js";import"./Info.esm.667652c7.js";var b=new Map;b.set("bold",function(e){return t.createElement(t.Fragment,null,t.createElement("path",{d:"M96,216H48a8,8,0,0,1-8-8V163.3a7.9,7.9,0,0,1,2.3-5.6l120-120a8,8,0,0,1,11.4,0l44.6,44.6a8,8,0,0,1,0,11.4Z",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}),t.createElement("line",{x1:"136",y1:"64",x2:"192",y2:"120",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}),t.createElement("line",{x1:"44",y1:"156",x2:"104",y2:"216",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}),t.createElement("line",{x1:"216",y1:"216",x2:"96",y2:"216",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}),t.createElement("line",{x1:"164",y1:"92",x2:"72",y2:"184",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}))});b.set("duotone",function(e){return t.createElement(t.Fragment,null,t.createElement("path",{d:"M192,120,136,64l26.3-26.3a8,8,0,0,1,11.4,0l44.6,44.6a8,8,0,0,1,0,11.4Z",opacity:"0.2"}),t.createElement("path",{d:"M96,216H48a8,8,0,0,1-8-8V163.3a7.9,7.9,0,0,1,2.3-5.6l120-120a8,8,0,0,1,11.4,0l44.6,44.6a8,8,0,0,1,0,11.4Z",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),t.createElement("line",{x1:"136",y1:"64",x2:"192",y2:"120",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),t.createElement("polyline",{points:"216 216 96 216 40.5 160.5",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),t.createElement("line",{x1:"164",y1:"92",x2:"68",y2:"188",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}))});b.set("fill",function(){return t.createElement(t.Fragment,null,t.createElement("path",{d:"M224,76.7,179.3,32a15.9,15.9,0,0,0-22.6,0L36.7,152a15.4,15.4,0,0,0-3.6,5.5l-.2.5a16,16,0,0,0-.9,5.3V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.3L224,99.3A16.1,16.1,0,0,0,224,76.7Zm-80-9.4L160.7,84,68,176.7,51.3,160ZM48,208V179.3L76.7,208Zm48-3.3L79.3,188,172,95.3,188.7,112Z"}))});b.set("light",function(e){return t.createElement(t.Fragment,null,t.createElement("path",{d:"M96,216H48a8,8,0,0,1-8-8V163.3a7.9,7.9,0,0,1,2.3-5.6l120-120a8,8,0,0,1,11.4,0l44.6,44.6a8,8,0,0,1,0,11.4Z",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}),t.createElement("line",{x1:"136",y1:"64",x2:"192",y2:"120",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}),t.createElement("polyline",{points:"216 216 96 216 40.5 160.5",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}),t.createElement("line",{x1:"164",y1:"92",x2:"68",y2:"188",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}))});b.set("thin",function(e){return t.createElement(t.Fragment,null,t.createElement("path",{d:"M96,216H48a8,8,0,0,1-8-8V163.3a7.9,7.9,0,0,1,2.3-5.6l120-120a8,8,0,0,1,11.4,0l44.6,44.6a8,8,0,0,1,0,11.4Z",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"}),t.createElement("line",{x1:"136",y1:"64",x2:"192",y2:"120",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"}),t.createElement("polyline",{points:"216 216 96 216 40.5 160.5",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"}),t.createElement("line",{x1:"164",y1:"92",x2:"68",y2:"188",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"}))});b.set("regular",function(e){return t.createElement(t.Fragment,null,t.createElement("path",{d:"M96,216H48a8,8,0,0,1-8-8V163.3a7.9,7.9,0,0,1,2.3-5.6l120-120a8,8,0,0,1,11.4,0l44.6,44.6a8,8,0,0,1,0,11.4Z",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),t.createElement("line",{x1:"136",y1:"64",x2:"192",y2:"120",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),t.createElement("polyline",{points:"216 216 96 216 40.5 160.5",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),t.createElement("line",{x1:"164",y1:"92",x2:"68",y2:"188",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}))});var ze=function(n,o){return fe(n,o,b)},te=i.exports.forwardRef(function(e,n){return t.createElement(me,Object.assign({ref:n},e,{renderPath:ze}))});te.displayName="PencilLine";const Ie=te;(function(){if(!(typeof window>"u"||typeof document>"u"||typeof HTMLElement>"u")){var e=!1;try{var n=document.createElement("div");n.addEventListener("focus",function(a){a.preventDefault(),a.stopPropagation()},!0),n.focus(Object.defineProperty({},"preventScroll",{get:function(){if(navigator&&typeof navigator.userAgent<"u"&&navigator.userAgent&&navigator.userAgent.match(/Edge\/1[7-8]/))return e=!1;e=!0}}))}catch{}if(HTMLElement.prototype.nativeFocus===void 0&&!e){HTMLElement.prototype.nativeFocus=HTMLElement.prototype.focus;var o=function(a){for(var r=a.parentNode,s=[],c=document.scrollingElement||document.documentElement;r&&r!==c;)(r.offsetHeight<r.scrollHeight||r.offsetWidth<r.scrollWidth)&&s.push([r,r.scrollTop,r.scrollLeft]),r=r.parentNode;return r=c,s.push([r,r.scrollTop,r.scrollLeft]),s},l=function(a){for(var r=0;r<a.length;r++)a[r][0].scrollTop=a[r][1],a[r][0].scrollLeft=a[r][2];a=[]},d=function(a){if(a&&a.preventScroll){var r=o(this);this.nativeFocus(),typeof setTimeout=="function"?setTimeout(function(){l(r)},0):l(r)}else this.nativeFocus()};HTMLElement.prototype.focus=d}}})();var ne=function(e){return"".concat(e,"ms")},Me=function(e){var n=e.height,o=e.innerHeight,l=e.innerWidth,d=e.width,a=e.zoomMargin,r=l/(d+a),s=o/(n+a),c=Math.min(r,s);return c},Be=function(e){var n=e.height,o=e.innerHeight,l=e.innerWidth,d=e.isLoaded,a=e.isUnloading,r=e.left,s=e.originalTransform,c=e.top,v=e.transitionDuration,m=e.width,g=e.zoomMargin,h=ne(v);if(!d||a){var x=Q(["scale(1)","translate(0, 0)"],s?[s]:[],!0).join(" ");return{height:n,left:r,top:c,transform:x,WebkitTransform:x,transitionDuration:h,width:m}}var k=Me({height:n,innerWidth:l,innerHeight:o,width:m,zoomMargin:g}),f=l/2,u=o/2,S=r+m/2,y=c+n/2,C=(f-S)/k,W=(u-y)/k,L=Q(["scale(".concat(k,")"),"translate(".concat(C,"px, ").concat(W,"px)")],s?[s]:[],!0).join(" ");return{height:n,left:r,top:c,transform:L,WebkitTransform:L,transitionDuration:h,width:m}},Ze=function(e){var n=e.isLoaded,o=e.isUnloading,l=e.overlayBgColorEnd,d=e.overlayBgColorStart,a=e.transitionDuration,r=e.zoomZindex,s={backgroundColor:d,transitionDuration:ne(a),zIndex:r};return n&&!o&&(s.backgroundColor=l),s},Ae={getBoundingClientRect:function(){return{height:0,left:0,top:0,width:0}},style:{transform:null}},He=function(e){i.exports.useEffect(e,[])},Fe=function(e){var n=i.exports.useRef(e);n.current=e,He(function(){return function(){return n.current()}})},Re=function(e){var n=i.exports.useRef(0),o=i.exports.useState(e),l=o[0],d=o[1],a=i.exports.useCallback(function(r){cancelAnimationFrame(n.current),n.current=requestAnimationFrame(function(){d(r)})},[]);return Fe(function(){cancelAnimationFrame(n.current)}),[l,a]},Pe=function(e,n){e===void 0&&(e=1/0),n===void 0&&(n=1/0);var o=typeof window<"u",l=Re({width:o?window.innerWidth:e,height:o?window.innerHeight:n}),d=l[0],a=l[1];return i.exports.useEffect(function(){if(o){var r=function(){a({width:window.innerWidth,height:window.innerHeight})};return window.addEventListener("resize",r),function(){window.removeEventListener("resize",r)}}},[o,a]),d};function $(e){var n=i.exports.useRef();return i.exports.useEffect(function(){n.current=e}),n.current}var Ue=function(e){var n=e.children,o=e.closeText,l=o===void 0?"Unzoom Image":o,d=e.isActive,a=e.onLoad,r=e.onUnload,s=e.onZoomChange,c=e.overlayBgColorEnd,v=c===void 0?"rgba(255, 255, 255, 0.95)":c,m=e.overlayBgColorStart,g=m===void 0?"rgba(255, 255, 255, 0)":m,h=e.parentRef,x=e.portalEl,k=x===void 0?document.body:x,f=e.scrollableEl,u=f===void 0?window:f,S=e.transitionDuration,y=S===void 0?300:S,C=e.zoomMargin,W=C===void 0?0:C,L=e.zoomZindex,A=L===void 0?2147483647:L,D=i.exports.useRef(null),H=i.exports.useState(0),j=H[1],N=i.exports.useState(d),E=N[0],z=N[1],I=i.exports.useState(!1),w=I[0],M=I[1],B=i.exports.useState(!1),T=B[0],K=B[1],X=$(E),F=$(d),R=$(w),Y=Pe(),re=Y.width,oe=Y.height,ae=i.exports.useCallback(function(p){p.preventDefault(),s&&s(!1)},[s]),P=i.exports.useCallback(function(p){E&&(p.key==="Escape"||p.keyCode===27)&&(p.stopPropagation(),s&&s(!1))},[E,s]),U=i.exports.useCallback(function(){j(function(p){return p+1}),!T&&s&&s(!1)},[T,s]);i.exports.useEffect(function(){return document.addEventListener("keydown",P),function(){document.removeEventListener("keydown",P)}},[P]),i.exports.useEffect(function(){var p;return(p=u==null?void 0:u.addEventListener)===null||p===void 0||p.call(u,"scroll",U),function(){var O;(O=u==null?void 0:u.removeEventListener)===null||O===void 0||O.call(u,"scroll",U)}},[U,u]),i.exports.useEffect(function(){!X&&E&&(M(!0),D.current&&D.current.focus({preventScroll:!0}))},[E,X]),i.exports.useEffect(function(){F&&!d&&K(!0),!F&&d&&z(!0)},[d,F]),i.exports.useEffect(function(){var p;return T&&(p=setTimeout(function(){M(!1),z(!1),K(!1)},y)),function(){clearTimeout(p)}},[T,y]),i.exports.useEffect(function(){!R&&w&&a(),R&&!w&&r()},[w,a,r,R]);var G=h.current||Ae,Z=G.getBoundingClientRect(),ie=Z.height,le=Z.left,se=Z.top,de=Z.width,ue=Ze({isLoaded:w,isUnloading:T,overlayBgColorEnd:v,overlayBgColorStart:g,transitionDuration:y,zoomZindex:A}),ce=Be({height:ie,isLoaded:w,innerHeight:oe,innerWidth:re,isUnloading:T,left:le,originalTransform:G.style.transform,top:se,transitionDuration:y,width:de,zoomMargin:W});return E?pe.exports.createPortal(t.createElement("div",{"aria-label":"Zoomed image","aria-modal":!0,"data-rmiz-overlay":!0,role:"dialog",style:ue},t.createElement("div",{"data-rmiz-modal-content":!0,style:ce},n),t.createElement("button",{"aria-label":l,"data-rmiz-btn-close":!0,onClick:ae,ref:D,type:"button"})),k):null},Oe=i.exports.memo(Ue),$e=function(e){var n=e.children,o=e.closeText,l=o===void 0?"Unzoom image":o,d=e.isZoomed,a=e.overlayBgColorEnd,r=a===void 0?"rgba(255, 255, 255, 0.95)":a,s=e.overlayBgColorStart,c=s===void 0?"rgba(255, 255, 255, 0)":s,v=e.portalEl,m=e.onZoomChange,g=e.openText,h=g===void 0?"Zoom image":g,x=e.scrollableEl,k=e.transitionDuration,f=k===void 0?300:k,u=e.wrapElement,S=u===void 0?"div":u,y=e.wrapStyle,C=e.zoomMargin,W=C===void 0?0:C,L=e.zoomZindex,A=L===void 0?2147483647:L,D=i.exports.useState(!1),H=D[0],j=D[1],N=i.exports.useRef(null),E=i.exports.useRef(null),z=i.exports.useCallback(function(B){!d&&m&&(B.preventDefault(),m(!0))},[d,m]),I=i.exports.useCallback(function(){j(!0)},[]),w=i.exports.useCallback(function(){j(!1),E.current&&E.current.focus({preventScroll:!0})},[]),M=H?"hidden":"visible";return t.createElement(i.exports.StrictMode,null,t.createElement(S,{"data-rmiz-wrap":M,ref:N,style:y},n,t.createElement("button",{"aria-label":h,"data-rmiz-btn-open":!0,onClick:z,ref:E,type:"button"}),typeof window<"u"&&t.createElement(Oe,{closeText:l,isActive:d,onLoad:I,onUnload:w,onZoomChange:m,overlayBgColorEnd:r,overlayBgColorStart:c,parentRef:N,portalEl:v,scrollableEl:x,transitionDuration:f,zoomMargin:W,zoomZindex:A},n)))},Ve=i.exports.memo($e);const qe=({pictureUrl:e,productId:n,imageByUser:o})=>{const[l,d]=i.exports.useState(!1),[a,r]=i.exports.useState(void 0),s=n||o,c=v=>{if(s){if(v&&!a){const m=o&&e?e:we(n,900);r(m)}d(v)}};return t.createElement(ve.div,{initial:{x:10,opacity:0},animate:{x:0,opacity:1},transition:{type:"spring",stiffness:60,delay:0},className:"block-muted flex flex-col items-center  overflow-auto p-2 md:sticky  md:top-4"},t.createElement(Ve,{isZoomed:l,onZoomChange:c},t.createElement("img",{className:`mx-auto h-64 w-64 object-scale-down sm:h-80 sm:w-80 ${l?"hidden":"block"}`,alt:"Bilde av vin",src:e||Le}),s&&a&&t.createElement("img",{className:`h-80 w-80 object-scale-down ${l?"block":"hidden"}`,alt:"Bilde av vin",src:a})),s&&t.createElement("p",{className:"text-muted text-sm"},"Trykk p\xE5 bilde for \xE5 zoome inn."))},Ke=({id:e,date:n,deleteDate:o})=>t.createElement("li",{className:"dark:even:bg-gray-950/50 flex flex-row items-center gap-x-2 rounded p-2 even:bg-slate-50"},t.createElement("div",{className:"flex-1 font-medium text-gray-900 dark:text-gray-200"},t.createElement(V,{date:n})),t.createElement("button",{className:"btn-white w-auto p-1 px-1.5 shadow-none",onClick:()=>o(e)},t.createElement(_,{className:"text-wine-500 dark:text-wine-300",size:"1.5rem"}))),Xe=ge.injectEndpoints({endpoints:e=>({getConsumedDatesByWineId:e.query({query(n){return{url:`wine/consumed/${n}`,method:"GET"}},providesTags:n=>n?[...n.map(({id:o})=>({type:"Consumed",id:o})),{type:"Consumed",id:"LIST"}]:[{type:"Consumed",id:"LIST"}]}),deleteConsumedDateById:e.mutation({query(n){return{url:`wine/consumed/${n}`,method:"DELETE"}},invalidatesTags:(n,o,l)=>[{type:"Consumed",id:l},{type:"Statistics",id:"LIST"}]}),addConsumedDate:e.mutation({query({id:n,data:o}){return{url:`wine/consumed/${n}`,method:"POST",body:o}},invalidatesTags:(n,o,l)=>[{type:"Consumed",id:"LIST"},{type:"Statistics",id:"LIST"},{type:"Wines",id:l.id}]})})}),{useGetConsumedDatesByWineIdQuery:Ye,useDeleteConsumedDateByIdMutation:Ge,useAddConsumedDateMutation:Qe}=Xe,Je=({isOpen:e,setIsOpen:n,wineId:o,quantity:l})=>{const{data:d,isLoading:a}=Ye(o),[r,s]=Qe(),[c]=Ge(),[v,m]=i.exports.useState(null),[g,h]=i.exports.useState(null),x=async()=>{!g||!o||!l||await r({id:o,data:g}).unwrap().then(()=>{h(null),n(!1)}).catch(f=>{"data"in f&&m(f.data.title||"Error! Kunne ikke legge til dato."),console.error("rejected",f)})},k=async f=>{!o||!f||!d||await c(f).unwrap().then(()=>h(null)).catch(u=>{"data"in u&&m(u.data.title||"Error! Kunne ikke legge til dato."),console.error("rejected",u)})};return t.createElement(Ce,{title:"Drukket",description:'Her kan du legge til "drukket-datoer" som lagres p\xE5 vinen.',isOpen:e,setIsOpen:n},t.createElement("div",null,a?t.createElement(J,{text:"Laster datoer..."}):t.createElement(t.Fragment,null,t.createElement(Te,{title:"Hvordan fungerer dette?",defaultOpen:!1},t.createElement("div",{className:"space-y-2 text-gray-700 dark:text-gray-300"},t.createElement("p",null,"En vin kan max ha 10 drukket-datoer, den eldste datoen vil bli",t.createElement("span",{className:"font-bold"}," overskrevet")," automatisk. N\xE5r du legger til en drukket dato vil vinens antall"," ",t.createElement("span",{className:"font-bold"},"reduseres")," med 1. Du kan ikke registrere drukket datoer p\xE5 vin du ikke har p\xE5 lager, alts\xE5 hvor antall er lik 0."),t.createElement("p",null,"P\xE5 profilsiden kan du se de 10 siste drukket-datoene fra alle vin, mens p\xE5 denne siden vises kun drukket-datoer som h\xF8rer til valgt vin."))),v&&t.createElement(ee,{message:v}),d&&d.length>0?t.createElement("div",{className:"block-muted my-4 rounded-lg p-2"},t.createElement("h3",{className:"mb-2 border-b pb-2 text-center text-sm font-medium dark:border-gray-700"},"Drukket"),t.createElement("ul",{className:"space-y-1"},d.map(f=>t.createElement(Ke,{deleteDate:k,date:f.date,id:f.id,key:f.id})))):t.createElement(q,{message:"Ingen datoer er registrert enda."}),!l&&t.createElement(q,{message:"Du har ikke vinen p\xE5 lager."}),t.createElement("div",{className:"block-less-muted mt-4 space-y-6 rounded-lg p-4"},t.createElement("div",null,t.createElement("label",{className:"label"},"Velg dato"),t.createElement(xe,{text:"Velg dato",value:g,onChange:h,hereafter:!1,absolute:!1})),t.createElement("div",{className:"mt-4 grid grid-cols-1 gap-2"},t.createElement(be,{onClick:x,loading:a||s.isLoading,disabled:!g||!l,loadingText:"Legger til dato...",className:"h-12 justify-center rounded-full"},"Legg til dato"))))))},pt=()=>{const{wine:e,id:n,status:o}=We(),[l,d]=i.exports.useState(!1),[a,r]=i.exports.useState(!1);if(n){if(o.isLoading)return t.createElement(J,{text:"Laster..."});if(o.isError)return t.createElement(ee,{message:`Kunne ikke finne vinen med id: ${n}`});if(o.isSuccess&&e)return t.createElement(t.Fragment,null,t.createElement("div",null,t.createElement(Ne,{title:e.name,border:!0,node:t.createElement("div",{className:`flag f32 ${e.countryId}`}),highlighted:!0}),t.createElement("div",{className:"my-4 flex flex-col gap-y-4 sm:flex-row sm:items-center sm:justify-between"},t.createElement("div",{className:"flex flex-row gap-y-2"},t.createElement(ke,{className:"btn-white flex w-auto items-center justify-center xs:gap-x-2 gap-x-0.5 xs:px-4 px-2.5 rounded-full rounded-r-none",to:"update"},t.createElement(Ie,{size:"1.25rem",weight:"duotone",className:"text-slate-700 dark:text-slate-400"}),"Rediger"),t.createElement("button",{onClick:()=>r(!0),className:"btn-white flex w-auto items-center justify-center xs:gap-x-2 gap-x-0.5 xs:px-4 px-2.5 rounded-none border-l-0"},t.createElement(De,{size:"1.25rem",weight:"duotone",className:"text-slate-700 dark:text-slate-400"}),"Drukket"),e.productId&&t.createElement("a",{className:"btn-white flex w-auto items-center justify-center xs:gap-x-2 gap-x-0.5 xs:px-4 px-2.5 rounded-none border-l-0",href:Se(e.productId),target:"_blank",rel:"noreferrer"},t.createElement(je,{size:"1.25rem",weight:"duotone",className:"text-slate-700 dark:text-slate-400"}),"Link"),t.createElement("button",{onClick:()=>d(!0),className:"btn-white flex w-auto items-center justify-center xs:gap-x-2 gap-x-0.5 xs:px-4 px-2.5 rounded-full rounded-l-none border-l-0"},t.createElement(_,{size:"1.25rem",weight:"duotone",className:"text-wine-500 dark:text-wine-300"}),"Slett")),t.createElement("div",{className:"text-muted text-sm"},t.createElement("p",null,"Dato opprettet: ",t.createElement(V,{date:e.createdAt})),t.createElement("p",null,"Sist endret:"," ",t.createElement(V,{date:e.updatedAt,fallBackText:"Ingen endring"})))),t.createElement("div",{className:"grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-x-4 md:gap-y-0 "},t.createElement("div",{className:"col-span-2"},t.createElement(ye,{wine:e})),t.createElement("div",{className:"relative row-start-1 pl-0 md:row-start-auto"},!e.userDetails.quantity&&t.createElement(q,{className:"mt-0",message:"Du har ikke vinen p\xE5 lager."}),t.createElement(qe,{productId:e.productId,pictureUrl:e.pictureUrl,imageByUser:e.imageByUser})))),t.createElement(Je,{wineId:e.wineId,isOpen:a,quantity:e.userDetails.quantity,setIsOpen:r}),t.createElement(Ee,{isOpen:l,setIsOpen:d,shouldNavigate:!0,wineToDelete:{id:n,name:e.name}}))}else return t.createElement(he,null);return null};export{pt as default};
