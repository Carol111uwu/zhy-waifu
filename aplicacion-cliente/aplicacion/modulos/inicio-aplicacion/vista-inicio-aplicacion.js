import { crearElementoHtml as e } from '../../interfaz/crear-elemento-html.js';
import { estadoGlobalAplicacion, actualizarEstadoGlobal } from '../../estado-y-persistencia-aplicacion/estado-global-aplicacion.js';
import { irASeccion } from '../../navegacion-aplicacion/navegacion-entre-secciones.js';
import { obtenerPersonajesDisponibles } from '../personajes/registro-personajes-disponibles.js';
import { obtenerConversacion } from '../conversacion/controlador-conversacion-personaje.js';
function avatar(p){return p.avatarImagen?e('img',{clase:'avatar-personaje avatar-imagen avatar-biblioteca',src:p.avatarImagen,alt:''}):e('div',{clase:'avatar-personaje avatar-biblioteca',texto:p.avatarTexto||p.nombre[0]});}
function abrir(p){actualizarEstadoGlobal(s=>{s.personajeActivoId=p.id;s.seccionActual='detallesPersonaje';});}
function ultimo(p){const l=obtenerConversacion(p.id),m=l.at(-1);return(m?.texto||p.saludoInicial||'').replace(/\*/g,' ').replace(/\s+/g,' ').trim().slice(0,78);}
function tarjeta(p){const fav=estadoGlobalAplicacion.favoritosPersonajes.includes(p.id);return e('article',{clase:'tarjeta-biblioteca-personaje'},[e('button',{clase:'zona-principal-tarjeta-biblioteca',type:'button',alclic:()=>abrir(p)},[avatar(p),e('div',{clase:'texto-tarjeta-biblioteca'},[e('strong',{texto:p.nombre}),e('span',{texto:p.subtitulo||'Personaje'}),e('small',{texto:ultimo(p)})])]),e('button',{clase:`boton-favorito ${fav?'activo':''}`,type:'button',texto:fav?'★':'☆',alclic:()=>actualizarEstadoGlobal(s=>{s.favoritosPersonajes=fav?s.favoritosPersonajes.filter(id=>id!==p.id):[...s.favoritosPersonajes,p.id];})})]);}
export function renderizarVistaInicioAplicacion(){
 const todos=obtenerPersonajesDisponibles(),q=(estadoGlobalAplicacion.busquedaPersonajes||'').toLowerCase(),favoritos=estadoGlobalAplicacion.pestanaInicio==='favoritos';
 const filtrados=todos.filter(p=>(!favoritos||estadoGlobalAplicacion.favoritosPersonajes.includes(p.id))&&(!q||`${p.nombre} ${p.subtitulo||''} ${(p.etiquetas||[]).join(' ')}`.toLowerCase().includes(q)));
 const buscar=e('input',{class:'entrada-busqueda',placeholder:'Buscar personajes...','aria-label':'Buscar personajes',value:estadoGlobalAplicacion.busquedaPersonajes||''});buscar.addEventListener('input',()=>actualizarEstadoGlobal(s=>{s.busquedaPersonajes=buscar.value;}));
 return e('section',{clase:'pagina-desplazable pagina-app-movil'},[
  e('header',{clase:'cabecera-app-principal'},[e('div',{},[e('small',{texto:'ZHY'}),e('h1',{texto:'Companion'})]),e('button',{clase:'boton-icono-limpio',type:'button',texto:'🔔',alclic:()=>irASeccion('notificaciones')})]),
  buscar,
  e('div',{clase:'pestanas-lineales'},[e('button',{clase:!favoritos?'activa':'',texto:'Mis personajes',alclic:()=>actualizarEstadoGlobal(s=>{s.pestanaInicio='personajes';})}),e('button',{clase:favoritos?'activa':'',texto:'Favoritos',alclic:()=>actualizarEstadoGlobal(s=>{s.pestanaInicio='favoritos';})})]),
  e('div',{clase:'encabezado-lista-compacto'},[e('strong',{texto:favoritos?'Favoritos':'Biblioteca'}),e('button',{type:'button',texto:'+ Crear',alclic:()=>irASeccion('crearPersonaje')})]),
  e('div',{clase:'lista-biblioteca-personajes'},filtrados.length?filtrados.map(tarjeta):[e('div',{clase:'estado-vacio-grande'},[e('span',{texto:'◌'}),e('strong',{texto:'No hay personajes aquí'}),e('p',{texto:favoritos?'Marca un personaje con ★ para verlo aquí.':'Crea tu primer personaje para empezar.'})])]),
 ]);
}
