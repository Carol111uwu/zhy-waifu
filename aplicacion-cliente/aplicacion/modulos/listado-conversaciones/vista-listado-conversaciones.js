import { crearElementoHtml as e } from '../../interfaz/crear-elemento-html.js';
import { estadoGlobalAplicacion, actualizarEstadoGlobal } from '../../estado-y-persistencia-aplicacion/estado-global-aplicacion.js';
import { obtenerPersonajesDisponibles } from '../personajes/registro-personajes-disponibles.js';
import { obtenerConversacion } from '../conversacion/controlador-conversacion-personaje.js';
function ultimo(p){return obtenerConversacion(p.id).at(-1)||null;}
function fecha(m){if(!m)return'';const d=new Date(m.marcaTiempo),h=(Date.now()-d.getTime())/36e5;if(h<24)return d.toLocaleTimeString('es',{hour:'2-digit',minute:'2-digit'});if(h<168)return `${Math.floor(h/24)} d`;return d.toLocaleDateString('es',{month:'2-digit',day:'2-digit'});}
function avatar(p){return p.avatarImagen?e('img',{clase:'avatar-personaje avatar-imagen avatar-chat-lista',src:p.avatarImagen,alt:''}):e('div',{clase:'avatar-personaje avatar-chat-lista',texto:p.avatarTexto||p.nombre[0]});}

function mostrarMenuChats(){
 const overlay=e('div',{clase:'overlay-hoja-acciones'}),hoja=e('div',{clase:'hoja-acciones-mensaje'}),tirador=e('div',{clase:'tirador-hoja'});
 const filaToggle=e('label',{clase:'fila-menu-chat-menu'},[e('span',{texto:'Recibir saludos'}),e('input',{type:'checkbox'})]);const check=filaToggle.querySelector('input');check.checked=estadoGlobalAplicacion.ajustesListadoConversaciones.recibirSaludos;check.addEventListener('change',()=>actualizarEstadoGlobal(s=>{s.ajustesListadoConversaciones.recibirSaludos=check.checked;}));
 const opcion=(texto,accion,peligro=false)=>e('button',{clase:`opcion-hoja-mensaje ${peligro?'peligro':''}`,type:'button',texto,alclic:()=>{overlay.remove();accion();}});
 hoja.append(tirador,filaToggle,opcion('Ordenar por más recientes',()=>actualizarEstadoGlobal(s=>{s.ajustesListadoConversaciones.orden='recientes';})),opcion('Ordenar por más antiguos',()=>actualizarEstadoGlobal(s=>{s.ajustesListadoConversaciones.orden='antiguos';})),opcion('Eliminar todos los chats locales',()=>{if(confirm('¿Eliminar todos los chats actuales? Los personajes y tarjetas de memoria se conservarán.'))actualizarEstadoGlobal(s=>{s.conversaciones={};s.borradoresPorPersonaje={};});},true),e('button',{clase:'opcion-hoja-mensaje cancelar',type:'button',texto:'Cancelar',alclic:()=>overlay.remove()}));
 overlay.append(hoja);overlay.addEventListener('click',ev=>{if(ev.target===overlay)overlay.remove();});document.body.append(overlay);
}
export function renderizarVistaListadoConversaciones(){
 const grupos=estadoGlobalAplicacion.pestanaChats==='grupos',q=(estadoGlobalAplicacion.busquedaChats||'').toLowerCase(),orden=estadoGlobalAplicacion.ajustesListadoConversaciones.orden;
 let filas=obtenerPersonajesDisponibles().map(p=>({p,m:ultimo(p)})).filter(({p,m})=>!q||`${p.nombre} ${m?.texto||''}`.toLowerCase().includes(q));filas.sort((a,b)=>orden==='antiguos'?(a.m?.marcaTiempo||0)-(b.m?.marcaTiempo||0):(b.m?.marcaTiempo||0)-(a.m?.marcaTiempo||0));
 const buscar=e('input',{class:'entrada-busqueda',placeholder:'Buscar chats...',value:estadoGlobalAplicacion.busquedaChats||''});buscar.addEventListener('input',()=>actualizarEstadoGlobal(s=>{s.busquedaChats=buscar.value;}));
 const lista=filas.map(({p,m})=>{const borrador=estadoGlobalAplicacion.borradoresPorPersonaje[p.id],previa=borrador?`[Borrador] ${borrador}`:(m?.texto||p.saludoInicial||'').replace(/\*/g,' ').replace(/\s+/g,' ').trim();return e('button',{clase:'fila-chat-mensajeria',type:'button',alclic:()=>actualizarEstadoGlobal(s=>{s.personajeActivoId=p.id;s.seccionActual='conversacion';s.mensajesNoLeidosPorPersonaje[p.id]=0;})},[avatar(p),e('div',{clase:'contenido-fila-chat'},[e('strong',{texto:p.nombre}),e('span',{clase:borrador?'es-borrador':'',texto:previa.slice(0,115)})]),e('div',{clase:'meta-fila-chat'},[e('time',{texto:fecha(m)}),(estadoGlobalAplicacion.mensajesNoLeidosPorPersonaje[p.id]||0)>0?e('b',{texto:String(estadoGlobalAplicacion.mensajesNoLeidosPorPersonaje[p.id])}):null])]);});
 return e('section',{clase:'pagina-desplazable pagina-app-movil'},[
  e('header',{clase:'cabecera-app-principal'},[e('h1',{texto:'Chats'}),e('button',{clase:'boton-icono-limpio',type:'button',texto:'⋯',alclic:mostrarMenuChats})]),
  e('div',{clase:'pestanas-lineales'},[e('button',{clase:!grupos?'activa':'',texto:'Chats',alclic:()=>actualizarEstadoGlobal(s=>{s.pestanaChats='chats';})}),e('button',{clase:grupos?'activa':'',texto:'Grupos',alclic:()=>actualizarEstadoGlobal(s=>{s.pestanaChats='grupos';})})]),buscar,
  grupos?e('div',{clase:'estado-vacio-grande'},[e('span',{texto:'👥'}),e('strong',{texto:'Grupos preparados para después'}),e('p',{texto:'La arquitectura los separa de los chats individuales, pero no activaremos grupos hasta estabilizar la experiencia principal.'})]):e('div',{clase:'lista-chats-mensajeria'},lista.length?lista:[e('p',{clase:'estado-vacio',texto:'Todavía no hay conversaciones.'})]),
 ]);
}
