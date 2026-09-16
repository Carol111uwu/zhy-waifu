import { crearElementoHtml as e } from '../../interfaz/crear-elemento-html.js';
import { formatearHoraMensaje } from '../../interfaz/formatear-hora-mensaje.js';
import { estadoGlobalAplicacion, obtenerAjustesConversacion } from '../../estado-y-persistencia-aplicacion/estado-global-aplicacion.js';
import { irASeccion } from '../../navegacion-aplicacion/navegacion-entre-secciones.js';
import { obtenerPersonajePorId } from '../personajes/registro-personajes-disponibles.js';
import { analizarAccionesYDialogo } from './analizar-acciones-y-dialogo.js';
import { obtenerConversacion, asegurarSaludoInicial, enviarMensajeUsuario, regenerarUltimaRespuestaPersonaje } from './controlador-conversacion-personaje.js';
import { buscarModeloIA } from '../../configuracion/catalogo-modelos-inteligencia-artificial.js';
import { FONDOS_CONVERSACION, ESTILOS_BURBUJAS } from '../configuracion-conversacion/catalogo-apariencia-conversacion.js';
import { reproducirTextoConVozDispositivo } from '../voz-personaje/reproducir-texto-con-voz-dispositivo.js';

function renderizarAvatar(personaje,clase='avatar-mediano'){
  if(personaje.avatarImagen)return e('img',{clase:`avatar-personaje avatar-imagen ${clase}`,src:personaje.avatarImagen,alt:`Avatar de ${personaje.nombre}`});
  return e('div',{clase:`avatar-personaje ${clase}`,texto:personaje.avatarTexto||personaje.nombre?.[0]?.toUpperCase()||'?'});
}
function renderizarMensaje(mensaje,personaje){
  const contenido=e('div',{clase:'contenido-mensaje'});
  for(const parte of analizarAccionesYDialogo(mensaje.texto))contenido.append(e('div',{clase:parte.tipo==='accion'?'accion-narrativa':'dialogo-mensaje',texto:parte.tipo==='accion'?`*${parte.texto}*`:parte.texto}));
  if(mensaje.metadatos?.usoRespaldo)contenido.append(e('small',{clase:'etiqueta-respaldo-offline',texto:'Modo offline de respaldo'}));
  if(estadoGlobalAplicacion.preferencias.mostrarHoraMensajes)contenido.append(e('time',{clase:'hora-mensaje',texto:formatearHoraMensaje(mensaje.marcaTiempo)}));
  const acciones=[];
  if(mensaje.rol==='personaje'&&personaje.vozPreferida!=='sin-voz')acciones.push(e('button',{clase:'boton-accion-mensaje',type:'button',texto:'🔊',title:'Leer con voz del dispositivo',alclic:()=>{try{reproducirTextoConVozDispositivo(mensaje.texto);}catch(error){alert(error.message);}}}));
  return e('div',{clase:`fila-mensaje ${mensaje.rol==='usuario'?'mensaje-usuario':'mensaje-personaje'}`},[e('div',{clase:'burbuja-mensaje'},[contenido,...acciones])]);
}
export function renderizarVistaConversacion(){
  const personaje=obtenerPersonajePorId(estadoGlobalAplicacion.personajeActivoId);asegurarSaludoInicial(personaje.id);
  const ajustes=obtenerAjustesConversacion(personaje.id);const fondo=FONDOS_CONVERSACION.find(x=>x.id===ajustes.fondoConversacionId)||FONDOS_CONVERSACION[0];const burbuja=ESTILOS_BURBUJAS.find(x=>x.id===ajustes.estiloBurbujaId)||ESTILOS_BURBUJAS[0];
  const modelo=buscarModeloIA(estadoGlobalAplicacion.preferencias.modeloSeleccionadoId||personaje.modeloPreferidoId);
  const mensajes=e('div',{clase:`lista-mensajes ${fondo.clase} ${burbuja.clase}`,id:'lista-mensajes'},obtenerConversacion(personaje.id).map(m=>renderizarMensaje(m,personaje)));queueMicrotask(()=>{mensajes.scrollTop=mensajes.scrollHeight;});
  const entrada=e('textarea',{clase:'entrada-mensaje',rows:'1',placeholder:`Escribe a ${personaje.nombre}...`,'aria-label':'Mensaje'});const botonEnviar=e('button',{clase:'boton-enviar',type:'submit',texto:'➤','aria-label':'Enviar'});const formulario=e('form',{clase:'compositor-mensaje'},[entrada,botonEnviar]);
  formulario.addEventListener('submit',async evento=>{evento.preventDefault();const texto=entrada.value.trim();if(!texto)return;entrada.value='';entrada.style.height='auto';botonEnviar.disabled=true;try{await enviarMensajeUsuario(texto);}catch(error){alert(`No se pudo generar la respuesta: ${error.message}`);}finally{botonEnviar.disabled=false;}});
  entrada.addEventListener('input',()=>{entrada.style.height='auto';entrada.style.height=`${Math.min(entrada.scrollHeight,150)}px`;});entrada.addEventListener('keydown',evento=>{if(evento.key==='Enter'&&!evento.shiftKey&&window.innerWidth>=700){evento.preventDefault();formulario.requestSubmit();}});
  const encabezado=e('header',{clase:'encabezado-conversacion'},[renderizarAvatar(personaje),e('div',{clase:'titulo-conversacion'},[e('strong',{texto:ajustes.nombreChat||personaje.nombre}),e('span',{texto:`${modelo.nombreVisible} · ${personaje.subtitulo||'personaje de prueba'}`})]),e('button',{clase:'boton-icono',type:'button',texto:'⚙','aria-label':'Configurar chat',alclic:()=>irASeccion('configuracionConversacion')})]);
  const barraPruebas=e('div',{clase:'barra-pruebas-chat'},[e('span',{texto:'Personaje secundario de prueba'}),e('button',{type:'button',texto:'↻ Regenerar última',alclic:async()=>{try{await regenerarUltimaRespuestaPersonaje();}catch(err){alert(err.message);}}})]);
  return e('section',{clase:'pagina-conversacion'},[encabezado,barraPruebas,mensajes,formulario]);
}
