const raiz=document.querySelector('#raiz-aplicacion');
function mostrarFallo(error){
  console.error('ZHY Companion no pudo iniciar',error);
  raiz.innerHTML='';
  const caja=document.createElement('main');caja.className='pantalla-fallo-inicio';
  caja.innerHTML='<div class="marca-fallo">Z</div><h1>ZHY Companion no pudo iniciar</h1><p>La interfaz encontró un error de carga, pero tus datos locales no se borraron.</p><pre></pre><button type="button">Reintentar</button>';
  caja.querySelector('pre').textContent=error?.message||String(error);caja.querySelector('button').onclick=()=>location.reload();raiz.append(caja);
}
import('./iniciar-zhy-companion.js').catch(mostrarFallo);
if('serviceWorker' in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('./trabajador-servicio.js').catch(error=>console.warn('Service Worker no disponible',error));
