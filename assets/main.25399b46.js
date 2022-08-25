const I=function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))t(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&t(r)}).observe(document,{childList:!0,subtree:!0});function o(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerpolicy&&(i.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?i.credentials="include":s.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(s){if(s.ep)return;s.ep=!0;const i=o(s);fetch(s.href,i)}};I();const L=document.querySelector(".app"),v=document.querySelector(".modal"),S={method:"GET",headers:{"X-RapidAPI-Key":"46b09705b0msh419e77df9426930p19b7e4jsn2eb1d4271df5","X-RapidAPI-Host":"weatherapi-com.p.rapidapi.com"}},l=async e=>{try{const o=await(await fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${e}&days=3`,S)).json();let{current:t,location:s}=o,{condition:i,humidity:r,temp_c:y,precip_in:h,feelslike_c:g}=t,{region:f,country:b}=s,{icon:k}=i;L.innerHTML=`<div class="weather">
                      <div class="header">
                      <span class="poblacion">${e}</span>
                      <button  title="Elige otra poblaci\xF3n." type="button" id="icono" onclick="changeCity()" class="icono"><span class="material-symbols-outlined"> settings </span></button><br>

                      <span class="region">${f}</span>
                      <span class="country">(${b})</span>
                      <br></div>
                      <span><strong>Temp:</strong> ${y}\xBA,</span>
                      <span><strong>Sensaci\xF3n:</strong> ${g}\xBA</span><br>
                      <span><strong>Humedad:</strong> ${r}%,</span>
                      <span><strong>Lluvia hoy:</strong> ${h}mm</span><br>
                      <img src="${k}"/>                   
                    </div>
    `}catch{v.classList.add("modal--show")}},w=document.querySelector(".modal__close"),m=document.querySelector(".modal__input"),d=document.querySelector(".modal"),E=()=>{try{let e=JSON.parse(localStorage.getItem("city"));l(e.nombre),setInterval(l,3e5,e.nombre)}catch{d.classList.add("modal--show")}};window.changeCity=()=>{d.classList.add("modal--show")};w.addEventListener("click",()=>{let e=m.value,a={nombre:e};localStorage.setItem("city",JSON.stringify(a));let o=JSON.parse(localStorage.getItem("city"));e!=""&&e!=null?(l(o.nombre),setInterval(l,3e5,o.nombre),d.classList.remove("modal--show")):alert("Campo obligatorio"),m.value=""});const c=document.querySelector(".container-tasks");document.querySelector(".container-form").innerHTML=`<label for="inputText" class="tarea fs-2">Nueva tarea:</label>
        <input autocomplete="off" id="inputText" onchange="newTask()" type="text" class="form-control" autofocus placeholder="Introduce el texto">`;var n=[];const $=()=>{c.innerHTML=" ";const e=JSON.parse(localStorage.getItem("tasks"));if(e!=null){const a=e.map((o,t)=>`<div id="${t}" class="task animate__animated">
                                <div class="form-check">
                                  <input onchange="done(${t})" value="true" class="form-check-input" type="checkbox" id="${t+100}">
                                    <label class="form-check-label" for="defaultCheck1">
                                    <p class="h5">${o.description}</p>
                                    </label>
                                </div>
                                  
                                  <button id="${t+150}" class="icon" onclick="deleteTask(${t})" ><span title="Eliminar" class="material-symbols-outlined">delete</span></button>
                                  <button id="${t+200}" class="icon" onclick="setPriority(${t})" ><span title="Prioridad alta" class="material-symbols-outlined">priority_high</span></button>
                                </div>`);c.innerHTML=a.join(""),e.forEach((o,t)=>{if(o.new===!0&&(document.getElementById(t).classList.add("animate__zoomIn"),setTimeout(()=>{document.getElementById(t).classList.remove("animate__zoomIn")},1e3)),o.done===!0){let s=t+100;document.getElementById(t).classList.add("task--done"),document.getElementById(s).checked=!0}if(o.priority==="high"){let s=t+150,i=t+200;document.getElementById(t).classList.add("priority--high"),document.getElementById(s).classList.add("icon--priority"),document.getElementById(i).classList.add("icon--priority")}}),e.forEach(o=>n.push(o))}};$();window.newTask=()=>{let a={description:inputText.value,done:!1,priority:"low",new:!1};n.push(a),localStorage.setItem("tasks",JSON.stringify(n)),u()};const u=()=>{c.innerHTML=" ";const e=JSON.parse(localStorage.getItem("tasks")),a=e.map((o,t)=>`<div id="${t}" class="task animate__animated">
                                <div class="form-check">
                                  <input onchange="done(${t})" value="true" class="form-check-input" type="checkbox" id="${t+100}">
                                    <label class="form-check-label" for="defaultCheck1"> <p class="h5">${o.description}</p></label>
                                    
                                </div>
                                  
                                  <button id="${t+150}" class="icon" onclick="deleteTask(${t})" ><span title="Eliminar" class="material-symbols-outlined">delete</span></button>
                                  <button id="${t+200}" class="icon" onclick="setPriority(${t})" ><span title="Prioridad alta" class="material-symbols-outlined">priority_high</span></button>
                                </div>`);inputText.value="",c.innerHTML=a.join(""),e.forEach((o,t)=>{if(o.new===!1&&(document.getElementById(t).classList.add("animate__zoomIn"),n[t].new=!0,localStorage.setItem("tasks",JSON.stringify(n)),setTimeout(()=>{document.getElementById(t).classList.remove("animate__zoomIn")},1e3)),o.done===!0){let s=t+100;document.getElementById(t).classList.add("task--done"),document.getElementById(s).checked=!0}if(o.priority==="high"){let s=t+150,i=t+200;document.getElementById(t).classList.add("priority--high"),document.getElementById(s).classList.add("icon--priority"),document.getElementById(i).classList.add("icon--priority")}})};window.deleteTask=e=>{document.getElementById(e).classList.add("animate__zoomOut"),setTimeout(()=>{n.splice(e,1),localStorage.setItem("tasks",JSON.stringify(n)),u()},500)};const T=e=>e.sort((o,t)=>o.priority<t.priority?-1:o.priority>t.priority?1:0);window.setPriority=e=>{let a=e+150,o=e+200;n[e].priority==="low"?n[e].priority="high":n[e].priority="low",n[e].priority==="high"?(document.getElementById(e).classList.add("priority--high"),document.getElementById(a).classList.add("icon--priority"),document.getElementById(o).classList.add("icon--priority")):(document.getElementById(e).classList.remove("priority--high"),document.getElementById(a).classList.remove("icon--priority"),document.getElementById(o).classList.remove("icon--priority")),T(n),localStorage.setItem("tasks",JSON.stringify(n)),setTimeout(()=>{u()},400)};window.done=e=>{n[e].done===!1?n[e].done=!0:n[e].done=!1,n[e].done===!0?document.getElementById(e).classList.add("task--done"):(document.getElementById(e).classList.add("task--nodone"),document.getElementById(e).classList.remove("task--done")),localStorage.setItem("tasks",JSON.stringify(n))};document.querySelector(".container-search").innerHTML=`
  <div>
   <h3>Buscador n\xFAm. tel\xE9fono:</h3>
   <input type="file" class="input btn btn-secondary" onchange="readFile(this)" id="inputFile" >
   <p class="aviso" style="color:#DC3545">Necesitas seleccionar un archivo para poder iniciar la b\xFAsqueda.</p>
   <input type="text" class="form-control" onkeyup="searchNumber(value)" id="introduccion" placeholder="Introduce..." >
   <h5>Resultado de la b\xFAsqueda:</h5>
   <ul class="lista"></ul>
  </div>
`;const p=[];window.readFile=e=>{document.querySelector(".aviso").innerHTML='<span style="color:#0D6EFD"> Archivo seleccionado.</span>';let a=e.files[0],o=new FileReader;o.readAsText(a),o.onload=()=>{JSON.parse(o.result).forEach(s=>{p.push(s)})},o.onerror=()=>{document.querySelector(".lista").innerHTML=`Ha ocurrido el siguiente error: ${o.error}`}};window.searchNumber=e=>{if(e!=""){const o=p.filter(t=>t.nombre.toLowerCase().includes(e.toLowerCase())).map(t=>`<li>${t.nombre}: <strong>${t.numero}</strong> </li>`);document.querySelector(".lista").innerHTML=o.join(" ")}else document.querySelector(".lista").innerHTML="<h5><strong>Sin resultados...</strong<</h5>"};E();
