import{i as d,af as c,R as t}from"./index.a4510e28.js";import{M as m,L as f}from"./vinmonopolet.07455311.js";import{T as g}from"./Trash.esm.3d4058f4.js";const E=({isOpen:n,setIsOpen:a,wineToDelete:e,shouldNavigate:s})=>{const l=d(),[r,{isLoading:i}]=c(),o=async()=>{e.id&&(await r(e.id),a(!1),s&&l("/inventory"))};return t.createElement(m,{title:"Slett vin",description:`Vil du slette ${e.name}`,isOpen:n,setIsOpen:a},t.createElement("div",{className:"grid grid-cols-1 gap-2"},t.createElement(f,{onClick:o,loading:i,disabled:!e.id||i,loadingText:"Sletter vin...",className:"h-10 justify-center rounded-full"},t.createElement(g,{size:"1.3rem"}),"Slett vin")))};export{E as D};
