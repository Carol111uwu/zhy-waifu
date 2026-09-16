import { crearElementoHtml as e } from '../../interfaz/crear-elemento-html.js';
import { estadoGlobalAplicacion } from '../../estado-y-persistencia-aplicacion/estado-global-aplicacion.js';
import { irASeccion } from '../../navegacion-aplicacion/navegacion-entre-secciones.js';
import { obtenerPersonajePorId } from '../personajes/registro-personajes-disponibles.js';
import { obtenerMemoriaEditable, guardarMemoriaEditable } from './gestor-memoria-editable-personaje.js';
import { obtenerTarjetasMemoria, agregarTarjetaMemoria, eliminarTarjetaMemoria } from '../tarjetas-memoria/gestor-tarjetas-memoria.js';

function tarjetaRecuerdo(recuerdo){return e('article',{clase:'tarjeta-recuerdo-automatico'},[e('small',{texto:recuerdo.tipo||'recuerdo'}),e('p',{texto:recuerdo.contenido}),e('span',{texto:`Confianza ${Math.round((recuerdo.confianza||0)*100)}%`})]);}
function tarjetaMemoria(personajeId,tarjeta){return e('article',{clase:'tarjeta-memoria-manual'},[e('div',{clase:'cabecera-tarjeta-memoria'},[e('strong',{texto:tarjeta.titulo}),e('button',{clase:'boton-icono boton-icono-pequeno',type:'button',texto:'🗑',alclic:()=>eliminarTarjetaMemoria(personajeId,tarjeta.id)})]),e('small',{texto:tarjeta.categoria||'General'}),e('p',{texto:tarjeta.contenido})]);}
export function renderizarVistaCajaMemoriaPersonaje(){
  const personaje=obtenerPersonajePorId(estadoGlobalAplicacion.personajeActivoId);
  const area=e('textarea',{clase:'area-memoria-personaje',rows:'12'});area.value=obtenerMemoriaEditable(personaje.id);
  const titulo=e('input',{placeholder:'Título de tarjeta'});const categoria=e('input',{placeholder:'Categoría · relación, gusto, lore...'});const contenido=e('textarea',{rows:'4',placeholder:'Contenido de la tarjeta de memoria'});
  const automaticosUsuario=estadoGlobalAplicacion.memoriasAutomaticasUsuario||[];
  const automaticosPersonaje=estadoGlobalAplicacion.memoriasAutomaticasPorPersonaje[personaje.id]||[];
  const tarjetas=obtenerTarjetasMemoria(personaje.id);
  const bloqueTarjetas=e('div',{clase:'lista-tarjetas-memoria'},tarjetas.length?tarjetas.map(t=>tarjetaMemoria(personaje.id,t)):[e('p',{clase:'estado-vacio',texto:'Todavía no hay tarjetas de memoria.'})]);
  return e('section',{clase:'pagina-desplazable pagina-angosta'},[
    e('div',{clase:'encabezado-pagina'},[e('button',{clase:'boton-icono',type:'button',texto:'←',alclic:()=>irASeccion('configuracionConversacion')}),e('div',{clase:'titulo-flexible'},[e('h1',{texto:'Caja de memoria'}),e('p',{texto:`Memoria manual, automática y tarjetas independientes para ${personaje.nombre}.`})])]),
    e('div',{clase:'tarjeta-informativa'},[e('strong',{texto:'Memoria automática'}),e('p',{texto:'La versión actual detecta hechos sencillos como gustos, preferencias, nombre o cumpleaños. En el servidor se podrá ampliar con extracción por IA sin bloquear el chat.'})]),
    e('h2',{texto:'Sobre ti'}),e('div',{clase:'lista-recuerdos-automaticos'},automaticosUsuario.length?automaticosUsuario.map(tarjetaRecuerdo):[e('p',{clase:'estado-vacio',texto:'Aún no hay recuerdos automáticos del usuario.'})]),
    e('h2',{texto:`Sobre ${personaje.nombre}`}),e('div',{clase:'lista-recuerdos-automaticos'},automaticosPersonaje.length?automaticosPersonaje.map(tarjetaRecuerdo):[e('p',{clase:'estado-vacio',texto:'Aún no hay recuerdos automáticos del personaje.'})]),
    e('h2',{texto:'Memoria base editable'}),e('p',{clase:'explicacion-ajuste',texto:'Una idea por línea. Se envía como contexto estable al modelo.'}),area,
    e('button',{clase:'boton-secundario ancho-completo',type:'button',texto:'Guardar memoria base',alclic:()=>guardarMemoriaEditable(personaje.id,area.value)}),
    e('h2',{texto:`Tarjetas de memoria (${tarjetas.length}/100)`}),e('div',{clase:'formulario-tarjeta-memoria'},[titulo,categoria,contenido,e('button',{clase:'boton-principal',type:'button',texto:'+ Agregar tarjeta',alclic:()=>{if(!contenido.value.trim())return;agregarTarjetaMemoria(personaje.id,{titulo:titulo.value,categoria:categoria.value||'General',contenido:contenido.value});titulo.value='';categoria.value='';contenido.value='';}})]),
    bloqueTarjetas,
  ]);
}
