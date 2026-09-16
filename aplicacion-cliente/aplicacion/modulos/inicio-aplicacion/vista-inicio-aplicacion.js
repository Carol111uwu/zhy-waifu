import { crearElementoHtml as e } from '../../interfaz/crear-elemento-html.js';
import { estadoGlobalAplicacion, actualizarEstadoGlobal } from '../../estado-y-persistencia-aplicacion/estado-global-aplicacion.js';
import { irASeccion } from '../../navegacion-aplicacion/navegacion-entre-secciones.js';
import { obtenerPersonajesDisponibles } from '../personajes/registro-personajes-disponibles.js';
import { obtenerConversacion } from '../conversacion/controlador-conversacion-personaje.js';

function avatar(p){return p.avatarImagen?e('img',{clase:'avatar-personaje avatar-imagen avatar-grande',src:p.avatarImagen,alt:''}):e('div',{clase:'avatar-personaje avatar-grande',texto:p.avatarTexto||p.nombre[0]});}
function resumenUltimoMensaje(p){const l=obtenerConversacion(p.id);return l.length?l[l.length-1].texto.replace(/\*/g,'').slice(0,100):p.subtitulo||'Sin conversación todavía';}
export function renderizarVistaInicioAplicacion(){
  const personajes=obtenerPersonajesDisponibles();
  const tarjetas=personajes.map(p=>e('button',{clase:'tarjeta-personaje tarjeta-inicio-personaje',type:'button',alclic:()=>actualizarEstadoGlobal(s=>{s.personajeActivoId=p.id;s.seccionActual='conversacion';})},[avatar(p),e('div',{clase:'texto-tarjeta-personaje'},[e('strong',{texto:p.nombre}),e('span',{texto:p.subtitulo||''}),e('small',{texto:resumenUltimoMensaje(p)})]) ]));
  return e('section',{clase:'pagina-desplazable'},[
    e('div',{clase:'encabezado-pagina'},[e('div',{},[e('h1',{texto:'ZHY Companion'}),e('p',{texto:'Laboratorio de personajes y conversaciones. Demo es el personaje de prueba; Mack se añadirá después como perfil independiente.'})]),e('button',{clase:'boton-icono',type:'button',texto:'✉',alclic:()=>irASeccion('notificaciones')})]),
    e('div',{clase:'tarjeta-estado-proyecto'},[e('strong',{texto:'Modo seguro para pruebas'}),e('p',{texto:'Si el servidor de IA falla, el chat puede continuar con el motor offline de demostración. Tus claves de IA nunca se guardan en el frontend.'}),e('button',{clase:'boton-secundario',type:'button',texto:'Ver configuración de IA',alclic:()=>irASeccion('ajustes')})]),
    e('div',{clase:'cabecera-seccion-inicio'},[e('h2',{texto:'Mis personajes'}),e('button',{clase:'boton-principal',type:'button',texto:'+ Crear',alclic:()=>irASeccion('crearPersonaje')})]),
    e('div',{clase:'cuadricula-personajes'},tarjetas),
    e('div',{clase:'cabecera-seccion-inicio'},[e('h2',{texto:'Conversaciones'}),e('button',{clase:'boton-secundario',type:'button',texto:'Ver todos',alclic:()=>irASeccion('listaConversaciones')})]),
  ]);
}
