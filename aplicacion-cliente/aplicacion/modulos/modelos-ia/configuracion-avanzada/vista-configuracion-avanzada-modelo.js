import { crearElementoHtml as e } from '../../../interfaz/crear-elemento-html.js';
import { estadoGlobalAplicacion, actualizarEstadoGlobal } from '../../../estado-y-persistencia-aplicacion/estado-global-aplicacion.js';
import { irASeccion } from '../../../navegacion-aplicacion/navegacion-entre-secciones.js';
import { buscarModeloIA } from '../../../configuracion/catalogo-modelos-inteligencia-artificial.js';
import { PERFILES_LONGITUD_RESPUESTA } from '../../../configuracion/perfiles-longitud-respuesta.js';
import { obtenerValoresPredeterminadosModelo } from './valores-predeterminados-modelo.js';

function obtenerConfig(modelo){return {...obtenerValoresPredeterminadosModelo(modelo),...(estadoGlobalAplicacion.configuracionModelosPorId[modelo.id]||{})};}
function guardar(modeloId,cambios){actualizarEstadoGlobal(s=>{s.configuracionModelosPorId[modeloId]={...(s.configuracionModelosPorId[modeloId]||{}),...cambios};});}
function admite(modelo,parametro){return (modelo.parametrosAvanzados||[]).includes(parametro);}
function rango({titulo,explicacion,min,max,step,valorInicial,cambiar,formatear=v=>String(v)}){
  const valor=e('strong',{texto:formatear(valorInicial)});const input=e('input',{type:'range',min,max,step,value:valorInicial});
  input.addEventListener('input',()=>valor.textContent=formatear(Number(input.value)));
  input.addEventListener('change',()=>cambiar(Number(input.value)));
  return e('label',{clase:'fila-ajuste fila-ajuste-vertical'},[e('div',{clase:'titulo-rango'},[e('span',{texto:titulo}),valor]),e('p',{clase:'explicacion-ajuste',texto:explicacion}),input]);
}
export function renderizarVistaConfiguracionAvanzadaModelo(){
  const id=estadoGlobalAplicacion.parametroVista||estadoGlobalAplicacion.preferencias.modeloSeleccionadoId;
  const modelo=buscarModeloIA(id);const config=obtenerConfig(modelo);const controles=[];
  if(admite(modelo,'temperatura')) controles.push(rango({titulo:'Temperatura',explicacion:'Menor = más estable y lógica. Mayor = más variable y creativa.',min:0,max:1.5,step:0.05,valorInicial:config.temperatura,cambiar:v=>guardar(modelo.id,{temperatura:v}),formatear:v=>v.toFixed(2)}));
  if(admite(modelo,'dryMultiplier')) controles.push(rango({titulo:'DRY multiplier',explicacion:'Reduce repeticiones recientes. Un valor demasiado alto puede cortar continuidad. Déjalo en 0 para desactivarlo.',min:0,max:5,step:0.1,valorInicial:config.dryMultiplier||0,cambiar:v=>guardar(modelo.id,{dryMultiplier:v}),formatear:v=>v.toFixed(1)}));
  if(admite(modelo,'longitud')){
    const select=e('select',{},Object.values(PERFILES_LONGITUD_RESPUESTA).map(p=>e('option',{value:p.id,texto:`${p.nombre} · ~${p.objetivoCaracteres} caracteres`})));select.value=config.perfilLongitudRespuesta;select.addEventListener('change',()=>guardar(modelo.id,{perfilLongitudRespuesta:select.value}));
    controles.push(e('label',{clase:'fila-ajuste fila-ajuste-vertical'},[e('span',{texto:'Longitud preferida'}),select]));
  }
  if(admite(modelo,'acciones')) controles.push(rango({titulo:'Frecuencia de acciones narrativas',explicacion:'Controla cuánto usa *acciones* junto al diálogo.',min:0,max:1,step:0.05,valorInicial:config.frecuenciaAccionesNarrativas,cambiar:v=>guardar(modelo.id,{frecuenciaAccionesNarrativas:v}),formatear:v=>v.toFixed(2)}));
  if(admite(modelo,'multiplicadorLongitud')){
    const mult=e('select',{},[1,1.5,2,3].map(v=>e('option',{value:String(v),texto:`${v}x`})));mult.value=String(config.multiplicadorLongitud||1.5);mult.addEventListener('change',()=>guardar(modelo.id,{multiplicadorLongitud:Number(mult.value)}));
    controles.push(e('label',{clase:'fila-ajuste fila-ajuste-vertical'},[e('span',{texto:'Multiplicador de longitud'}),e('p',{clase:'explicacion-ajuste',texto:'Idea inspirada en 1.5x / 2x / 3x de HiWaifu, aplicada a nuestros propios perfiles.'}),mult]));
  }
  return e('section',{clase:'pagina-desplazable pagina-angosta'},[
    e('div',{clase:'encabezado-pagina'},[e('button',{clase:'boton-icono',type:'button',texto:'←',alclic:()=>irASeccion('modelosIA')}),e('div',{clase:'titulo-flexible'},[e('h1',{texto:modelo.nombreVisible}),e('p',{texto:'Solo aparecen parámetros que este tipo de motor puede utilizar dentro de ZHY Companion.'})])]),
    e('button',{clase:'boton-secundario ancho-completo',type:'button',texto:'Restaurar configuraciones predeterminadas',alclic:()=>actualizarEstadoGlobal(s=>{delete s.configuracionModelosPorId[modelo.id];})}),
    e('div',{clase:'tarjeta-ajustes'},controles),
    e('div',{clase:'tarjeta-informativa'},[e('strong',{texto:modelo.disponibleAhora?'Disponible/configurable':'Requiere servidor o configuración'}),e('p',{texto:modelo.descripcion})])
  ]);
}
