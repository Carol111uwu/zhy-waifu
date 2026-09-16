const CACHE='zhy-companion-v0.4.1';
const BASE=new URL('./',self.location.href);
const INICIALES=[
  new URL('./index.html',BASE).href,
  new URL('./estilos/base/variables-visuales.css',BASE).href,
  new URL('./estilos/base/estructura-adaptable.css',BASE).href,
  new URL('./aplicacion/iniciar-zhy-companion.js',BASE).href,
  new URL('./publico/manifiesto.webmanifest',BASE).href,
];
self.addEventListener('install',evento=>evento.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(INICIALES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',evento=>evento.waitUntil(caches.keys().then(claves=>Promise.all(claves.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',evento=>{
  if(evento.request.method!=='GET')return;
  const objetivo=new URL(evento.request.url);
  if(objetivo.origin!==location.origin)return;
  if(evento.request.mode==='navigate'){
    evento.respondWith(fetch(evento.request).catch(()=>caches.match(new URL('./index.html',BASE).href)));
    return;
  }
  evento.respondWith(caches.match(evento.request).then(encontrada=>encontrada||fetch(evento.request).then(respuesta=>{
    if(respuesta.ok){const copia=respuesta.clone();caches.open(CACHE).then(cache=>cache.put(evento.request,copia));}
    return respuesta;
  })));
});
