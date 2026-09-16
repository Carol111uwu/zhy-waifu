import { crearElementoHtml as e } from '../../interfaz/crear-elemento-html.js';
import { estadoGlobalAplicacion, obtenerAjustesConversacion, actualizarAjustesConversacion } from '../../estado-y-persistencia-aplicacion/estado-global-aplicacion.js';
import { irASeccion } from '../../navegacion-aplicacion/navegacion-entre-secciones.js';
import { obtenerPersonajePorId } from '../personajes/registro-personajes-disponibles.js';
import { ESTILOS_CONVERSACION } from './catalogo-estilos-conversacion.js';
import { FONDOS_CONVERSACION, ESTILOS_BURBUJAS } from './catalogo-apariencia-conversacion.js';
import { archivarYCrearNuevaConversacion, obtenerHistorialArchivado, obtenerRamasConversacion } from '../conversacion/controlador-conversacion-personaje.js';
import { buscarModeloIA } from '../../configuracion/catalogo-modelos-inteligencia-artificial.js';

function filaBoton(icono,titulo,valor,accion){return e('button',{clase:'fila-menu-chat',type:'button',alclic:accion},[e('span',{clase:'icono-fila-chat-ajustes',texto:icono}),e('div',{clase:'texto-fila-menu-chat'},[e('span',{texto:titulo}),e('small',{texto:valor||''})]),e('span',{texto:'›'})]);}
function filaRango(etiqueta,izquierda,derecha,valorInicial,alCambiar){const input=e('input',{type:'range',min:'0',max:'100',step:'1',value:valorInicial});const valor=e('strong',{texto:String(valorInicial)});input.addEventListener('input',()=>valor.textContent=input.value);input.addEventListener('change',()=>alCambiar(Number(input.value)));return e('div',{clase:'bloque-rango-personaje'},[e('div',{clase:'titulo-rango'},[e('span',{texto:etiqueta}),valor]),e('div',{clase:'etiquetas-extremos'},[e('span',{texto:izquierda}),e('span',{texto:derecha})]),input]);}
export function renderizarVistaConfiguracionConversacion(){
 const personaje=obtenerPersonajePorId(estadoGlobalAplicacion.personajeActivoId),a=obtenerAjustesConversacion(personaje.id),estilo=ESTILOS_CONVERSACION.find(x=>x.id===a.estiloConversacionId)||ESTILOS_CONVERSACION[0],fondo=FONDOS_CONVERSACION.find(x=>x.id===a.fondoConversacionId)||FONDOS_CONVERSACION[0],burbuja=ESTILOS_BURBUJAS.find(x=>x.id===a.estiloBurbujaId)||ESTILOS_BURBUJAS[0],modelo=buscarModeloIA(a.modeloId||personaje.modeloPreferidoId||'servidor-inteligencia-con-respaldo'),historial=obtenerHistorialArchivado(personaje.id).length,ramas=obtenerRamasConversacion(personaje.id).length;
 const estiloImagen=e('div',{clase:'selector-segmentado'},[e('button',{clase:`boton-segmentado ${a.estiloImagen==='acg'?'activo':''}`,type:'button',texto:'ACG',alclic:()=>actualizarAjustesConversacion(personaje.id,{estiloImagen:'acg'})}),e('button',{clase:`boton-segmentado ${a.estiloImagen==='realista'?'activo':''}`,type:'button',texto:'Realista',alclic:()=>actualizarAjustesConversacion(personaje.id,{estiloImagen:'realista'})})]);
 const activarImagen=e('input',{type:'checkbox'});activarImagen.checked=a.generacionImagenActiva;activarImagen.addEventListener('change',()=>actualizarAjustesConversacion(personaje.id,{generacionImagenActiva:activarImagen.checked}));
 return e('section',{clase:'pagina-desplazable pagina-angosta'},[
  e('div',{clase:'encabezado-pagina encabezado-ajustes-chat'},[e('button',{clase:'boton-icono',type:'button',texto:'←',alclic:()=>irASeccion('conversacion')}),e('div',{clase:'titulo-flexible'},[e('h1',{texto:'Chat'}),e('p',{texto:`Ajustes de esta conversación con ${personaje.nombre}.`})])]),
  e('div',{clase:'menu-chat grupo-menu-chat'},[
   filaBoton('🧠','Modelo de IA',modelo.nombreVisible,()=>irASeccion('seleccionarModeloChat')),
   filaBoton('✦','Estilo de chat',estilo.nombre,()=>irASeccion('seleccionarEstiloConversacion')),
   filaBoton('👤','Persona',estadoGlobalAplicacion.personaUsuario.nombre||'Tú',()=>irASeccion('editarPersonaUsuario','configuracionConversacion')),
   filaBoton('✎','Nombre del chat',a.nombreChat||personaje.nombre,()=>irASeccion('editarNombreChat')),
  ]),
  e('div',{clase:'menu-chat grupo-menu-chat'},[
   filaBoton('▧','Fondo',fondo.nombre,()=>irASeccion('seleccionarFondoConversacion')),
   filaBoton('◍','Burbuja de mensaje',burbuja.nombre,()=>irASeccion('seleccionarBurbujaConversacion')),
   filaBoton('♫','Música de fondo',a.musicaFondoUrl?'Configurada':'Sin configurar',()=>irASeccion('musicaFondo')),
  ]),
  e('div',{clase:'menu-chat grupo-menu-chat'},[
   filaBoton('🕘','Historial',historial?`${historial} chat(s) archivado(s)`:'Sin archivados',()=>irASeccion('historialConversaciones')),
   filaBoton('↶','Ramas / rebobinados',ramas?`${ramas} rama(s)`:'Sin ramas',()=>irASeccion('ramasConversacion')),
   filaBoton('◇','Caja de memoria','Automática + manual + tarjetas',()=>irASeccion('cajaMemoria')),
  ]),
  e('div',{clase:'tarjeta-ajustes-personaje-temporal'},[e('h2',{texto:'Modificar personaje en este chat'}),e('p',{clase:'explicacion-ajuste',texto:'Esta capa es temporal: no reescribe la identidad base del personaje.'}),filaRango('Timidez / coqueteo','Tímido','Coqueto',a.timidezCoqueteo,v=>actualizarAjustesConversacion(personaje.id,{timidezCoqueteo:v})),filaRango('Seriedad / juego','Serio','Juguetón',a.seriedadJuego,v=>actualizarAjustesConversacion(personaje.id,{seriedadJuego:v})),filaRango('Calma / energía','Calmado','Energético',a.calmaEnergia,v=>actualizarAjustesConversacion(personaje.id,{calmaEnergia:v})),e('div',{clase:'fila-opcion-imagen'},[e('div',{},[e('strong',{texto:'Generación de imagen'}),e('small',{texto:'Preparada como módulo independiente; no afecta el chat de texto.'})]),activarImagen]),estiloImagen]),
  e('button',{clase:'boton-secundario ancho-completo',type:'button',texto:'✎ Editar personaje base',alclic:()=>irASeccion('editarPersonaje')}),
  e('button',{clase:'boton-nuevo-chat ancho-completo',type:'button',texto:'💬 Nuevo chat',alclic:()=>{if(confirm('¿Archivar este chat y comenzar uno nuevo?'))archivarYCrearNuevaConversacion(personaje.id);}})
 ]);
}
