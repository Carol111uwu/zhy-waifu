import { crearElementoHtml as e } from '../../interfaz/crear-elemento-html.js';
import { estadoGlobalAplicacion, actualizarEstadoGlobal } from '../../estado-y-persistencia-aplicacion/estado-global-aplicacion.js';
import { irASeccion } from '../../navegacion-aplicacion/navegacion-entre-secciones.js';
function campo(etiqueta,control,ayuda=''){return e('label',{clase:'campo-formulario'},[e('span',{texto:etiqueta}),ayuda?e('small',{texto:ayuda}):null,control]);}
export function renderizarVistaEditarPersonaUsuario(){
 const p=estadoGlobalAplicacion.personaUsuario,volverA=typeof estadoGlobalAplicacion.parametroVista==='string'&&['perfil','configuracionConversacion'].includes(estadoGlobalAplicacion.parametroVista)?estadoGlobalAplicacion.parametroVista:'configuracionConversacion';
 const nombre=e('input',{value:p.nombre||''}),apodo=e('input',{value:p.apodo||''}),pronombres=e('input',{value:p.pronombres||''}),genero=e('input',{value:p.genero||'',placeholder:'Opcional'}),avatar=e('input',{type:'url',value:p.avatarImagen||'',placeholder:'https://...'}),descripcion=e('textarea',{rows:'6'}),gustos=e('textarea',{rows:'4'}),limites=e('textarea',{rows:'4'});descripcion.value=p.descripcion||'';gustos.value=p.gustos||'';limites.value=p.limites||'';
 const guardar=()=>actualizarEstadoGlobal(s=>{s.personaUsuario={...s.personaUsuario,nombre:nombre.value.trim()||'Tú',apodo:apodo.value.trim(),pronombres:pronombres.value.trim(),genero:genero.value.trim(),avatarImagen:avatar.value.trim(),descripcion:descripcion.value.trim(),gustos:gustos.value.trim(),limites:limites.value.trim()};s.seccionActual=volverA;s.parametroVista=null;});
 return e('section',{clase:'pagina-desplazable pagina-angosta'},[
  e('div',{clase:'encabezado-pagina'},[e('button',{clase:'boton-icono',type:'button',texto:'←',alclic:()=>irASeccion(volverA)}),e('div',{clase:'titulo-flexible'},[e('h1',{texto:'Persona del usuario'}),e('p',{texto:'Tu perfil es independiente de cada personaje y puede reutilizarse entre chats.'})])]),
  e('div',{clase:'formulario-personaje'},[campo('Nombre',nombre),campo('Apodo',apodo),campo('Pronombres',pronombres),campo('Género / identidad',genero),campo('Avatar por URL',avatar,'Opcional.'),campo('Biografía para los personajes',descripcion),campo('Gustos y preferencias',gustos,'Información estable que puede ayudar a personalizar respuestas.'),campo('Límites o cosas a evitar',limites,'Se envía como contexto del usuario cuando corresponde.'),e('button',{clase:'boton-principal ancho-completo',type:'button',texto:'Guardar persona',alclic:guardar})])
 ]);
}
