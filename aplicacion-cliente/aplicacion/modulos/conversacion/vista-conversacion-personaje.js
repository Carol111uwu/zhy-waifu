import { crearElementoHtml as e } from '../../interfaz/crear-elemento-html.js';
import { formatearHoraMensaje } from '../../interfaz/formatear-hora-mensaje.js';
import { estadoGlobalAplicacion, obtenerAjustesConversacion } from '../../estado-y-persistencia-aplicacion/estado-global-aplicacion.js';
import { irASeccion } from '../../navegacion-aplicacion/navegacion-entre-secciones.js';
import { obtenerPersonajePorId } from '../personajes/registro-personajes-disponibles.js';
import { analizarAccionesYDialogo } from './analizar-acciones-y-dialogo.js';
import { obtenerConversacion, asegurarSaludoInicial, enviarMensajeUsuario, regenerarUltimaRespuestaPersonaje, generarAlternativaParaMensaje, cambiarAlternativaMensaje, editarMensaje, eliminarMensaje, rebobinarDesdeMensaje, guardarBorrador } from './controlador-conversacion-personaje.js';
import { buscarModeloIA } from '../../configuracion/catalogo-modelos-inteligencia-artificial.js';
import { FONDOS_CONVERSACION, ESTILOS_BURBUJAS } from '../configuracion-conversacion/catalogo-apariencia-conversacion.js';
import { reproducirTextoConVozDispositivo } from '../voz-personaje/reproducir-texto-con-voz-dispositivo.js';
import { agregarTarjetaMemoria } from '../tarjetas-memoria/gestor-tarjetas-memoria.js';

