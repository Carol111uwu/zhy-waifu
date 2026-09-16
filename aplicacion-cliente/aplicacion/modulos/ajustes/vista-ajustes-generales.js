import { crearElementoHtml as e } from '../../interfaz/crear-elemento-html.js';
import { estadoGlobalAplicacion, actualizarEstadoGlobal } from '../../estado-y-persistencia-aplicacion/estado-global-aplicacion.js';
import { PERFILES_LONGITUD_RESPUESTA } from '../../configuracion/perfiles-longitud-respuesta.js';
import { PERFILES_INSPIRACION_HIWAIFU } from '../../configuracion/catalogo-perfiles-inspiracion-hiwaifu.js';
import { ProveedorServidorInteligencia } from '../../integraciones/inteligencia-artificial/proveedores/proveedor-servidor-inteligencia.js';

function filaInterruptor(etiqueta,clave){const input=e('input',{type:'checkbox'});input.checked=Boolean(estadoGlobalAplicacion.preferencias[clave]);input.addEventListener('change',()=>actualizarEstadoGlobal(s=>{s.preferencias[clave]=input.checked;}));return e('label',{clase:'fila-ajuste'},[e('span',{texto:etiqueta}),input]);}
function filaSelector(etiqueta,clave,opciones){const select=e('select',{},opciones.map(o=>e('option',{value:o.valor,texto:o.texto})));select.value=estadoGlobalAplicacion.preferencias[clave];select.addEventListener('change',()=>actualizarEstadoGlobal(s=>{s.preferencias[clave]=select.value;}));return e('label',{clase:'fila-ajuste fila-ajuste-vertical'},[e('span',{texto:etiqueta}),select]);}
function filaRango(etiqueta,clave,min,max,paso){const valor=e('span',{clase:'valor-rango',texto:String(estadoGlobalAplicacion.preferencias[clave])});const input=e('input',{type:'range',min,max,step:paso,value:estadoGlobalAplicacion.preferencias[clave]});input.addEventListener('input',()=>{valor.textContent=input.value;});input.addEventListener('change',()=>actualizarEstadoGlobal(s=>{s.preferencias[clave]=Number(input.value);}));return e('label',{clase:'fila-ajuste fila-ajuste-vertical'},[e('div',{clase:'titulo-rango'},[e('span',{texto:etiqueta}),valor]),input]);}
export function renderizarVistaAjustes(){
  const urlBase=e('input',{type:'url',value:estadoGlobalAplicacion.preferencias.urlBaseServidorInteligencia,placeholder:'https://tu-api.onrender.com'});urlBase.addEventListener('change',()=>actualizarEstadoGlobal(s=>{s.preferencias.urlBaseServidorInteligencia=urlBase.value.trim().replace(/\/$/,'');}));
  const clave=e('input',{type:'password',placeholder:'Contraseña del servidor · opcional',autocomplete:'current-password'});
  const estadoServidor=e('strong',{texto:`Estado: ${estadoGlobalAplicacion.conexionServidor.ultimoEstado}`});
  const proveedor=()=>new ProveedorServidorInteligencia({urlBase:estadoGlobalAplicacion.preferencias.urlBaseServidorInteligencia,tokenSesion:estadoGlobalAplicacion.conexionServidor.tokenSesion});
  const comprobar=async()=>{estadoServidor.textContent='Estado: comprobando…';try{const datos=await proveedor().comprobarSalud();actualizarEstadoGlobal(s=>{s.conexionServidor.ultimoEstado=datos.estado;s.conexionServidor.ultimaComprobacion=new Date().toISOString();});estadoServidor.textContent=`Estado: ${datos.estado} · ${datos.modelosConfigurados} modelo(s)`;}catch(error){actualizarEstadoGlobal(s=>{s.conexionServidor.ultimoEstado='sin conexión';});estadoServidor.textContent=`Estado: sin conexión · ${error.message}`;}};
  const iniciarSesion=async()=>{try{const datos=await proveedor().iniciarSesion(clave.value);actualizarEstadoGlobal(s=>{s.conexionServidor.tokenSesion=datos.token;s.conexionServidor.ultimoEstado='sesión activa';});clave.value='';alert('Sesión iniciada. El token quedó guardado localmente en este dispositivo.');}catch(error){alert(error.message);}};
  const opcionesLongitud=Object.values(PERFILES_LONGITUD_RESPUESTA).map(p=>({valor:p.id,texto:`${p.nombre} · ~${p.objetivoCaracteres} caracteres`}));
  return e('section',{clase:'pagina-desplazable pagina-angosta'},[
    e('div',{clase:'encabezado-pagina'},[e('div',{},[e('h1',{texto:'Ajustes'}),e('p',{texto:'Generación, memoria y conexión. El modo automático mantiene la app utilizable incluso si el backend está caído.'})])]),
    e('div',{clase:'tarjeta-ajustes'},[
      filaSelector('Longitud de respuestas','perfilLongitudRespuesta',opcionesLongitud),filaRango('Creatividad','creatividad',0,1.2,0.05),filaRango('Frecuencia de acciones *narrativas*','frecuenciaAccionesNarrativas',0,1,0.05),
      filaSelector('Perfil narrativo predeterminado','perfilInspiracionHiWaifuId',PERFILES_INSPIRACION_HIWAIFU.map(p=>({valor:p.id,texto:p.nombre}))),
      filaInterruptor('Memoria automática local','memoriaAutomaticaActiva'),filaInterruptor('Mostrar hora en mensajes','mostrarHoraMensajes'),filaInterruptor('Acciones narrativas compactas','accionesNarrativasCompactas')
    ]),
    e('div',{clase:'tarjeta-ajustes'},[
      e('h2',{texto:'Servidor de inteligencia'}),
      filaSelector('Modo de IA','modoProveedorIA',[{valor:'automatico-con-respaldo',texto:'Recomendado · servidor + respaldo offline'},{valor:'solo-servidor',texto:'Solo servidor real'},{valor:'demostracion',texto:'Solo demostración offline'}]),
      e('label',{clase:'campo-ajuste'},[e('span',{texto:'URL base del servidor'}),urlBase]),
      e('div',{clase:'fila-estado-servidor'},[estadoServidor,e('button',{clase:'boton-secundario',type:'button',texto:'Comprobar',alclic:comprobar})]),
      e('label',{clase:'campo-ajuste'},[e('span',{texto:'Iniciar sesión en servidor protegido'}),clave]),e('button',{clase:'boton-secundario',type:'button',texto:'Iniciar sesión',alclic:iniciarSesion}),
      e('p',{clase:'explicacion-ajuste',texto:'Si dejas la URL vacía, el modo automático usa el motor offline sin esperar. Las API keys de Claude/Qwen/DeepSeek/OpenRouter/etc. viven únicamente en el backend: nunca se guardan en la web, GitHub ni el APK.'})
    ]),
    e('div',{clase:'tarjeta-informativa'},[e('strong',{texto:'Compatibilidad'}),e('p',{texto:'El cliente sigue siendo HTML/CSS/JavaScript vanilla. Puedes editarlo con VS Code, Antigravity, Acode o Spck. Python solo corre en el servidor y no impide que la app abra o muestre tus chats.'})])
  ]);
}
