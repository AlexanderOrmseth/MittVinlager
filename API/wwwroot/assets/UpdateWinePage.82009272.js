import{i as f,r as l,aH as g,R as e,ap as v,E as S}from"./index.d4caf88f.js";import{S as w}from"./Spinner.5cab0aef.js";import{T as x}from"./Title.72ff6dde.js";import{C as h}from"./CreateOrUpdate.25dc9345.js";import{u as k}from"./useFetchSingleWine.f471bc5f.js";import{E as O}from"./ErrorBox.ebdf2463.js";import{P as I,D as U}from"./DeleteWineModal.b6297a2e.js";import"./switch.adcc6ad0.js";import"./vinmonopolet.9efd3e5b.js";import"./radio-group.166443a6.js";import"./DatePicker.b8094cb2.js";import"./Score.1b1f0745.js";import"./Time.e9db59e1.js";import"./index.a6dbf254.js";import"./VinmonopoletModal.736d1e35.js";import"./Trash.esm.f83c4053.js";import"./FloppyDisk.esm.6bb1c64b.js";const j=()=>{const m=f(),{wine:r,id:n,status:o}=k(),[p,a]=l.exports.useState(!1),[c]=g(),[u,d]=l.exports.useState(null);if(n){if(o.isLoading)return e.createElement(w,{text:"Laster..."});if(o.isError)return e.createElement(O,{message:`Kunne ikke finne vinen med id: ${n}`})}else return e.createElement(v,null);console.log(r);const E=async i=>{console.log(i),await c({id:n,data:i}).unwrap().then(()=>{S.success("Oppdaterte vin!",{position:"bottom-right"}),m(-1)}).catch(t=>{var s;if(console.error("Update wine error",t),(s=t==null?void 0:t.data)!=null&&s.errors){d(t.data.errors);return}console.error("Update wine error",t)})};return e.createElement("div",null,e.createElement(x,{title:"Rediger Vin",border:!0,Icon:I},e.createElement("p",null,'Her kan du legge til vin. Trykk p\xE5 "Hent fra Vinmonopolet" knappen for \xE5 hente vin fra Vinmonopolet.no.')),o.isSuccess&&r&&e.createElement(e.Fragment,null,e.createElement(h,{setDeleteModalIsOpen:a,onSubmit:E,wine:r,serverErrors:u}),e.createElement(U,{isOpen:p,shouldNavigate:!0,setIsOpen:a,wineToDelete:{id:r.wineId,name:r.name}})))};export{j as default};