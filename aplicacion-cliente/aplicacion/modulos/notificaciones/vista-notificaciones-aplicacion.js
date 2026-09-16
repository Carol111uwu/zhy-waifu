import { crearElementoHtml as e } from '../../interfaz/crear-elemento-html.js';
import { NOTIFICACIONES_APLICACION } from './catalogo-notificaciones-aplicacion.js';
export function renderizarVistaNotificacionesAplicacion(){
  return e('section',{clase:'pagina-desplazable pagina-angosta'},[
    e('div',{clase:'encabezado-pagina'},[e('div',{},[e('h1',{texto:'Mensajes'}),e('p',{texto:'Avisos de la aplicación, modelos y pruebas. No se mezcla con las conversaciones de personajes.'})])]),
    e('div',{clase:'lista-notificaciones'},NOTIFICACIONES_APLICACION.map(n=>e('article',{clase:'tarjeta-notificacion'},[
      e('div',{clase:'cabecera-notificacion'},[e('span',{clase:'icono-notificacion',texto:n.tipo==='modelos'?'🧠':'⚙'}),e('strong',{texto:n.titulo}),e('small',{texto:n.fecha})]),
      e('p',{texto:n.texto})
    ])))
  ]);
}
