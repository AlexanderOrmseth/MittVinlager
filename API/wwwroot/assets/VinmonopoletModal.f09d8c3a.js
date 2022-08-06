import{j as r,F as s,a as e,r as i,I as S,b as C,q as P,y as q,z as x,A,g as D,M as E}from"./index.8aeb157c.js";var l=new Map;l.set("bold",function(n){return r(s,{children:[e("polyline",{points:"86 110 128 152 170 110",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}),e("line",{x1:"128",y1:"40",x2:"128",y2:"152",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}),e("path",{d:"M216,152v56a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V152",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"})]})});l.set("duotone",function(n){return r(s,{children:[e("polyline",{points:"86 110 128 152 170 110",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),e("line",{x1:"128",y1:"40",x2:"128",y2:"152",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),e("path",{d:"M216,152v56a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V152",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"})]})});l.set("fill",function(){return e(s,{children:e("path",{d:"M80.3,115.7a8.2,8.2,0,0,1-1.7-8.7,8,8,0,0,1,7.4-5h34V40a8,8,0,0,1,16,0v62h34a8,8,0,0,1,7.4,5,8.2,8.2,0,0,1-1.7,8.7l-42,42a8.2,8.2,0,0,1-11.4,0ZM216,144a8,8,0,0,0-8,8v56H48V152a8,8,0,0,0-16,0v56a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V152A8,8,0,0,0,216,144Z"})})});l.set("light",function(n){return r(s,{children:[e("polyline",{points:"86 110 128 152 170 110",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}),e("line",{x1:"128",y1:"40",x2:"128",y2:"152",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}),e("path",{d:"M216,152v56a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V152",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"})]})});l.set("thin",function(n){return r(s,{children:[e("polyline",{points:"86 110 128 152 170 110",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"}),e("line",{x1:"128",y1:"40",x2:"128",y2:"152",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"}),e("path",{d:"M216,152v56a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V152",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"})]})});l.set("regular",function(n){return r(s,{children:[e("polyline",{points:"86 110 128 152 170 110",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),e("line",{x1:"128",y1:"40",x2:"128",y2:"152",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),e("path",{d:"M216,152v56a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V152",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"})]})});var F=function(o,a){return C(o,a,l)},y=i.exports.forwardRef(function(n,o){return e(S,{...Object.assign({ref:o},n,{renderPath:F})})});y.displayName="DownloadSimple";const $=y,z=P.injectEndpoints({endpoints:n=>({getVinmonopoletCountries:n.query({query:()=>"vinmonopolet/countries"}),getVinmonopoletWine:n.query({query:o=>`vinmonopolet/${o}`})})}),{useGetVinmonopoletCountriesQuery:T,useGetVinmonopoletWineQuery:B}=z,G=[{value:1,title:"Alle verdier",description:"Henter og erstatter alle verdier"},{value:2,title:"Kun pris",description:"Erstatter kun verdien til pris"},{value:3,title:"Ignorer brukerdetaljer",description:"Henter og erstatter alle verdier untatt brukerdetaljer"}],Q=({setValues:n,productId:o,setIsOpen:a,setValue:d,getValues:u,isWishlist:c})=>{const[k,b]=i.exports.useState(!0),[w,j]=i.exports.useState(""),{data:p,...W}=B(w,{skip:k}),[h,N]=i.exports.useState(o||""),[f,V]=i.exports.useState(null),[m,H]=i.exports.useState(1),g=i.exports.useCallback(t=>{if(c)n(t);else if(d&&u)switch(m){case 1:n(t);break;case 2:d("price",t.price);break;case 3:const{userDetails:v,...L}=t;n({...L,userDetails:u("userDetails")});break;default:n(t);break}},[u,c,m,d,n]);i.exports.useEffect(()=>{p&&(g(p),console.log(p),b(!0),a(!1))},[p,g,a]);const I=t=>t?/^\d+$/.test(t):!1,M=async()=>{let t=h.trim();if(t.includes("https://www.vinmonopolet.no/")&&t.includes("/p/")&&(t=t.split("/p/")[1]),!I(t)){V("Error, kunne ikke hente vin med denne produktId'en.");return}j(t),b(!1)};return r(s,{children:[r("div",{className:"mb-4",children:[r("a",{className:"inline-flex link flex-row gap-x-1.5 items-center px-2 text-sm bg-green-wine-25 hover:bg-green-wine-100 dark:bg-green-wine-25/10 py-2 rounded",href:"https://www.vinmonopolet.no/search/?q=:relevance&searchType=product",target:"_blank",rel:"noreferrer",children:[e(q,{size:"1.2rem"}),"G\xE5 til Vinmonopolet.no"]}),r("div",{className:"flex flex-row gap-2 my-4 text-slate-600 font-mono",children:[e("span",{children:"112301"}),e("span",{children:"89101"}),e("span",{children:"132801"})]})]}),r("div",{className:"p-4 space-y-6 block-less-muted rounded-lg",children:[r("div",{children:[e("label",{htmlFor:"vinmonopoletProductId",className:"label",children:"ProduktId/Link"}),e("input",{className:`text-input text h-12 px-3 text-lg ${f?"border-wine-500 bg-wine-25":""}`,type:"text",name:"vinmonopoletProductId",value:h,autoComplete:"off",placeholder:"produktId",onChange:t=>N(t.target.value)}),f&&e("p",{className:"text-wine-500 text-sm italic",children:f})]}),!c&&r(x,{className:"space-y-1",value:m,onChange:H,children:[e(x.Label,{className:"label",children:"Velg verdier"}),G.map(t=>e(x.Option,{value:t.value,children:({checked:v,active:L})=>r("div",{className:`p-3 btn-white rounded font-normal 
                ${v?"bg-blue-wine-500 active:bg-blue-wine-500 dark:bg-blue-wine-500 dark:hover:bg-blue-wine-500 text-slate-50 border border-blue-wine-500 dark:border-blue-wine-200":""} flex flex-row gap-x-2 items-center cursor-pointer select-none`,children:[r("div",{className:"flex-1",children:[e("p",{className:"font-medium",children:t.title}),e("p",{className:"opacity-60 font-normal text-sm",children:t.description})]}),v&&e("div",{className:"border-2 border-white rounded-full p-0.5",children:e(A,{size:"1.2rem",weight:"bold"})})]})},t.value))]}),r(D,{loadingText:"Henter vin...",disabled:h.length<1,loading:W.isLoading,onClick:M,className:"h-12 w-full rounded-full justify-center",children:[e($,{size:"1.5rem"}),"Hent vin"]})]})]})},Z=({isOpen:n,setIsOpen:o,setValues:a,setValue:d,getValues:u,productId:c,isWishlist:k=!1})=>e(E,{title:"Hent vin fra Vinmonopolet",description:"Fyll inn produktId eller url fra vinmonopolet",isOpen:n,setIsOpen:o,xl:!0,children:e(Q,{setIsOpen:o,setValue:d,getValues:u,productId:c,isWishlist:k,setValues:a})});export{Z as V,T as u};
