import { crearElementoHtml as e } from '../../../interfaz/crear-elemento-html.js';
import { estadoGlobalAplicacion, actualizarEstadoGlobal } from '../../../estado-y-persistencia-aplicacion/estado-global-aplicacion.js';
import { obtenerPersonajesDisponibles } from '../registro-personajes-disponibles.js';
import { irASeccion } from '../../../navegacion-aplicacion/navegacion-entre-secciones.js';
import { buscarModeloIA } from '../../../configuracion/catalogo-modelos-inteligencia-artificial.js';

function avatar(personaje){return personaje.avatarImagen?e('img',{clase:'avatar-personaje avatar-imagen avatar-grande',src:personaje.avatarImagen,alt:''}):e('div',{clase:'avatar-personaje avatar-grande',texto:personaje.avatarTexto||personaje.nombre[0]});}
export function renderizarCatalogoPersonajes(){
  const tarjetas=obtenerPersonajesDisponibles().map(personaje=>{
    const modelo=buscarModeloIA(personaje.modeloPreferidoId);
    return e('article',{clase:`tarjeta-personaje ${personaje.id===estadoGlobalAplicacion.personajeActivoId?'activa':''}`},[
      avatar(personaje),e('div',{clase:'texto-tarjeta-personaje'},[e('strong',{texto:personaje.nombre}),e('span',{texto:personaje.subtitulo||personaje.descripcion}),e('small',{texto:`${personaje.edad||'?'} años · ${(personaje.rasgos||[]).slice(0,4).join(' · ')}`}),e('small',{clase:'modelo-personaje',texto:`${modelo.nombreVisible}`})]),
      e('div',{clase:'acciones-tarjeta-personaje'},[
        e('button',{clase:'boton-principal',type:'button',texto:'Chat',alclic:()=>actualizarEstadoGlobal(s=>{s.personajeActivoId=personaje.id;s.seccionActual='conversacion';})}),
        e('button',{clase:'boton-secundario',type:'button',texto:'Detalles',alclic:()=>actualizarEstadoGlobal(s=>{s.parametroVista=personaje.id;s.seccionActual='detallesPersonaje';})})
      ])
    ]);
  });
  return e('section',{clase:'pagina-desplazable'},[
    e('div',{clase:'encabezado-pagina'},[e('div',{},[e('h1',{texto:'Personajes'}),e('p',{texto:'Demo es el laboratorio. Mack se incorporará después como un perfil nuevo e independiente.'})]),e('button',{clase:'boton-principal',texto:'+ Crear',alclic:()=>irASeccion('crearPersonaje')})]),
    e('div',{clase:'cuadricula-personajes'},tarjetas)
  ]);
}
