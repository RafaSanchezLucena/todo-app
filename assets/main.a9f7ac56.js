const k=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function a(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerpolicy&&(n.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?n.credentials="include":t.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(t){if(t.ep)return;t.ep=!0;const n=a(t);fetch(t.href,n)}};k();const v=document.querySelector(".app"),S=document.querySelector(".modal"),I={method:"GET",headers:{"X-RapidAPI-Key":"46b09705b0msh419e77df9426930p19b7e4jsn2eb1d4271df5","X-RapidAPI-Host":"weatherapi-com.p.rapidapi.com"}},r=async e=>{try{const a=await(await fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${e}&days=3`,I)).json();let{current:s,location:t}=a,{condition:n,humidity:l,temp_c:p,precip_in:f,feelslike_c:g}=s,{region:h,country:y}=t,{icon:b}=n;v.innerHTML=`<div class="weather">
                      <div class="header">
                      <span class="poblacion">${e}</span>
                      <button  title="Elige otra poblaci\xF3n." type="button" id="icono" onclick="changeCity()" class="icon"><span class="material-symbols-outlined"> settings </span></button><br>

                      <span class="region">${h}</span>
                      <span class="country">(${y})</span>
                      <br></div>
                      <span><strong>Temp:</strong> ${p}\xBA,</span>
                      <span><strong>Sensaci\xF3n:</strong> ${g}\xBA</span><br>
                      <span><strong>Humedad:</strong> ${l}%,</span>
                      <span><strong>Lluvia hoy:</strong> ${f}mm</span><br>
                      <img src="${b}"/>                   
                    </div>
    `}catch{S.classList.add("modal--show")}},L=document.querySelector(".modal__close"),u=document.querySelector(".modal__input"),d=document.querySelector(".modal"),$=()=>{try{let e=JSON.parse(localStorage.getItem("city"));r(e.nombre),setInterval(r,3e5,e.nombre)}catch{d.classList.add("modal--show")}};window.changeCity=()=>{d.classList.add("modal--show")};L.addEventListener("click",()=>{let e=u.value,o={nombre:e};localStorage.setItem("city",JSON.stringify(o));let a=JSON.parse(localStorage.getItem("city"));e!=""&&e!=null?(r(a.nombre),setInterval(r,3e5,a.nombre),d.classList.remove("modal--show")):alert("Campo obligatorio"),u.value=""});const i=document.querySelector(".container-tasks");document.querySelector(".container-form").innerHTML=`<label for="inputText" class="tarea fs-2">Nueva tarea:</label>
        <input autocomplete="off" id="inputText" onchange="newTask()" type="text" class="form-control" autofocus placeholder="Introduce el texto">`;var c=[];const w=()=>{i.innerHTML=" ";const e=JSON.parse(localStorage.getItem("tasks"));if(e!=null){const o=e.map((a,s)=>`<div id="${s}" class="task animate__animated">
                                <div class="form-check">
                                  <input onchange="done(${s})" value="true" class="form-check-input"          type="checkbox" id="${s+100}">
                                    <label class="form-check-label" for="defaultCheck1">
                                    <p class="h5">${a.description}</p>
                                    </label>
                                </div>
                                  
                                  <button class="icon-trash" onclick="deleteTask(${s})" ><span class="material-symbols-outlined">delete</span></button>
                                </div>`);i.innerHTML=o.join(""),e.forEach((a,s)=>{if(a.state===!0){let t=s+100;document.getElementById(s).classList.add("task--done"),document.getElementById(t).checked=!0}}),e.forEach(a=>c.push(a))}};w();window.newTask=()=>{let o={description:inputText.value,state:!1};c.push(o),localStorage.setItem("tasks",JSON.stringify(c)),m()};const m=()=>{i.innerHTML=" ";const e=JSON.parse(localStorage.getItem("tasks")),o=e.map((a,s)=>`<div id="${s}" class="task animate__animated">
                                <div class="form-check">
                                  <input onchange="done(${s})" value="true" class="form-check-input"       type="checkbox" id="${s+100}">
                                    <label class="form-check-label" for="defaultCheck1"> <p class="h5">${a.description}</p></label>
                                    
                                </div>
                                  
                                  <button class="icon-trash" onclick="deleteTask(${s})" ><span class="material-symbols-outlined">delete</span></button>
                                </div>`);inputText.value="",i.innerHTML=o.join(""),e.forEach((a,s)=>{if(a.state===!0){let t=s+100;document.getElementById(s).classList.add("task--done"),document.getElementById(t).checked=!0}})};window.deleteTask=e=>{document.getElementById(e).classList.add("animate__zoomOut"),setTimeout(()=>{c.splice(e,1),localStorage.setItem("tasks",JSON.stringify(c)),m()},500)};window.done=e=>{c[e].state===!1?c[e].state=!0:c[e].state=!1,c[e].state===!0?document.getElementById(e).classList.add("task--done"):document.getElementById(e).classList.remove("task--done"),localStorage.setItem("tasks",JSON.stringify(c))};$();
