import{j as l,aI as p,r as c,R as t,E as u}from"./index.c3494518.js";import{T as d}from"./Title.519ed4d0.js";import{C as E}from"./CreateOrUpdate.1cf76d70.js";import{P as f}from"./TextInput.9e6ad826.js";import"./Check.esm.b974749b.js";import"./vinmonopolet.476dc41b.js";import"./DatePicker.29eea616.js";import"./Score.69f43af4.js";import"./Time.2155581b.js";import"./index.12e70f9d.js";import"./VinmonopoletModal.90081ae8.js";import"./Trash.esm.0b8525a0.js";import"./FloppyDisk.esm.1f75bb96.js";const W=()=>{const n=l(),[a]=p(),[i,s]=c.exports.useState(null),m=async r=>{console.log(r),await a(r).unwrap().then(()=>{u.success("Opprettet ny vin!"),n("/inventory")}).catch(e=>{var o;console.error("Adding wine error: ",e),(o=e==null?void 0:e.data)!=null&&o.errors&&s(e.data.errors)})};return t.createElement("div",null,t.createElement(d,{title:"Ny Vin",border:!0,Icon:f},t.createElement("p",null,"Her kan du legge til vin. Trykk p\xE5",t.createElement("strong",{className:"mx-1"},"Hent fra Vinmonopolet"),"for \xE5 hente vininformasjon fra Vinmonopolet.")),t.createElement(E,{onSubmit:m,serverErrors:i}))};export{W as default};