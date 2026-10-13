const root=document.documentElement;
const themeButton=document.querySelector("#theme-toggle");
const themeIcon=document.querySelector("#theme-icon");
const themeColor=document.querySelector('meta[name="theme-color"]');
function applyTheme(theme){root.dataset.theme=theme;const dark=theme==="dark";themeIcon.textContent=dark?"☼":"☾";themeButton.setAttribute("aria-label",dark?"Mudar para tema claro":"Mudar para tema escuro");themeColor.setAttribute("content",dark?"#071225":"#eff5ff")}
try{const saved=localStorage.getItem("lucas-portfolio-theme");if(saved==="light"||saved==="dark")applyTheme(saved)}catch(error){}
themeButton.addEventListener("click",()=>{const next=root.dataset.theme==="dark"?"light":"dark";applyTheme(next);try{localStorage.setItem("lucas-portfolio-theme",next)}catch(error){}});

const menuButton=document.querySelector("#menu-toggle"),nav=document.querySelector("#main-nav");
function closeMenu(){nav.classList.remove("open");menuButton.setAttribute("aria-expanded","false");menuButton.setAttribute("aria-label","Abrir menu")}
menuButton.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuButton.setAttribute("aria-expanded",String(open));menuButton.setAttribute("aria-label",open?"Fechar menu":"Abrir menu")});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));
window.addEventListener("resize",()=>{if(innerWidth>800)closeMenu()});
const revealItems=document.querySelectorAll(".reveal");
if("IntersectionObserver"in window){const observer=new IntersectionObserver((entries,obs)=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");obs.unobserve(entry.target)}}),{threshold:.12});revealItems.forEach(item=>observer.observe(item))}
else revealItems.forEach(item=>item.classList.add("visible"));
document.querySelector("#current-year").textContent=new Date().getFullYear();

const projects={
 network:{title:"Laboratório de rede doméstica",description:"Documentar uma rede de teste, registrando configurações e o que cada teste demonstra.",steps:["Desenhar a topologia e identificar equipamentos.","Registrar IP, gateway, DNS e uso do DHCP.","Executar testes de conectividade e anotar resultados reais.","Adicionar diagrama, conclusões e dúvidas restantes."]},
 windows:{title:"Guia de diagnóstico do Windows",description:"Criar um checklist reutilizável para investigar problemas em um laboratório ou equipamento autorizado.",steps:["Definir um cenário reproduzível e seguro.","Registrar sintomas e informações iniciais.","Testar hipóteses uma de cada vez.","Documentar solução, validação e prevenção sem dados corporativos ou pessoais."]},
 scripts:{title:"Primeiros scripts de TI",description:"Aprender automação com scripts pequenos, legíveis e testados em ambiente pessoal ou autorizado.",steps:["Escolher uma tarefa simples e não destrutiva.","Escrever o script com comentários e tratamento de erros.","Testar com dados fictícios em ambiente seguro.","Publicar código, instruções de uso e limitações no GitHub."]}
};
const dialog=document.querySelector("#project-dialog");
document.querySelectorAll("[data-project]").forEach(button=>button.addEventListener("click",()=>{const info=projects[button.dataset.project];document.querySelector("#dialog-title").textContent=info.title;document.querySelector("#dialog-description").textContent=info.description;const list=document.querySelector("#dialog-steps");list.replaceChildren(...info.steps.map(text=>{const li=document.createElement("li");li.textContent=text;return li}));dialog.showModal()}));
document.querySelector("#dialog-close").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close()});

const found=new Set(),count=document.querySelector("#crystal-count"),progress=document.querySelector("#crystal-progress"),consoleResult=document.querySelector("#console-result"),toast=document.querySelector("#toast"),hint=document.querySelector("#hint-text");
let toastTimer=0;
function notify(message){toast.textContent=message;toast.classList.add("visible");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("visible"),3000)}
document.querySelectorAll("[data-crystal]").forEach(button=>button.addEventListener("click",()=>{const id=button.dataset.crystal;if(found.has(id))return;found.add(id);button.hidden=true;count.textContent=found.size;progress.style.width=`${found.size/3*100}%`;consoleResult.textContent=`[INFO] Cristais encontrados: ${found.size}/3`;if(found.size===3){hint.textContent="Missão concluída! Você encontrou todos os cristais do laboratório.";document.querySelector(".mascot span").innerHTML="Companheiro desbloqueado: <b>Bit, cristal de diagnóstico</b>";notify("✦ Missão concluída! Você encontrou todos os cristais!")}else notify(`Cristal encontrado! Faltam ${3-found.size}.`)}));
const hints=["Pista 1/3: um cristal está perto do começo da página.","Pista 2/3: outro está na área do laboratório, perto da borda inferior.","Pista 3/3: procure próximo à lateral esquerda do laboratório."];
let hintIndex=0;
document.querySelector("#hint-button").addEventListener("click",()=>{hint.textContent=found.size===3?"Missão concluída! Obrigado por explorar.":hints[Math.min(hintIndex++,hints.length-1)]});
