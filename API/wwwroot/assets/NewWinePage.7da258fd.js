import{k as l,aI as p,r as c,R as t,E as u}from"./index.48a13ce9.js";import{T as d}from"./Title.e4f9a1bd.js";import{C as E}from"./CreateOrUpdate.a55505bb.js";import{P as f}from"./PlusCircle.esm.5afcbaeb.js";import"./Check.esm.e8fbf3df.js";import"./vinmonopolet.ffea2a84.js";import"./DatePicker.327f4572.js";import"./Score.e203f0f9.js";import"./Time.29df3dfe.js";import"./index.a6dbf254.js";import"./VinmonopoletModal.37bf6536.js";import"./Trash.esm.44448f80.js";import"./FloppyDisk.esm.818a28f6.js";const W=()=>{const n=l(),[a]=p(),[i,s]=c.exports.useState(null),m=async r=>{console.log(r),await a(r).unwrap().then(()=>{u.success("Opprettet ny vin!"),n("/inventory")}).catch(e=>{var o;console.error("Adding wine error: ",e),(o=e==null?void 0:e.data)!=null&&o.errors&&s(e.data.errors)})};return t.createElement("div",null,t.createElement(d,{title:"Ny Vin",border:!0,Icon:f},t.createElement("p",null,"Her kan du legge til vin. Trykk p\xE5",t.createElement("strong",{className:"mx-1"},"Hent fra Vinmonopolet"),"for \xE5 hente vininformasjon fra Vinmonopolet.")),t.createElement(E,{onSubmit:m,serverErrors:i}))};export{W as default};