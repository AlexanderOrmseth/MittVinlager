import{R as e,r as s,I as l,a as k}from"./index.2deef4e9.js";import{c as i}from"./vinmonopolet.fd01c801.js";var t=new Map;t.set("bold",function(n){return e.createElement(e.Fragment,null,e.createElement("rect",{x:"40",y:"40",width:"176",height:"176",rx:"8",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}),e.createElement("line",{x1:"176",y1:"20",x2:"176",y2:"40",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}),e.createElement("line",{x1:"80",y1:"20",x2:"80",y2:"40",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}),e.createElement("line",{x1:"40",y1:"88",x2:"216",y2:"88",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}))});t.set("duotone",function(n){return e.createElement(e.Fragment,null,e.createElement("path",{d:"M40,88H216V48a8,8,0,0,0-8-8H48a8,8,0,0,0-8,8Z",opacity:"0.2"}),e.createElement("rect",{x:"40",y:"40",width:"176",height:"176",rx:"8",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),e.createElement("line",{x1:"176",y1:"24",x2:"176",y2:"56",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),e.createElement("line",{x1:"80",y1:"24",x2:"80",y2:"56",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),e.createElement("line",{x1:"40",y1:"88",x2:"216",y2:"88",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}))});t.set("fill",function(){return e.createElement(e.Fragment,null,e.createElement("path",{d:"M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,48H48V48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24Z"}))});t.set("light",function(n){return e.createElement(e.Fragment,null,e.createElement("rect",{x:"40",y:"40",width:"176",height:"176",rx:"8",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}),e.createElement("line",{x1:"176",y1:"24",x2:"176",y2:"56",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}),e.createElement("line",{x1:"80",y1:"24",x2:"80",y2:"56",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}),e.createElement("line",{x1:"40",y1:"88",x2:"216",y2:"88",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}))});t.set("thin",function(n){return e.createElement(e.Fragment,null,e.createElement("rect",{x:"40",y:"40",width:"176",height:"176",rx:"8",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"}),e.createElement("line",{x1:"176",y1:"24",x2:"176",y2:"56",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"}),e.createElement("line",{x1:"80",y1:"24",x2:"80",y2:"56",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"}),e.createElement("line",{x1:"40",y1:"88",x2:"216",y2:"88",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"}))});t.set("regular",function(n){return e.createElement(e.Fragment,null,e.createElement("rect",{x:"40",y:"40",width:"176",height:"176",rx:"8",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),e.createElement("line",{x1:"176",y1:"24",x2:"176",y2:"56",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),e.createElement("line",{x1:"80",y1:"24",x2:"80",y2:"56",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),e.createElement("line",{x1:"40",y1:"88",x2:"216",y2:"88",fill:"none",stroke:n,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}))});var d=function(r,o){return k(r,o,t)},a=s.exports.forwardRef(function(n,r){return e.createElement(l,Object.assign({ref:r},n,{renderPath:d}))});a.displayName="CalendarBlank";const m=a,h=({date:n,fallBackText:r,short:o=!1})=>n?typeof n=="string"?e.createElement("time",{dateTime:n},i(new Date(n),o)):e.createElement("time",{dateTime:n.toString()},i(n,o)):e.createElement("span",null,r&&r);export{m as C,h as T};