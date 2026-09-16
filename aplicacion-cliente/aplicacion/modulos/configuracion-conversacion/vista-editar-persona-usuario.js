import { crearElementoHtml as e } from '../../interfaz/crear-elemento-html.js';
import { estadoGlobalAplicacion, actualizarEstadoGlobal } from '../../estado-y-persistencia-aplicacion/estado-global-aplicacion.js';
import { irASeccion } from '../../navegacion-aplicacion/navegacion-entre-secciones.js';
function campo(etiqueta,control){return e('label',{clase:'campo-formulario'},[e('span',{texto:etiqueta}),control]);}
export function renderizarVistaEditarPersonaUsuario(){
 const p=estadoGlobalAplicacion.personaUsuario; const nombre=e('input',{value:p.nombre||''}); const apodo=e('input',{value:p.apodo||''}); const pronombres=e('input',{value:p.pronombres||''}); const descripcion=e('textarea',{rows:'7'});descripcion.value=p.descripcion||'';
 const guardar=()=>actualizarEstadoGlobal(s=>{s.personaUsuario={nombre:nombre.value.trim()||'Tú',apodo:apodo.value.trim(),pronombres:pronombres.value.trim(),descripcion:descripcion.value.trim()};s.seccionActual='configuracionConversacion';});
 return e('section',{clase:'pagina-desplazable pagina-angosta'},[
   e('div',{clase:'encabezado-pagina'},[e('button',{clase:'boton-icono',type:'button',texto:'←',alclic:()=>irASeccion('configuracionConversacion')}),e('div',{class:'titulo-flexible'},[e('h1',{texto:'Persona del usuario'}),e('p',{texto:'Cómo debe identificarte el personaje dentro de esta aplicación.'})])]),
   e('div',{clase:'formulario-personaje'},[campo('Nombre',nombre),campo('Apodo',apodo),campo('Pronombres',pronombres),campo('Descripción para el personaje',descripcion),e('button',{clase:'boton-principal ancho-completo',type:'button',texto:'Guardar persona',alclic:guardar})])
 ]);
}
