import { crearElementoHtml as e } from '../../interfaz/crear-elemento-html.js';
import { estadoGlobalAplicacion, obtenerAjustesConversacion, actualizarAjustesConversacion, actualizarEstadoGlobal } from '../../estado-y-persistencia-aplicacion/estado-global-aplicacion.js';
import { irASeccion } from '../../navegacion-aplicacion/navegacion-entre-secciones.js';
import { obtenerPersonajePorId } from '../personajes/registro-personajes-disponibles.js';
import { ESTILOS_CONVERSACION } from './catalogo-estilos-conversacion.js';
import { FONDOS_CONVERSACION, ESTILOS_BURBUJAS } from './catalogo-apariencia-conversacion.js';
import { archivarYCrearNuevaConversacion, obtenerHistorialArchivado } from '../conversacion/controlador-conversacion-personaje.js';

function filaBoton(titulo,valor,accion){return e('button',{clase:'fila-menu-chat',type:'button',alclic:accion},[e('span',{texto:titulo}),e('span',{clase:'valor-menu-chat',texto:valor||''}),e('span',{texto:'›'})]);}
function filaRango(etiqueta,izquierda,derecha,valorInicial,alCambiar){
  const valor=e('strong',{texto:String(valorInicial)}); const input=e('input',{type:'range',min:'0',max:'100',step:'1',value:valorInicial});
  input.addEventListener('input',()=>valor.textContent=input.value); input.addEventListener('change',()=>alCambiar(Number(input.value)));
  return e('div',{clase:'bloque-rango-personaje'},[e('div',{clase:'titulo-rango'},[e('span',{texto:etiqueta}),valor]),e('div',{clase:'etiquetas-extremos'},[e('span',{texto:izquierda}),e('span',{texto:derecha})]),input]);
}
export function renderizarVistaConfiguracionConversacion(){
  const personaje=obtenerPersonajePorId(estadoGlobalAplicacion.personajeActivoId); const a=obtenerAjustesConversacion(personaje.id);
  const estilo=ESTILOS_CONVERSACION.find(x=>x.id===a.estiloConversacionId) || ESTILOS_CONVERSACION[4];
  const fondo=FONDOS_CONVERSACION.find(x=>x.id===a.fondoConversacionId) || FONDOS_CONVERSACION[0];
  const burbuja=ESTILOS_BURBUJAS.find(x=>x.id===a.estiloBurbujaId) || ESTILOS_BURBUJAS[0];
  const historialCantidad=obtenerHistorialArchivado(personaje.id).length;
  const estiloImagen=e('div',{clase:'selector-segmentado'},[
    e('button',{clase:`boton-segmentado ${a.estiloImagen==='acg'?'activo':''}`,type:'button',texto:'ACG',alclic:()=>actualizarAjustesConversacion(personaje.id,{estiloImagen:'acg'})}),
    e('button',{clase:`boton-segmentado ${a.estiloImagen==='realista'?'activo':''}`,type:'button',texto:'Realista',alclic:()=>actualizarAjustesConversacion(personaje.id,{estiloImagen:'realista'})})
  ]);
  const activarImagen=e('input',{type:'checkbox'}); activarImagen.checked=a.generacionImagenActiva; activarImagen.addEventListener('change',()=>actualizarAjustesConversacion(personaje.id,{generacionImagenActiva:activarImagen.checked}));
  return e('section',{clase:'pagina-desplazable pagina-angosta'},[
    e('div',{clase:'encabezado-pagina'},[e('button',{clase:'boton-icono',type:'button',texto:'←',alclic:()=>irASeccion('conversacion')}),e('div',{class:'titulo-flexible'},[e('h1',{texto:'Configuración del chat'}),e('p',{texto:`Ajustes temporales y visuales para ${personaje.nombre}.`})])]),
    e('div',{clase:'menu-chat'},[
      filaBoton('Estilo de chat',estilo.nombre,()=>irASeccion('seleccionarEstiloConversacion')),
      filaBoton('Persona',estadoGlobalAplicacion.personaUsuario.nombre||'Sin nombre',()=>irASeccion('editarPersonaUsuario')),
      filaBoton('Nombre del chat',a.nombreChat||personaje.nombre,()=>irASeccion('editarNombreChat')),
      filaBoton('Fondo',fondo.nombre,()=>irASeccion('seleccionarFondoConversacion')),
      filaBoton('Burbuja de mensaje',burbuja.nombre,()=>irASeccion('seleccionarBurbujaConversacion')),
      filaBoton('Historial',historialCantidad?`${historialCantidad} archivado(s)`:'Sin archivados',()=>irASeccion('historialConversaciones')),
      filaBoton('Caja de memoria','Editar',()=>irASeccion('cajaMemoria')),
    ]),
    e('div',{clase:'tarjeta-ajustes-personaje-temporal'},[
      e('h2',{texto:'Modificar personaje'}),
      e('p',{clase:'explicacion-ajuste',texto:'Estos controles solo cambian la forma de actuar en este chat; no reescriben su personalidad base.'}),
      filaRango('Timidez / coqueteo','Tímido','Coqueto',a.timidezCoqueteo,v=>actualizarAjustesConversacion(personaje.id,{timidezCoqueteo:v})),
      filaRango('Seriedad / juego','Serio','Juguetón',a.seriedadJuego,v=>actualizarAjustesConversacion(personaje.id,{seriedadJuego:v})),
      filaRango('Calma / energía','Calmado','Energético',a.calmaEnergia,v=>actualizarAjustesConversacion(personaje.id,{calmaEnergia:v})),
      e('div',{clase:'fila-opcion-imagen'},[e('div',{},[e('strong',{texto:'Estilo de imagen'}),e('small',{texto:'La generación real se conectará después.'})]),activarImagen]),estiloImagen
    ]),
    e('div',{clase:'menu-chat'},[filaBoton('Música de fondo',a.musicaFondoUrl?'Configurada':'Sin configurar',()=>irASeccion('musicaFondo'))]),
    e('button',{clase:'boton-secundario ancho-completo',type:'button',texto:'✎ Editar personaje',alclic:()=>irASeccion('editarPersonaje')}),
    e('button',{clase:'boton-nuevo-chat ancho-completo',type:'button',texto:'💬 Nuevo Chat',alclic:()=>{if(confirm('¿Archivar este chat y comenzar uno nuevo?'))archivarYCrearNuevaConversacion(personaje.id);}})
  ]);
}
