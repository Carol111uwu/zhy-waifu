import { estadoGlobalAplicacion, suscribirseCambiosEstado } from './estado-y-persistencia-aplicacion/estado-global-aplicacion.js';
import { irASeccion } from './navegacion-aplicacion/navegacion-entre-secciones.js';
import { crearElementoHtml as e } from './interfaz/crear-elemento-html.js';
import { renderizarVistaInicioAplicacion } from './modulos/inicio-aplicacion/vista-inicio-aplicacion.js';
import { renderizarVistaConversacion } from './modulos/conversacion/vista-conversacion-personaje.js';
import { renderizarVistaListadoConversaciones } from './modulos/listado-conversaciones/vista-listado-conversaciones.js';
import { renderizarCatalogoPersonajes } from './modulos/personajes/catalogo/vista-catalogo-personajes.js';
import { renderizarVistaDetallesPersonaje } from './modulos/personajes/detalles/vista-detalles-personaje.js';
import { renderizarVistaCrearPersonaje } from './modulos/personajes/creador/vista-crear-personaje.js';
import { renderizarVistaEditarPersonaje } from './modulos/personajes/editor/vista-editar-personaje.js';
import { renderizarVistaConfiguracionAvanzadaModelo } from './modulos/modelos-ia/configuracion-avanzada/vista-configuracion-avanzada-modelo.js';
import { renderizarVistaAjustes } from './modulos/ajustes/vista-ajustes-generales.js';
import { renderizarVistaConfiguracionConversacion } from './modulos/configuracion-conversacion/vista-configuracion-conversacion.js';
import { renderizarVistaSeleccionarEstiloConversacion } from './modulos/configuracion-conversacion/vista-seleccionar-estilo-conversacion.js';
import { renderizarVistaEditarPersonaUsuario } from './modulos/configuracion-conversacion/vista-editar-persona-usuario.js';
import { renderizarVistaEditarNombreChat } from './modulos/configuracion-conversacion/vista-editar-nombre-chat.js';
import { renderizarVistaSeleccionarFondoConversacion } from './modulos/configuracion-conversacion/vista-seleccionar-fondo-conversacion.js';
import { renderizarVistaSeleccionarBurbujaConversacion } from './modulos/configuracion-conversacion/vista-seleccionar-burbuja-conversacion.js';
import { renderizarVistaHistorialConversaciones } from './modulos/conversacion/vista-historial-conversaciones.js';
import { renderizarVistaCajaMemoriaPersonaje } from './modulos/memoria-personaje/vista-caja-memoria-personaje.js';
import { renderizarVistaMusicaFondoConversacion } from './modulos/musica-conversacion/vista-musica-fondo-conversacion.js';
import { renderizarVistaNotificacionesAplicacion } from './modulos/notificaciones/vista-notificaciones-aplicacion.js';
import { renderizarVistaPerfilAplicacion } from './modulos/perfil-aplicacion/vista-perfil-aplicacion.js';
import { renderizarVistaCentroCreacion } from './modulos/centro-creacion/vista-centro-creacion.js';
import { renderizarVistaSeleccionarModeloChat } from './modulos/modelos-ia/vista-seleccionar-modelo-chat.js';
import { renderizarVistaRamasConversacion } from './modulos/conversacion/vista-ramas-conversacion.js';

const raiz=document.querySelector('#raiz-aplicacion');
const vistas={inicio:renderizarVistaInicioAplicacion,conversacion:renderizarVistaConversacion,listaConversaciones:renderizarVistaListadoConversaciones,personajes:renderizarCatalogoPersonajes,detallesPersonaje:renderizarVistaDetallesPersonaje,crearPersonaje:renderizarVistaCrearPersonaje,editarPersonaje:renderizarVistaEditarPersonaje,configuracionModeloIA:renderizarVistaConfiguracionAvanzadaModelo,ajustes:renderizarVistaAjustes,configuracionConversacion:renderizarVistaConfiguracionConversacion,seleccionarEstiloConversacion:renderizarVistaSeleccionarEstiloConversacion,editarPersonaUsuario:renderizarVistaEditarPersonaUsuario,editarNombreChat:renderizarVistaEditarNombreChat,seleccionarFondoConversacion:renderizarVistaSeleccionarFondoConversacion,seleccionarBurbujaConversacion:renderizarVistaSeleccionarBurbujaConversacion,historialConversaciones:renderizarVistaHistorialConversaciones,cajaMemoria:renderizarVistaCajaMemoriaPersonaje,musicaFondo:renderizarVistaMusicaFondoConversacion,notificaciones:renderizarVistaNotificacionesAplicacion,perfil:renderizarVistaPerfilAplicacion,centroCreacion:renderizarVistaCentroCreacion,seleccionarModeloChat:renderizarVistaSeleccionarModeloChat,ramasConversacion:renderizarVistaRamasConversacion};
function botonNavegacion(seccion,icono,etiqueta,especial=false){return e('button',{clase:`boton-navegacion ${estadoGlobalAplicacion.seccionActual===seccion?'activo':''} ${especial?'boton-navegacion-crear':''}`,type:'button',alclic:()=>irASeccion(seccion),'aria-label':etiqueta},[e('span',{clase:'icono-navegacion',texto:icono}),e('span',{clase:'texto-navegacion',texto:etiqueta})]);}
function renderizarAplicacion(){
 raiz.innerHTML='';
 const ocultarNavegacion=['conversacion','configuracionConversacion','seleccionarEstiloConversacion','editarNombreChat','seleccionarFondoConversacion','seleccionarBurbujaConversacion','historialConversaciones','cajaMemoria','musicaFondo','seleccionarModeloChat','configuracionModeloIA','ramasConversacion','editarPersonaje'].includes(estadoGlobalAplicacion.seccionActual);
 const lateral=e('aside',{clase:'barra-lateral'},[e('div',{clase:'marca-aplicacion'},[e('div',{clase:'simbolo-marca',texto:'Z'}),e('div',{},[e('strong',{texto:'ZHY'}),e('span',{texto:'Companion'})])]),e('nav',{clase:'navegacion-lateral'},[botonNavegacion('inicio','⌂','Inicio'),botonNavegacion('listaConversaciones','💬','Chats'),botonNavegacion('centroCreacion','＋','Crear',true),botonNavegacion('personajes','◈','Personajes'),botonNavegacion('perfil','◎','Mi')])]);
 const principal=e('main',{clase:`contenido-principal ${ocultarNavegacion?'sin-navegacion-inferior':''}`},[(vistas[estadoGlobalAplicacion.seccionActual]||renderizarVistaInicioAplicacion)()]);
 const inferior=e('nav',{clase:`navegacion-inferior navegacion-cinco-opciones ${ocultarNavegacion?'oculta':''}`},[botonNavegacion('inicio','⌂','Inicio'),botonNavegacion('listaConversaciones','💬','Chats'),botonNavegacion('centroCreacion','＋','Crear',true),botonNavegacion('personajes','◈','Personajes'),botonNavegacion('perfil','◎','Mi')]);
 raiz.append(lateral,principal,inferior);
}
suscribirseCambiosEstado(renderizarAplicacion);renderizarAplicacion();
