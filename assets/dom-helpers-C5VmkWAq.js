import{h as a}from"./index-ozCPyGCR.js";const i=e=>{document.createElement("li").append(e)},r=e=>{const t=document.createElement("button");return t.classList.add("copy"),t.textContent=`Copy ${e}`,t.dataset.color=e,t.addEventListener("click",()=>a(e)),t},l=e=>{const t=document.createElement("button");return t.type="button",t.classList.add("delete"),t.textContent="Delete Palette",t.dataset.uuid=e.uuid,t},u=e=>{const t=document.createElement("div");return t.classList.add(`${e.temperature}`),t.textContent=`${e.temperature}`,t},m=e=>{const t=document.createElement("ul");return t.className="colors",e.colors.forEach(n=>{const o=document.createElement("div");o.classList.add("color-container"),o.dataset.color=n;const d=document.createElement("li"),c=document.createElement("p");c.textContent="Text Example",c.style.backgroundColor=n;const s=r(n);o.append(c),d.append(o,s),t.append(d)}),t},E=e=>{const t=document.getElementById("pc"),n=document.createElement("div");n.classList.add("palette"),n.dataset.uuid=e.uuid;const o=document.createElement("h3");o.textContent=e.title;const d=m(e),c=u(e);n.append(o,d,l(e),c),t.append(n)};export{i as liForDom,E as newPaletteFunc};
