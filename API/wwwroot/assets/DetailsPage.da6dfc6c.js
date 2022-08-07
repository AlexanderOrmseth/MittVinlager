var se=Object.defineProperty;var ie=(e,s,t)=>s in e?se(e,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[s]=t;var g=(e,s,t)=>(ie(e,typeof s!="symbol"?s+"":s,t),t);import{j as h,F as b,a as o,r as S,I as re,b as ae,m as le,ar as de,as as ce,L as ue}from"./index.57bc95c5.js";import{D as me}from"./DeleteWineModal.62c229e6.js";import{D as he,W as pe}from"./DatePicker.6ac16d0c.js";import{p as fe,v as ke,M as ge,L as ve,d as Le}from"./vinmonopolet.d46070d2.js";import{S as F}from"./Spinner.c39aca91.js";import{T as $,C as ye}from"./Time.6ef7f1df.js";import{T as V}from"./Trash.esm.8068837d.js";import{A as xe}from"./AsideDisclosure.903ac4fc.js";import{E as X}from"./ErrorBox.31aa4503.js";import{I as A}from"./InfoBox.59ccfafe.js";import{u as we}from"./useFetchSingleWine.5297a137.js";import{T as Se}from"./Title.6637844d.js";import{L as be}from"./Link.esm.6f67bc97.js";import"./Score.1e624618.js";import"./Info.esm.14860b3f.js";var N=new Map;N.set("bold",function(e){return h(b,{children:[o("path",{d:"M96,216H48a8,8,0,0,1-8-8V163.3a7.9,7.9,0,0,1,2.3-5.6l120-120a8,8,0,0,1,11.4,0l44.6,44.6a8,8,0,0,1,0,11.4Z",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}),o("line",{x1:"136",y1:"64",x2:"192",y2:"120",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}),o("line",{x1:"44",y1:"156",x2:"104",y2:"216",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}),o("line",{x1:"216",y1:"216",x2:"96",y2:"216",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}),o("line",{x1:"164",y1:"92",x2:"72",y2:"184",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"})]})});N.set("duotone",function(e){return h(b,{children:[o("path",{d:"M192,120,136,64l26.3-26.3a8,8,0,0,1,11.4,0l44.6,44.6a8,8,0,0,1,0,11.4Z",opacity:"0.2"}),o("path",{d:"M96,216H48a8,8,0,0,1-8-8V163.3a7.9,7.9,0,0,1,2.3-5.6l120-120a8,8,0,0,1,11.4,0l44.6,44.6a8,8,0,0,1,0,11.4Z",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),o("line",{x1:"136",y1:"64",x2:"192",y2:"120",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),o("polyline",{points:"216 216 96 216 40.5 160.5",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),o("line",{x1:"164",y1:"92",x2:"68",y2:"188",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"})]})});N.set("fill",function(){return o(b,{children:o("path",{d:"M224,76.7,179.3,32a15.9,15.9,0,0,0-22.6,0L36.7,152a15.4,15.4,0,0,0-3.6,5.5l-.2.5a16,16,0,0,0-.9,5.3V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.3L224,99.3A16.1,16.1,0,0,0,224,76.7Zm-80-9.4L160.7,84,68,176.7,51.3,160ZM48,208V179.3L76.7,208Zm48-3.3L79.3,188,172,95.3,188.7,112Z"})})});N.set("light",function(e){return h(b,{children:[o("path",{d:"M96,216H48a8,8,0,0,1-8-8V163.3a7.9,7.9,0,0,1,2.3-5.6l120-120a8,8,0,0,1,11.4,0l44.6,44.6a8,8,0,0,1,0,11.4Z",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}),o("line",{x1:"136",y1:"64",x2:"192",y2:"120",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}),o("polyline",{points:"216 216 96 216 40.5 160.5",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}),o("line",{x1:"164",y1:"92",x2:"68",y2:"188",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"})]})});N.set("thin",function(e){return h(b,{children:[o("path",{d:"M96,216H48a8,8,0,0,1-8-8V163.3a7.9,7.9,0,0,1,2.3-5.6l120-120a8,8,0,0,1,11.4,0l44.6,44.6a8,8,0,0,1,0,11.4Z",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"}),o("line",{x1:"136",y1:"64",x2:"192",y2:"120",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"}),o("polyline",{points:"216 216 96 216 40.5 160.5",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"}),o("line",{x1:"164",y1:"92",x2:"68",y2:"188",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"})]})});N.set("regular",function(e){return h(b,{children:[o("path",{d:"M96,216H48a8,8,0,0,1-8-8V163.3a7.9,7.9,0,0,1,2.3-5.6l120-120a8,8,0,0,1,11.4,0l44.6,44.6a8,8,0,0,1,0,11.4Z",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),o("line",{x1:"136",y1:"64",x2:"192",y2:"120",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),o("polyline",{points:"216 216 96 216 40.5 160.5",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),o("line",{x1:"164",y1:"92",x2:"68",y2:"188",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"})]})});var Ie=function(s,t){return ae(s,t,N)},G=S.exports.forwardRef(function(e,s){return o(re,{...Object.assign({ref:s},e,{renderPath:Ie})})});G.displayName="PencilLine";const Ne=G;function Ce(){return o("svg",{"aria-hidden":"true","data-rmiz-btn-unzoom-icon":!0,fill:"currentColor",focusable:"false",viewBox:"0 0 16 16",xmlns:"http://www.w3.org/2000/svg",children:o("path",{d:"M 14.144531 1.148438 L 9 6.292969 L 9 3 L 8 3 L 8 8 L 13 8 L 13 7 L 9.707031 7 L 14.855469 1.851563 Z M 8 8 L 3 8 L 3 9 L 6.292969 9 L 1.148438 14.144531 L 1.851563 14.855469 L 7 9.707031 L 7 13 L 8 13 Z"})})}function ze(){return o("svg",{"aria-hidden":"true","data-rmiz-btn-zoom-icon":!0,fill:"currentColor",focusable:"false",viewBox:"0 0 16 16",xmlns:"http://www.w3.org/2000/svg",children:o("path",{d:"M 9 1 L 9 2 L 12.292969 2 L 2 12.292969 L 2 9 L 1 9 L 1 14 L 6 14 L 6 13 L 2.707031 13 L 13 2.707031 L 13 6 L 14 6 L 14 1 Z"})})}const Z=(e,s)=>{var t,n;return e===((n=(t=s==null?void 0:s.tagName)==null?void 0:t.toUpperCase)==null?void 0:n.call(t))},O=e=>Z("DIV",e)||Z("SPAN",e),E=e=>Z("IMG",e),W=e=>Z("SVG",e),Y=({height:e,offset:s,width:t})=>Math.min(window.innerWidth/(t+s),window.innerHeight/(e+s)),Me=({containerHeight:e,containerWidth:s,offset:t,targetHeight:n,targetWidth:i})=>{const r=Y({height:n,offset:t,width:i}),c=i>n?i/s:n/e;return r>1?c:r*c},I=({containerHeight:e,containerWidth:s,hasScalableSrc:t,offset:n,targetHeight:i,targetWidth:r})=>!t&&i&&r?Me({containerHeight:e,containerWidth:s,offset:n,targetHeight:i,targetWidth:r}):Y({height:e,offset:n,width:s}),De=/url(?:\(['"]?)(.*?)(?:['"]?\))/,U=e=>{var s;if(e){if(E(e))return e.currentSrc;if(O(e)){const t=window.getComputedStyle(e).backgroundImage;if(t)return(s=De.exec(t))==null?void 0:s[1]}}},Ze=e=>{var s,t;if(e)return E(e)?(s=e.alt)!=null?s:void 0:(t=e.getAttribute("aria-label"))!=null?t:void 0},Ee=({containerHeight:e,containerLeft:s,containerTop:t,containerWidth:n,hasScalableSrc:i,offset:r,targetHeight:c,targetWidth:m})=>{const l=I({containerHeight:e,containerWidth:n,hasScalableSrc:i,offset:r,targetHeight:c,targetWidth:m});return{top:t,left:s,width:n*l,height:e*l,transform:`translate(0,0) scale(${1/l})`}},w=({position:e,relativeNum:s})=>{const t=parseFloat(e);return e.endsWith("%")?s*t/100:t},je=({containerHeight:e,containerLeft:s,containerTop:t,containerWidth:n,hasScalableSrc:i,objectFit:r,objectPosition:c,offset:m,targetHeight:l,targetWidth:a})=>{if(r==="scale-down"&&(a<=n&&l<=e?r="none":r="contain"),r==="cover"||r==="contain"){const d=n/a,p=e/l,u=r==="cover"?Math.max(d,p):Math.min(d,p),[k="50%",f="50%"]=c.split(" "),v=w({position:k,relativeNum:n-a*u}),L=w({position:f,relativeNum:e-l*u}),y=I({containerHeight:l*u,containerWidth:a*u,hasScalableSrc:i,offset:m,targetHeight:l,targetWidth:a});return{top:t+L,left:s+v,width:a*u*y,height:l*u*y,transform:`translate(0,0) scale(${1/y})`}}else if(r==="none"){const[d="50%",p="50%"]=c.split(" "),u=w({position:d,relativeNum:n-a}),k=w({position:p,relativeNum:e-l}),f=I({containerHeight:l,containerWidth:a,hasScalableSrc:i,offset:m,targetHeight:l,targetWidth:a});return{top:t+k,left:s+u,width:a*f,height:l*f,transform:`translate(0,0) scale(${1/f})`}}else if(r==="fill"){const d=n/a,p=e/l,u=Math.max(d,p),k=I({containerHeight:l*u,containerWidth:a*u,hasScalableSrc:i,offset:m,targetHeight:l,targetWidth:a});return{width:n*k,height:e*k,transform:`translate(0,0) scale(${1/k})`}}else return{}},Te=({backgroundPosition:e,backgroundSize:s,containerHeight:t,containerLeft:n,containerTop:i,containerWidth:r,hasScalableSrc:c,offset:m,targetHeight:l,targetWidth:a})=>{if(s==="cover"||s==="contain"){const d=r/a,p=t/l,u=s==="cover"?Math.max(d,p):Math.min(d,p),[k="50%",f="50%"]=e.split(" "),v=w({position:k,relativeNum:r-a*u}),L=w({position:f,relativeNum:t-l*u}),y=I({containerHeight:l*u,containerWidth:a*u,hasScalableSrc:c,offset:m,targetHeight:l,targetWidth:a});return{top:i+L,left:n+v,width:a*u*y,height:l*u*y,transform:`translate(0,0) scale(${1/y})`}}else if(s==="auto"){const[d="50%",p="50%"]=e.split(" "),u=w({position:d,relativeNum:r-a}),k=w({position:p,relativeNum:t-l}),f=I({containerHeight:l,containerWidth:a,hasScalableSrc:c,offset:m,targetHeight:l,targetWidth:a});return{top:i+k,left:n+u,width:a*f,height:l*f,transform:`translate(0,0) scale(${1/f})`}}else{const[d="50%",p="50%"]=s.split(" "),u=w({position:d,relativeNum:r}),k=w({position:p,relativeNum:t}),f=u/a,v=k/l,L=Math.min(f,v),[y="50%",z="50%"]=e.split(" "),M=w({position:y,relativeNum:r-a*L}),C=w({position:z,relativeNum:t-l*L}),x=I({containerHeight:l*L,containerWidth:a*L,hasScalableSrc:c,offset:m,targetHeight:l,targetWidth:a});return{top:i+C,left:n+M,width:a*L*x,height:l*L*x,transform:`translate(0,0) scale(${1/x})`}}},Re=/\.svg$/i,Be=({hasZoomImg:e,imgSrc:s,isSvg:t,isZoomed:n,loadedImgEl:i,offset:r,shouldRefresh:c,targetEl:m})=>{var v,L,y;const l=t||((v=s==null?void 0:s.slice)==null?void 0:v.call(s,0,18))==="data:image/svg+xml"||e||!!(s&&Re.test(s)),a=m.getBoundingClientRect(),d=window.getComputedStyle(m),p=Ee({containerHeight:a.height,containerLeft:a.left,containerTop:a.top,containerWidth:a.width,hasScalableSrc:l,offset:r,targetHeight:(L=i==null?void 0:i.naturalHeight)!=null?L:a.height,targetWidth:(y=i==null?void 0:i.naturalWidth)!=null?y:a.width}),u=i&&d.objectFit?je({containerHeight:a.height,containerLeft:a.left,containerTop:a.top,containerWidth:a.width,hasScalableSrc:l,objectFit:d.objectFit,objectPosition:d.objectPosition,offset:r,targetHeight:i.naturalHeight,targetWidth:i.naturalWidth}):void 0,k=i&&O(m)?Te({backgroundPosition:d.backgroundPosition,backgroundSize:d.backgroundSize,containerHeight:a.height,containerLeft:a.left,containerTop:a.top,containerWidth:a.width,hasScalableSrc:l,offset:r,targetHeight:i.naturalHeight,targetWidth:i.naturalWidth}):void 0,f=Object.assign({},p,u,k);if(n){const z=window.innerWidth/2,M=window.innerHeight/2,C=parseFloat(String(f.left||0))+parseFloat(String(f.width||0))/2,x=parseFloat(String(f.top||0))+parseFloat(String(f.height||0))/2,j=z-C,D=M-x;c&&(f.transitionDuration="0.01ms"),f.transform=`translate(${j}px,${D}px) scale(1)`}return f},$e=e=>{var s;if(!e)return{};if(W(e)){const t=e.parentNode,n=(s=t==null?void 0:t.getBoundingClientRect)==null?void 0:s.call(t),i=e.getBoundingClientRect();return{height:i.height,left:n.left-i.left,width:i.width,top:n.top-i.top}}else return{height:e.offsetHeight,left:e.offsetLeft,width:e.offsetWidth,top:e.offsetTop}};function Ae(e){return o(_,{...e})}class _ extends S.exports.Component{constructor(){super(...arguments);g(this,"state",{id:"",isZoomImgLoaded:!1,loadedImgEl:void 0,modalState:2,shouldRefresh:!1});g(this,"refContent",S.exports.createRef());g(this,"refDialog",S.exports.createRef());g(this,"refModalImg",S.exports.createRef());g(this,"refWrap",S.exports.createRef());g(this,"imgEl",null);g(this,"imgElObserver");g(this,"styleModalImg",{});g(this,"setId",()=>{this.setState({id:Math.random().toString(16).slice(-4)})});g(this,"setAndTrackImg",()=>{var t,n;this.imgEl=(n=(t=this.refContent.current)==null?void 0:t.querySelector)==null?void 0:n.call(t,':is(img, svg, [role="img"], [data-zoom]):not([aria-hidden="true"])'),this.imgEl&&(this.imgElObserver=new ResizeObserver(i=>{const r=i[0];r!=null&&r.target&&(this.imgEl=r.target,this.setState({}))}),this.imgElObserver.observe(this.imgEl))});g(this,"handleIfZoomChanged",t=>{const{isZoomed:n}=this.props;!t&&n?this.zoom():t&&!n&&this.unzoom()});g(this,"handleImgLoad",()=>{var i;const{imgEl:t}=this,n=new Image;E(t)&&(n.sizes=t.sizes,n.srcset=t.srcset),n.src=(i=U(t))!=null?i:"",n.decode().then(()=>{this.setState({loadedImgEl:n})}).catch(()=>{n.onload=()=>{this.setState({loadedImgEl:n})}})});g(this,"handleZoom",()=>{var t,n;(n=(t=this.props).onZoomChange)==null||n.call(t,!0)});g(this,"handleUnzoom",()=>{var t,n;(n=(t=this.props).onZoomChange)==null||n.call(t,!1)});g(this,"handleDialogKeyDown",t=>{(t.key==="Escape"||t.keyCode===27)&&(t.preventDefault(),t.stopPropagation(),this.handleUnzoom())});g(this,"handleScroll",()=>{this.setState({shouldRefresh:!0}),this.handleUnzoom()});g(this,"handleResize",()=>{this.setState({shouldRefresh:!0})});g(this,"zoom",()=>{var l,a,d,p;const{handleResize:t,handleScroll:n,loadZoomImg:i,props:{scrollableEl:r=window},refDialog:c,refModalImg:m}=this;(a=(l=c.current)==null?void 0:l.showModal)==null||a.call(l),this.setState({modalState:1}),i(),(p=(d=m.current)==null?void 0:d.addEventListener)==null||p.call(d,"transitionend",()=>{setTimeout(()=>{this.setState({modalState:0}),r.addEventListener("scroll",n),window.addEventListener("resize",t)},0)},{once:!0})});g(this,"unzoom",()=>{var m,l;const{handleResize:t,handleScroll:n,refDialog:i,refModalImg:r,props:{scrollableEl:c=window}}=this;this.setState({modalState:3}),(l=(m=r.current)==null?void 0:m.addEventListener)==null||l.call(m,"transitionend",()=>{setTimeout(()=>{var a,d;window.removeEventListener("resize",t),c.removeEventListener("scroll",n),this.setState({shouldRefresh:!1,modalState:2}),(d=(a=i.current)==null?void 0:a.close)==null||d.call(a)},0)},{once:!0})});g(this,"loadZoomImg",()=>{var i,r;const{props:{zoomImg:t}}=this,n=t==null?void 0:t.src;if(n){const c=new Image;c.src=n,c.sizes=(i=t==null?void 0:t.sizes)!=null?i:"",c.srcset=(r=t==null?void 0:t.srcSet)!=null?r:"",c.decode().then(()=>{this.setState({isZoomImgLoaded:!0})})}});g(this,"UNSAFE_handleSvg",()=>{var r,c,m,l,a,d,p;const{imgEl:t,refModalImg:n,styleModalImg:i}=this;if(W(t)){const u=document.createElement("div");u.innerHTML=t.outerHTML;const k=u.firstChild;k.style.width=`${(r=i.width)!=null?r:0}px`,k.style.height=`${(c=i.height)!=null?c:0}px`,(a=(l=(m=n.current)==null?void 0:m.firstChild)==null?void 0:l.remove)==null||a.call(l),(p=(d=n.current)==null?void 0:d.appendChild)==null||p.call(d,k)}})}render(){const{handleDialogKeyDown:t,handleUnzoom:n,handleZoom:i,imgEl:r,props:{a11yNameButtonUnzoom:c,a11yNameButtonZoom:m,children:l,IconUnzoom:a,IconZoom:d,isZoomed:p,zoomImg:u,zoomMargin:k},refContent:f,refDialog:v,refModalImg:L,refWrap:y,state:{id:z,isZoomImgLoaded:M,loadedImgEl:C,modalState:x,shouldRefresh:j}}=this,D=`rmiz-modal-img-${z}`,q=O(r),T=E(r),R=W(r),B=Ze(r),P=U(r),K=T?r.sizes:void 0,Q=T?r.srcset:void 0,J=!!(u!=null&&u.src),H=B?`${m}: ${B}`:m,ee=x===1||x===0,te=x===2||x===3?"hidden":"visible",ne={visibility:x===2?"visible":"hidden"},oe=$e(r);return this.styleModalImg=r&&(C||R)?Be({hasZoomImg:J,imgSrc:P,isSvg:R,isZoomed:p&&ee,loadedImgEl:C,offset:k,shouldRefresh:j,targetEl:r}):{},h("div",{"data-rmiz":!0,ref:y,children:[o("div",{"data-rmiz-content":!0,ref:f,style:ne,children:l}),o("div",{"data-rmiz-ghost":!0,style:oe,children:o("button",{"aria-label":H,"data-rmiz-btn-zoom":!0,onClick:i,type:"button",children:o(d,{})})}),h("dialog",{"aria-labelledby":D,"aria-modal":"true","data-rmiz-modal":!0,ref:v,onClick:n,onClose:n,onKeyDown:t,role:"dialog",children:[o("div",{"data-rmiz-modal-overlay":te}),h("div",{"data-rmiz-modal-content":!0,children:[T||q?o("img",{alt:B,sizes:K,src:P,srcSet:Q,...M&&x===0?u:{},"data-rmiz-modal-img":!0,height:this.styleModalImg.height,id:D,ref:L,style:this.styleModalImg,width:this.styleModalImg.width}):void 0,R?o("div",{"data-rmiz-modal-img":!0,ref:L,style:this.styleModalImg}):void 0,o("button",{"aria-label":c,"data-rmiz-btn-unzoom":!0,onClick:n,type:"button",children:o(a,{})})]})]})]})}componentDidMount(){var t,n,i,r;this.setId(),this.setAndTrackImg(),this.handleImgLoad(),this.UNSAFE_handleSvg(),(n=(t=this.imgEl)==null?void 0:t.addEventListener)==null||n.call(t,"load",this.handleImgLoad),(r=(i=this.imgEl)==null?void 0:i.addEventListener)==null||r.call(i,"click",this.handleZoom)}componentWillUnmount(){var t,n,i,r,c;(t=this.imgElObserver)==null||t.disconnect(),(i=(n=this.imgEl)==null?void 0:n.removeEventListener)==null||i.call(n,"load",this.handleImgLoad),(c=(r=this.imgEl)==null?void 0:r.removeEventListener)==null||c.call(r,"click",this.handleZoom),window.removeEventListener("resize",this.handleResize),window.removeEventListener("scroll",this.handleScroll)}componentDidUpdate(t){this.UNSAFE_handleSvg(),this.handleIfZoomChanged(t.isZoomed)}}g(_,"defaultProps",{a11yNameButtonUnzoom:"Minimize image",a11yNameButtonZoom:"Expand image",IconUnzoom:Ce,IconZoom:ze,zoomMargin:0});const We=({pictureUrl:e,productId:s,imageByUser:t})=>{const[n,i]=S.exports.useState(!1),[r,c]=S.exports.useState(void 0),m=s||t,l=a=>{if(m){if(a&&!r){const d=t&&e?e:ke(s,900);c(d)}i(a)}};return h(le.div,{initial:{x:10,opacity:0},animate:{x:0,opacity:1},transition:{type:"spring",stiffness:60,delay:0},className:"flex p-2 flex-col items-center  block-muted md:sticky md:top-4  overflow-auto",children:[o(Ae,{isZoomed:n,onZoomChange:l,children:h(b,{children:[o("img",{className:`mx-auto object-scale-down sm:h-80 sm:w-80 w-64 h-64 ${n?"hidden":"block"}`,alt:"Bilde av vin",src:e||fe}),m&&r&&o("img",{className:`object-scale-down h-80 w-80 ${n?"block":"hidden"}`,alt:"Bilde av vin",src:r})]})}),m&&o("p",{className:"text-muted text-sm",children:"Trykk p\xE5 bilde for \xE5 zoome inn."})]})},Oe=({id:e,date:s,deleteDate:t})=>h("li",{className:"flex even:bg-slate-50 dark:even:bg-gray-950/50 p-2 rounded flex-row gap-x-2 items-center",children:[o("div",{className:"flex-1 text-gray-900 dark:text-gray-200 font-medium",children:o($,{date:s})}),o("button",{className:"btn-white p-1 px-1.5 w-auto shadow-none",onClick:()=>t(e),children:o(V,{className:"text-wine-500 dark:text-wine-300",size:"1.5rem"})})]}),Pe=de.injectEndpoints({endpoints:e=>({getConsumedDatesByWineId:e.query({query(s){return{url:`wine/consumed/${s}`,method:"GET"}},providesTags:s=>s?[...s.map(({id:t})=>({type:"Consumed",id:t})),{type:"Consumed",id:"LIST"}]:[{type:"Consumed",id:"LIST"}]}),deleteConsumedDateById:e.mutation({query(s){return{url:`wine/consumed/${s}`,method:"DELETE"}},invalidatesTags:(s,t,n)=>[{type:"Consumed",id:n},{type:"Statistics",id:"LIST"}]}),addConsumedDate:e.mutation({query({id:s,data:t}){return{url:`wine/consumed/${s}`,method:"POST",body:t}},invalidatesTags:(s,t,n)=>[{type:"Consumed",id:"LIST"},{type:"Statistics",id:"LIST"},{type:"Wines",id:n.id}]})})}),{useGetConsumedDatesByWineIdQuery:Ue,useDeleteConsumedDateByIdMutation:Fe,useAddConsumedDateMutation:Ve}=Pe,Xe=({isOpen:e,setIsOpen:s,wineId:t,quantity:n})=>{const{data:i,isLoading:r}=Ue(t),[c,m]=Ve(),[l]=Fe(),[a,d]=S.exports.useState(null),[p,u]=S.exports.useState(null),k=async()=>{!p||!t||!n||await c({id:t,data:p}).unwrap().then(()=>{u(null),s(!1)}).catch(v=>{"data"in v&&d(v.data.title||"Error! Kunne ikke legge til dato."),console.error("rejected",v)})},f=async v=>{!t||!v||!i||await l(v).unwrap().then(()=>u(null)).catch(L=>{"data"in L&&d(L.data.title||"Error! Kunne ikke legge til dato."),console.error("rejected",L)})};return o(ge,{title:"Drukket",description:'Her kan du legge til "drukket-datoer" som lagres p\xE5 vinen.',isOpen:e,setIsOpen:s,children:o("div",{children:r?o(F,{text:"Laster datoer..."}):h(b,{children:[o(xe,{title:"Hvordan fungerer dette?",defaultOpen:!1,children:h("div",{className:"space-y-2 text-gray-700 dark:text-gray-300",children:[h("p",{children:["En vin kan max ha 10 drukket-datoer, den eldste datoen vil bli",o("span",{className:"font-bold",children:" overskrevet"})," automatisk. N\xE5r du legger til en drukket dato vil vinens antall"," ",o("span",{className:"font-bold",children:"reduseres"})," med 1. Du kan ikke registrere drukket datoer p\xE5 vin du ikke har p\xE5 lager, alts\xE5 hvor antall er lik 0."]}),o("p",{children:"P\xE5 profilsiden kan du se de 10 siste drukket-datoene fra alle vin, mens p\xE5 denne siden vises kun drukket-datoer som h\xF8rer til valgt vin."})]})}),a&&o(X,{message:a}),i&&i.length>0?h("div",{className:"my-4 p-2 rounded-lg block-muted",children:[o("h3",{className:"mb-2 text-center border-b dark:border-gray-700 pb-2 font-medium text-sm",children:"Drukket"}),o("ul",{className:"space-y-1",children:i.map(v=>o(Oe,{deleteDate:f,date:v.date,id:v.id},v.id))})]}):o(A,{message:"Ingen datoer er registrert enda."}),!n&&o(A,{message:"Du har ikke vinen p\xE5 lager."}),h("div",{className:"p-4 mt-4 block-less-muted space-y-6 rounded-lg",children:[h("div",{children:[o("label",{className:"label",children:"Velg dato"}),o(he,{text:"Velg dato",value:p,onChange:u,hereafter:!1,absolute:!1})]}),o("div",{className:"grid mt-4 grid-cols-1 gap-2",children:o(ve,{onClick:k,loading:r||m.isLoading,disabled:!p||!n,loadingText:"Legger til dato...",className:"justify-center h-12 rounded-full",children:"Legg til dato"})})]})]})})})},lt=()=>{const{wine:e,id:s,status:t}=we(),[n,i]=S.exports.useState(!1),[r,c]=S.exports.useState(!1);if(s){if(t.isLoading)return o(F,{text:"Laster..."});if(t.isError)return o(X,{message:`Kunne ikke finne vinen med id: ${s}`});if(t.isSuccess&&e)return h(b,{children:[h("div",{children:[o(Se,{title:e.name,border:!0,node:o("div",{className:`flag f32 ${e.countryId}`}),highlighted:!0}),h("div",{className:"my-4 gap-y-4 flex sm:flex-row flex-col sm:items-center sm:justify-between",children:[h("div",{className:"flex flex-row gap-y-2",children:[h(ue,{className:"btn-white rounded-full rounded-r-none justify-center w-auto flex items-center gap-x-2",to:"update",children:[o(Ne,{size:"1.25rem",weight:"duotone",className:"text-slate-700 dark:text-slate-400"}),"Rediger"]}),h("button",{onClick:()=>c(!0),className:"btn-white rounded-none border-l-0 w-auto justify-center flex items-center gap-x-2",children:[o(ye,{size:"1.25rem",weight:"duotone",className:"text-slate-700 dark:text-slate-400"}),"Drukket"]}),e.productId&&h("a",{className:"btn-white rounded-none border-l-0 w-auto justify-center flex items-center gap-x-2",href:Le(e.productId),target:"_blank",rel:"noreferrer",children:[o(be,{size:"1.25rem",weight:"duotone",className:"text-slate-700 dark:text-slate-400"}),"Link"]}),h("button",{onClick:()=>i(!0),className:"btn-white rounded-full border-l-0 rounded-l-none justify-center w-auto flex items-center gap-x-2",children:[o(V,{size:"1.25rem",weight:"duotone",className:"text-wine-500 dark:text-wine-300"}),"Slett"]})]}),h("div",{className:"text-sm text-muted",children:[h("p",{children:["Dato opprettet: ",o($,{date:e.createdAt})]}),h("p",{children:["Sist endret:"," ",o($,{date:e.updatedAt,fallBackText:"Ingen endring"})]})]})]}),h("div",{className:"grid md:grid-cols-3 grid-cols-1 md:gap-x-4 md:gap-y-0 gap-y-4 ",children:[o("div",{className:"col-span-2",children:o(pe,{wine:e})}),h("div",{className:"pl-0 relative md:row-start-auto row-start-1",children:[!e.userDetails.quantity&&o(A,{className:"mt-0",message:"Du har ikke vinen p\xE5 lager."}),o(We,{productId:e.productId,pictureUrl:e.pictureUrl,imageByUser:e.imageByUser})]})]})]}),o(Xe,{wineId:e.wineId,isOpen:r,quantity:e.userDetails.quantity,setIsOpen:c}),o(me,{isOpen:n,setIsOpen:i,shouldNavigate:!0,wineToDelete:{id:s,name:e.name}})]})}else return o(ce,{});return null};export{lt as default};