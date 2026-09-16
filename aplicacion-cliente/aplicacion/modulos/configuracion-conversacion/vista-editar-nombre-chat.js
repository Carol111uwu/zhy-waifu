import { crearElementoHtml as e } from '../../interfaz/crear-elemento-html.js';
import { estadoGlobalAplicacion, obtenerAjustesConversacion, actualizarAjustesConversacion } from '../../estado-y-persistencia-aplicacion/estado-global-aplicacion.js';
import { irASeccion } from '../../navegacion-aplicacion/navegacion-entre-secciones.js';
export function renderizarVistaEditarNombreChat(){
 const id=estadoGlobalAplicacion.personajeActivoId; const a=obtenerAjustesConversacion(id); const input=e('input',{value:a.nombreChat||'',placeholder:'Nombre visible del chat',maxlength:'60'});
 return e('section',{clase:'pagina-desplazable pagina-angosta'},[e('div',{clase:'encabezado-pagina'},[e('button',{clase:'boton-icono',type:'button',texto:'←',alclic:()=>irASeccion('configuracionConversacion')}),e('h1',{texto:'Nombre del chat'})]),e('label',{clase:'campo-formulario'},[e('span',{texto:'Nombre'}),input]),e('button',{clase:'boton-principal ancho-completo',type:'button',texto:'Guardar nombre',alclic:()=>{actualizarAjustesConversacion(id,{nombreChat:input.value.trim()});irASeccion('configuracionConversacion');}})]);
}
