import { crearElementoHtml as e } from '../../interfaz/crear-elemento-html.js';
import { estadoGlobalAplicacion, actualizarEstadoGlobal } from '../../estado-y-persistencia-aplicacion/estado-global-aplicacion.js';
import { obtenerPersonajesDisponibles } from '../personajes/registro-personajes-disponibles.js';
import { obtenerConversacion, borrarConversacion, borrarTodosLosHistoriales } from '../conversacion/controlador-conversacion-personaje.js';

function ultimo(personaje){const lista=obtenerConversacion(personaje.id);return lista.at(-1)||null;}
function fecha(m){return m?new Date(m.marcaTiempo).toLocaleString('es',{month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'}):'';}
export function renderizarVistaListadoConversaciones(){
  const orden=estadoGlobalAplicacion.ajustesListadoConversaciones.orden;
  let personajes=obtenerPersonajesDisponibles().map(p=>({p,m:ultimo(p)}));
  personajes.sort((a,b)=>orden==='antiguos'?(a.m?.marcaTiempo||0)-(b.m?.marcaTiempo||0):(b.m?.marcaTiempo||0)-(a.m?.marcaTiempo||0));
  const recibir=e('input',{type:'checkbox'});recibir.checked=estadoGlobalAplicacion.ajustesListadoConversaciones.recibirSaludos;recibir.addEventListener('change',()=>actualizarEstadoGlobal(s=>{s.ajustesListadoConversaciones.recibirSaludos=recibir.checked;}));
  const lista=personajes.map(({p,m})=>e('button',{clase:'fila-conversacion-lista',type:'button',alclic:()=>actualizarEstadoGlobal(s=>{s.personajeActivoId=p.id;s.seccionActual='conversacion';})},[e('div',{clase:'avatar-personaje',texto:p.avatarTexto||p.nombre[0]}),e('div',{clase:'texto-conversacion-lista'},[e('strong',{texto:p.nombre}),e('span',{texto:(m?.texto||p.saludoInicial||'').replace(/\*/g,'').slice(0,115)})]),e('time',{texto:fecha(m)})]));
  return e('section',{clase:'pagina-desplazable pagina-angosta'},[
    e('div',{clase:'encabezado-pagina'},[e('div',{},[e('h1',{texto:'Chats'}),e('p',{texto:'Conversaciones locales y recientes.'})])]),
    e('label',{clase:'fila-ajuste'},[e('span',{texto:'Recibir saludos espontáneos'}),recibir]),
    e('div',{clase:'selector-segmentado'},[e('button',{clase:`boton-segmentado ${orden==='recientes'?'activo':''}`,texto:'Más recientes',alclic:()=>actualizarEstadoGlobal(s=>{s.ajustesListadoConversaciones.orden='recientes';})}),e('button',{clase:`boton-segmentado ${orden==='antiguos'?'activo':''}`,texto:'Más antiguos',alclic:()=>actualizarEstadoGlobal(s=>{s.ajustesListadoConversaciones.orden='antiguos';})})]),
    e('div',{clase:'lista-conversaciones'},lista),
    e('details',{clase:'zona-peligro'},[e('summary',{texto:'Administrar conversaciones'}),e('button',{clase:'boton-secundario ancho-completo',type:'button',texto:'Borrar chat actual',alclic:()=>{if(confirm('¿Borrar el chat actual?'))borrarConversacion(estadoGlobalAplicacion.personajeActivoId);}}),e('button',{clase:'boton-secundario ancho-completo',type:'button',texto:'Eliminar todos los historiales archivados',alclic:()=>{if(confirm('¿Eliminar todos los historiales archivados?'))borrarTodosLosHistoriales();}})])
  ]);
}
