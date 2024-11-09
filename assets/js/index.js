(()=>{"use strict";var e={201:(e,o,t)=>{t.d(o,{A:()=>s});var a=t(87),n=t(427),l=t(723),r=t(455),c=t.n(r);const s=()=>{const[e,o]=(0,a.useState)([]),[t,r]=(0,a.useState)("");(0,a.useEffect)((()=>{c()({path:"/wp/v2/color-options"}).then((e=>{e&&e.palettes&&o(e.palettes)})).catch((e=>console.error("Error loading palettes:",e)))}),[]);const s=(t,a,n,l)=>{o(e.map((e=>e.id===t?{...e,colors:e.colors.map((e=>e.id===a?{...e,[n]:l}:e))}:e)))};return React.createElement("div",{className:"color-options-app"},React.createElement("h2",null,(0,l.__)("Manage Color Palettes","custom-admin-color-options")),t&&React.createElement(n.Notice,{status:"info",isDismissible:!0},t),e.map((t=>React.createElement(n.PanelBody,{key:t.id,title:t.name||(0,l.__)("Untitled Palette","custom-admin-color-options"),initialOpen:!0},React.createElement(n.TextControl,{label:(0,l.__)("Palette Name","custom-admin-color-options"),value:t.name,onChange:a=>{return n=t.id,l=a,void o(e.map((e=>e.id===n?{...e,name:l}:e)));var n,l},placeholder:(0,l.__)("Enter palette name...","custom-admin-color-options")}),t.colors.map((a=>React.createElement(n.PanelRow,{key:a.id,className:"color-panel-row"},React.createElement(n.TextControl,{label:(0,l.__)("Color Name","custom-admin-color-options"),value:a.name,onChange:e=>s(t.id,a.id,"name",e),placeholder:(0,l.__)("Enter color name...","custom-admin-color-options")}),React.createElement(n.ColorPalette,{value:a.color,onChange:e=>s(t.id,a.id,"color",e),disableCustomColors:!1}),React.createElement(n.IconButton,{icon:"trash",label:(0,l.__)("Remove Color","custom-admin-color-options"),onClick:()=>{return n=t.id,l=a.id,void o(e.map((e=>e.id===n?{...e,colors:e.colors.filter((e=>e.id!==l))}:e)));var n,l},className:"remove-color-btn"})))),t.colors.length<5&&React.createElement(n.PanelRow,null,React.createElement(n.Button,{isPrimary:!0,onClick:()=>{return a=t.id,void o(e.map((e=>e.id===a&&e.colors.length<5?{...e,colors:[...e.colors,{id:Date.now(),name:"",color:"#000000"}]}:e)));var a}},(0,l.__)("Add New Color","custom-admin-color-options"))),React.createElement(n.PanelRow,null,React.createElement(n.IconButton,{icon:"trash",label:(0,l.__)("Remove Palette","custom-admin-color-options"),onClick:()=>{return a=t.id,void o(e.filter((e=>e.id!==a)));var a},className:"remove-palette-btn"}))))),React.createElement(n.PanelRow,null,React.createElement(n.Button,{isPrimary:!0,onClick:()=>{if(e.length<10){const t={id:Date.now(),name:"",colors:[]};o([...e,t])}else r((0,l.__)("Maximum of 10 palettes allowed.","custom-admin-color-options"))}},(0,l.__)("Add New Palette","custom-admin-color-options"))),React.createElement(n.PanelRow,null,React.createElement(n.Button,{isSecondary:!0,onClick:()=>{c()({path:"/wp/v2/color-options",method:"POST",data:{palettes:e}}).then((()=>{r((0,l.__)("Palettes saved successfully!","custom-admin-color-options"))})).catch((e=>{console.error("Error saving palettes:",e),r((0,l.__)("Error saving palettes.","custom-admin-color-options"))}))}},(0,l.__)("Save Palettes","custom-admin-color-options"))))}},455:e=>{e.exports=window.wp.apiFetch},427:e=>{e.exports=window.wp.components},87:e=>{e.exports=window.wp.element},723:e=>{e.exports=window.wp.i18n}},o={};function t(a){var n=o[a];if(void 0!==n)return n.exports;var l=o[a]={exports:{}};return e[a](l,l.exports,t),l.exports}t.n=e=>{var o=e&&e.__esModule?()=>e.default:()=>e;return t.d(o,{a:o}),o},t.d=(e,o)=>{for(var a in o)t.o(o,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:o[a]})},t.o=(e,o)=>Object.prototype.hasOwnProperty.call(e,o);var a=t(87),n=t(201);document.addEventListener("DOMContentLoaded",(()=>{const e=document.getElementById("bolt-color-options-app");e&&(0,a.render)(React.createElement(n.A,null),e)}))})();
//# sourceMappingURL=index.js.map