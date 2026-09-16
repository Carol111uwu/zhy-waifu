import { crearElementoHtml as e } from '../../interfaz/crear-elemento-html.js';
import { estadoGlobalAplicacion, actualizarEstadoGlobal } from '../../estado-y-persistencia-aplicacion/estado-global-aplicacion.js';
import { irASeccion } from '../../navegacion-aplicacion/navegacion-entre-secciones.js';
import { obtenerPersonajePorId } from '../personajes/registro-personajes-disponibles.js';
import { obtenerHistorialArchivado } from './controlador-conversacion-personaje.js';
export function renderizarVistaHistorialConversaciones(){
 const id=estadoGlobalAplicacion.personajeActivoId;const personaje=obtenerPersonajePorId(id);const archivos=obtenerHistorialArchivado(id);
 const tarjetas=archivos.length?archivos.map(a=>e('article',{clase:'tarjeta-historial'},[
  e('div',{clase:'cabecera-historial'},[e('strong',{texto:new Date(a.fecha).toLocaleString('es-PE')}),e('span',{texto:`${a.mensajes.length} mensajes`})]),
  e('p',{texto:(a.mensajes.find(m=>m.rol==='usuario')?.texto||a.mensajes[0]?.texto||'Sin contenido').slice(0,180)}),
  e('button',{clase:'boton-secundario',type:'button',texto:'Restaurar como chat actual',alclic:()=>{if(confirm('Esto reemplazará el chat actual. ¿Continuar?'))actualizarEstadoGlobal(s=>{s.conversaciones[id]=a.mensajes;s.seccionActual='conversacion';});}})
 ])): [e('div',{clase:'tarjeta-informativa'},[e('strong',{texto:'Sin chats archivados'}),e('p',{texto:'Cuando uses “Nuevo Chat”, el chat anterior aparecerá aquí.'})])];
 return e('section',{clase:'pagina-desplazable pagina-angosta'},[e('div',{clase:'encabezado-pagina'},[e('button',{clase:'boton-icono',type:'button',texto:'←',alclic:()=>irASeccion('configuracionConversacion')}),e('div',{class:'titulo-flexible'},[e('h1',{texto:'Historial'}),e('p',{texto:`Conversaciones archivadas con ${personaje.nombre}.`})])]),e('div',{clase:'lista-historial'},tarjetas)]);
}
