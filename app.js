const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const drawer=$("#drawer"), menu=$("#menuBtn"), close=$("#closeMenu");
menu.onclick=()=>drawer.classList.add("open"); close.onclick=()=>drawer.classList.remove("open");
const data={
  misas:{title:"Horarios de Misa",intro:"Horarios publicados para la Parroquia San Juan Bosco de San Martín. Conviene confirmar cambios especiales antes de una celebración.",body:`
    <div class="info-card"><h3>Sede parroquial</h3><p><b>Domingos · 9:30 hs.</b></p></div>
    <div class="info-card"><h3>Capilla Nuestra Señora de Luján</h3><p><b>Todos los sábados · 18:00 hs.</b></p></div>
    <div class="info-card"><h3>Capilla San Isidro Labrador</h3><p><b>Todos los sábados · 19:30 hs.</b></p></div>
    <div class="info-card"><h3>Capilla Beato Ceferino Namuncurá</h3><p><b>Todos los 26 de cada mes · 18:00 hs.</b></p></div>
    <div class="info-card"><h3>Celebraciones mensuales</h3><p>1.º sábado: San Cayetano · 17:00 hs.<br>1.º domingo: Ntra. Sra. de Pompeya · 11:00 hs.<br>2.º domingo: Beato Ceferino Namuncurá · 11:00 hs.<br>3.º domingo: María Auxiliadora · 11:00 hs.<br>4.º domingo: Virgen de La Merced · 11:00 hs.<br>5.º domingo: Virgen de Andacollo · 11:00 hs.</p></div>
    <p class="page-intro">Fuente de referencia: horarios publicados por el Arzobispado de San Juan. Esta app deberá tener un espacio de administración para actualizar horarios cuando la parroquia lo necesite.</p>`},
  comunidades:{title:"Nuestras comunidades",intro:"La parroquia reúne distintas comunidades y capillas que forman una misma familia.",body:`
    ${["Virgen de Luján","San Isidro Labrador","María Auxiliadora","San Cayetano","Virgen de Andacollo","Virgen de Pompeya","Beato Ceferino Namuncurá","Virgen de la Merced"].map((x,i)=>`<div class="info-card"><span class="tag">COMUNIDAD</span><h3>${x}</h3><p>Próximamente: historia, ubicación, horarios, contacto, actividades y fotos.</p></div>`).join("")}`},
  agenda:{title:"Agenda parroquial",intro:"Un solo lugar para saber qué está pasando en nuestras comunidades.",body:`<div class="info-card"><h3>📅 Próximamente</h3><p>Acá vamos a cargar las actividades parroquiales: misas, reuniones, catequesis, celebraciones, procesiones, encuentros, Cáritas y demás actividades.</p></div><div class="info-card"><h3>¿Cómo funcionará?</h3><p>Cada actividad tendrá fecha, hora, lugar y, cuando corresponda, un botón para abrir la ubicación o compartirla por WhatsApp.</p></div>`},
  catequesis:{title:"Catequesis",intro:"Un espacio para acompañar a las familias en el camino de la fe.",body:`<div class="info-card"><h3>Primera Comunión</h3><p>Información sobre inscripción, encuentros, familias y celebraciones.</p></div><div class="info-card"><h3>Confirmación</h3><p>Información sobre grupos, encuentros, familias y celebraciones.</p></div><div class="info-card"><h3>Familias</h3><p>Materiales, avisos y fechas importantes para acompañar el proceso catequístico.</p></div>`},
  caritas:{title:"Cáritas",intro:"Una comunidad que acompaña, escucha y sirve.",body:`<div class="info-card"><h3>❤️ Cáritas parroquial</h3><p>Acá podremos publicar días de atención, campañas, necesidades, formas de colaborar y datos de contacto.</p></div>`},
  noticias:{title:"Noticias",intro:"Lo que vivimos como comunidad.",body:`<div class="info-card"><h3>📰 Próximamente</h3><p>Las noticias, fotos y comunicados de la parroquia tendrán su propio espacio.</p></div>`},
  oracion:{title:"Oración y Evangelio",intro:"Un espacio para detenernos, escuchar la Palabra y rezar.",body:`<div class="info-card"><span class="tag">PALABRA DE DIOS</span><h3>Evangelio del día</h3><p>En esta sección podremos publicar el Evangelio de cada día junto con una breve reflexión pastoral.</p></div><div class="info-card"><h3>🙏 Oraciones</h3><p>Oraciones para distintos momentos: por las familias, los enfermos, quienes buscan trabajo, agradecimiento, María y otras necesidades de la comunidad.</p></div>`},
  contacto:{title:"Contacto",intro:"Estamos para encontrarnos.",body:`<div class="info-card"><h3>Parroquia San Juan Bosco</h3><p>V° Alem 5439 · San Martín · San Juan</p><p><b>Párroco:</b> Pbro. Orlando Sánchez</p><p><b>Teléfono publicado:</b> 497-1215</p></div><div class="info-card"><h3>📍 Próximamente</h3><p>Agregaremos mapa, WhatsApp, Facebook, Instagram, correo y horarios de secretaría cuando tengamos los datos oficiales.</p></div>`}
};
function openSection(name){
  drawer.classList.remove("open");
  if(name==="inicio"){location.hash=""; location.reload(); return}
  const d=data[name]||data.inicio;
  $("#app").innerHTML=`<section class="page"><button class="back" onclick="openSection('inicio')">← Volver al inicio</button><span class="eyebrow dark">PARROQUIA SAN JUAN BOSCO</span><h1>${d.title}</h1><p class="page-intro">${d.intro}</p>${d.body}</section>`;
  location.hash=name; window.scrollTo({top:0,behavior:"smooth"});
}
$$("[data-section]").forEach(b=>b.addEventListener("click",()=>openSection(b.dataset.section)));
window.addEventListener("load",()=>{const h=location.hash.replace("#",""); if(h&&data[h])openSection(h)});
let deferredPrompt;
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;$("#installBtn").hidden=false});
$("#installBtn").onclick=async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;$("#installBtn").hidden=true};
if("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(()=>{});
