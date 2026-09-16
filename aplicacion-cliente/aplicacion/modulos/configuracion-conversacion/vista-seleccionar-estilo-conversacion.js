import { crearElementoHtml as e } from '../../interfaz/crear-elemento-html.js';
import { estadoGlobalAplicacion, obtenerAjustesConversacion, actualizarAjustesConversacion, actualizarEstadoGlobal } from '../../estado-y-persistencia-aplicacion/estado-global-aplicacion.js';
import { irASeccion } from '../../navegacion-aplicacion/navegacion-entre-secciones.js';
import { ESTILOS_CONVERSACION } from './catalogo-estilos-conversacion.js';
export function renderizarVistaSeleccionarEstiloConversacion(){
 const id=estadoGlobalAplicacion.personajeActivoId; const actual=obtenerAjustesConversacion(id).estiloConversacionId;
 return e('section',{clase:'pagina-desplazable pagina-angosta'},[
  e('div',{clase:'encabezado-pagina'},[e('button',{clase:'boton-icono',type:'button',texto:'←',alclic:()=>irASeccion('configuracionConversacion')}),e('div',{class:'titulo-flexible'},[e('h1',{texto:'Estilo de chat'}),e('p',{texto:'Cambia el comportamiento de esta conversación sin alterar la personalidad base.'})])]),
  e('div',{clase:'lista-opciones-chat'},ESTILOS_CONVERSACION.map(x=>e('button',{clase:`tarjeta-opcion-chat ${x.id===actual?'seleccionada':''}`,type:'button',alclic:()=>{actualizarAjustesConversacion(id,{estiloConversacionId:x.id});actualizarEstadoGlobal(s=>{s.preferencias.creatividad=x.creatividad;s.preferencias.frecuenciaAccionesNarrativas=x.frecuenciaAcciones;s.preferencias.perfilLongitudRespuesta=x.longitud;});}},[e('strong',{texto:x.nombre}),e('p',{texto:x.descripcion})])))
 ]);
}
