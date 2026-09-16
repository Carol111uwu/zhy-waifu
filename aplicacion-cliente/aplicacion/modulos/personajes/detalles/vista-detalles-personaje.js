import { crearElementoHtml as e } from '../../../interfaz/crear-elemento-html.js';
import { estadoGlobalAplicacion, actualizarEstadoGlobal } from '../../../estado-y-persistencia-aplicacion/estado-global-aplicacion.js';
import { irASeccion } from '../../../navegacion-aplicacion/navegacion-entre-secciones.js';
import { obtenerPersonajePorId } from '../registro-personajes-disponibles.js';

export function renderizarVistaDetallesPersonaje(){
  const p=obtenerPersonajePorId(estadoGlobalAplicacion.parametroVista||estadoGlobalAplicacion.personajeActivoId);
  const favorito=estadoGlobalAplicacion.favoritosPersonajes.includes(p.id);
  return e('section',{clase:'pagina-desplazable pagina-angosta'},[
    e('div',{clase:'encabezado-pagina'},[e('button',{clase:'boton-icono',type:'button',texto:'←',alclic:()=>irASeccion('personajes')}),e('h1',{texto:'Detalles del personaje'})]),
    e('article',{clase:'panel-detalles-personaje'},[
      p.avatarImagen?e('img',{clase:'avatar-detalle-personaje',src:p.avatarImagen,alt:''}):e('div',{clase:'avatar-detalle-personaje avatar-texto-grande',texto:p.avatarTexto||p.nombre[0]}),
      e('small',{texto:p.categoria||'Personaje'}),e('h2',{texto:p.nombre}),e('p',{clase:'subtitulo-detalle-personaje',texto:p.subtitulo||''}),
      e('div',{clase:'etiquetas-personaje'},(p.etiquetas||[]).map(x=>e('span',{texto:x}))),
      e('p',{texto:p.descripcion||''}),
      e('div',{clase:'acciones-detalle-personaje'},[
        e('button',{clase:'boton-principal',type:'button',texto:'💬 Chat',alclic:()=>actualizarEstadoGlobal(s=>{s.personajeActivoId=p.id;s.seccionActual='conversacion';s.parametroVista=null;})}),
        e('button',{clase:'boton-secundario',type:'button',texto:'✎ Editar',alclic:()=>actualizarEstadoGlobal(s=>{s.personajeActivoId=p.id;s.seccionActual='editarPersonaje';s.parametroVista=null;})}),
        e('button',{clase:'boton-secundario',type:'button',texto:favorito?'★ Favorito':'☆ Favorito',alclic:()=>actualizarEstadoGlobal(s=>{s.favoritosPersonajes=favorito?s.favoritosPersonajes.filter(id=>id!==p.id):[...s.favoritosPersonajes,p.id];})})
      ])
    ])
  ]);
}