function renderizarAvatar(personaje,clase='avatar-mediano'){if(personaje.avatarImagen)return e('img',{clase:`avatar-personaje avatar-imagen ${clase}`,src:personaje.avatarImagen,alt:`Avatar de ${personaje.nombre}`});return e('div',{clase:`avatar-personaje ${clase}`,texto:personaje.avatarTexto||personaje.nombre?.[0]?.toUpperCase()||'?'});}
function cerrarHoja(overlay){overlay.remove();}
function copiarTexto(texto){if(navigator.clipboard?.writeText)return navigator.clipboard.writeText(texto).catch(()=>{});const t=document.createElement('textarea');t.value=texto;document.body.append(t);t.select();document.execCommand('copy');t.remove();}
function mostrarHojaAccionesMensaje(mensaje,personaje){
 const overlay=e('div',{clase:'overlay-hoja-acciones'}),hoja=e('div',{clase:'hoja-acciones-mensaje'}),titulo=e('div',{clase:'tirador-hoja'});
 const boton=(texto,accion,peligro=false)=>e('button',{clase:`opcion-hoja-mensaje ${peligro?'peligro':''}`,type:'button',texto,alclic:async()=>{cerrarHoja(overlay);await accion();}});
 const botones=[boton('Copiar',()=>copiarTexto(mensaje.texto))];
 if(mensaje.rol==='usuario')botones.push(boton('Editar mensaje',()=>{const nuevo=prompt('Editar mensaje',mensaje.texto);if(nuevo!=null&&nuevo.trim())editarMensaje(mensaje.id,nuevo);}));
 if(mensaje.rol==='personaje'){
  botones.push(boton('Generar otra respuesta',async()=>{try{await generarAlternativaParaMensaje(mensaje.id);}catch(err){alert(err.message);}}));
  botones.push(boton('Guardar como tarjeta de memoria',()=>agregarTarjetaMemoria(personaje.id,{titulo:'Recuerdo desde el chat',categoria:'Conversación',contenido:mensaje.texto,origen:'chat'})));
  if(personaje.vozPreferida!=='sin-voz')botones.push(boton('Leer en voz alta',()=>reproducirTextoConVozDispositivo(mensaje.texto)));
 }
 botones.push(boton('Rebobinar desde aquí',()=>{if(confirm('Se guardará lo que viene después como una rama y el chat volverá a este punto.'))rebobinarDesdeMensaje(mensaje.id);}));
 botones.push(boton('Eliminar mensaje',()=>{if(confirm('¿Eliminar este mensaje?'))eliminarMensaje(mensaje.id);},true));
 hoja.append(titulo,e('strong',{clase:'titulo-hoja-mensaje',texto:mensaje.rol==='usuario'?'Tu mensaje':mensaje.rol==='personaje'?personaje.nombre:'Sistema'}),...botones,e('button',{clase:'opcion-hoja-mensaje cancelar',type:'button',texto:'Cancelar',alclic:()=>cerrarHoja(overlay)}));overlay.append(hoja);overlay.addEventListener('click',ev=>{if(ev.target===overlay)cerrarHoja(overlay);});document.body.append(overlay);
}
function renderizarMensaje(mensaje,personaje){
 if(mensaje.rol==='sistema-error')return e('div',{clase:'mensaje-sistema-error'},[e('strong',{texto:'⚠ La IA no respondió'}),e('span',{texto:mensaje.texto}),e('small',{texto:'Puedes seguir usando la app, reintentar o cambiar de modelo.'})]);
 const contenido=e('div',{clase:'contenido-mensaje'});for(const parte of analizarAccionesYDialogo(mensaje.texto))contenido.append(e('div',{clase:parte.tipo==='accion'?'accion-narrativa':'dialogo-mensaje',texto:parte.tipo==='accion'?`*${parte.texto}*`:parte.texto}));
 if(mensaje.metadatos?.usoRespaldo)contenido.append(e('small',{clase:'etiqueta-respaldo-offline',texto:'Respaldo offline'}));if(estadoGlobalAplicacion.preferencias.mostrarHoraMensajes)contenido.append(e('time',{clase:'hora-mensaje',texto:formatearHoraMensaje(mensaje.marcaTiempo)}));
 const alts=mensaje.metadatos?.alternativas||[],indice=Number(mensaje.metadatos?.indiceAlternativa||0),alternativas=alts.length>1?e('div',{clase:'selector-alternativas-respuesta'},[e('button',{type:'button',texto:'‹',alclic:()=>cambiarAlternativaMensaje(mensaje.id,-1)}),e('span',{texto:`${indice+1}/${alts.length}`}),e('button',{type:'button',texto:'›',alclic:()=>cambiarAlternativaMensaje(mensaje.id,1)})]):null;
 return e('div',{clase:`fila-mensaje ${mensaje.rol==='usuario'?'mensaje-usuario':'mensaje-personaje'}`},[e('div',{clase:'contenedor-burbuja-con-opciones'},[e('div',{clase:'burbuja-mensaje'},[contenido,alternativas]),e('button',{clase:'boton-menu-mensaje',type:'button',texto:'⋯','aria-label':'Opciones del mensaje',alclic:()=>mostrarHojaAccionesMensaje(mensaje,personaje)})])]);
}
export function renderizarVistaConversacion(){
 const personaje=obtenerPersonajePorId(estadoGlobalAplicacion.personajeActivoId);asegurarSaludoInicial(personaje.id);const ajustes=obtenerAjustesConversacion(personaje.id),fondo=FONDOS_CONVERSACION.find(x=>x.id===ajustes.fondoConversacionId)||FONDOS_CONVERSACION[0],burbuja=ESTILOS_BURBUJAS.find(x=>x.id===ajustes.estiloBurbujaId)||ESTILOS_BURBUJAS[0],modelo=buscarModeloIA(ajustes.modeloId||personaje.modeloPreferidoId||'servidor-inteligencia-con-respaldo');
 const mensajes=e('div',{clase:`lista-mensajes ${fondo.clase} ${burbuja.clase}`,id:'lista-mensajes'},obtenerConversacion(personaje.id).map(m=>renderizarMensaje(m,personaje)));queueMicrotask(()=>{mensajes.scrollTop=mensajes.scrollHeight;});
 const entrada=e('textarea',{clase:'entrada-mensaje',rows:'1',placeholder:`Mensaje para ${personaje.nombre}...`,'aria-label':'Mensaje'});entrada.value=estadoGlobalAplicacion.borradoresPorPersonaje[personaje.id]||'';
 const botonMas=e('button',{clase:'boton-compositor-secundario',type:'button',texto:'＋','aria-label':'Más opciones',alclic:()=>irASeccion('cajaMemoria')});const botonEnviar=e('button',{clase:'boton-enviar',type:'submit',texto:'➤','aria-label':'Enviar'});const formulario=e('form',{clase:'compositor-mensaje'},[botonMas,entrada,botonEnviar]);
 formulario.addEventListener('submit',async ev=>{ev.preventDefault();const texto=entrada.value.trim();if(!texto)return;entrada.value='';botonEnviar.disabled=true;try{await enviarMensajeUsuario(texto);}catch(error){console.warn(error);}finally{botonEnviar.disabled=false;}});entrada.addEventListener('blur',()=>guardarBorrador(personaje.id,entrada.value));entrada.addEventListener('input',()=>{entrada.style.height='auto';entrada.style.height=`${Math.min(entrada.scrollHeight,150)}px`;});
 const encabezado=e('header',{clase:'encabezado-conversacion'},[e('button',{clase:'boton-icono-limpio',type:'button',texto:'←',alclic:()=>irASeccion('listaConversaciones')}),renderizarAvatar(personaje),e('button',{clase:'titulo-conversacion titulo-conversacion-clic',type:'button',alclic:()=>irASeccion('detallesPersonaje')},[e('strong',{texto:ajustes.nombreChat||personaje.nombre}),e('span',{texto:personaje.subtitulo||'Personaje'})]),e('button',{clase:'chip-modelo-chat',type:'button',texto:modelo.nombreVisible.replace(' · vía servidor','').replace('Automático · ','Auto · '),alclic:()=>irASeccion('seleccionarModeloChat')}),e('button',{clase:'boton-icono-limpio',type:'button',texto:'⋮','aria-label':'Configurar chat',alclic:()=>irASeccion('configuracionConversacion')})]);
 return e('section',{clase:'pagina-conversacion'},[encabezado,mensajes,formulario]);
}
