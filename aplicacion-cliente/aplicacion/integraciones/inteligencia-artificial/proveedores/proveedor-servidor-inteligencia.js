import { ContratoProveedorInteligenciaArtificial } from './contrato-proveedor-inteligencia-artificial.js';

function normalizarBase(base){return String(base||'').trim().replace(/\/$/,'');}
function url(base,ruta){const limpia=normalizarBase(base);if(!limpia)throw new Error('Servidor de IA sin configurar');return `${limpia}${ruta}`;}
function cabeceras(token){const h={'Content-Type':'application/json'};if(token)h.Authorization=`Bearer ${token}`;return h;}
async function fetchConTiempo(urlObjetivo,opciones={},tiempoEsperaMs=8000){
  const controlador=new AbortController();
  const temporizador=setTimeout(()=>controlador.abort(),tiempoEsperaMs);
  try{return await fetch(urlObjetivo,{...opciones,signal:controlador.signal});}
  catch(error){if(error?.name==='AbortError')throw new Error(`Tiempo de espera agotado (${tiempoEsperaMs} ms)`);throw error;}
  finally{clearTimeout(temporizador);}
}

export class ProveedorServidorInteligencia extends ContratoProveedorInteligenciaArtificial {
  constructor({urlBase,tokenSesion='',tiempoEsperaMs=75000}={}){super();this.urlBase=normalizarBase(urlBase);this.tokenSesion=tokenSesion;this.tiempoEsperaMs=tiempoEsperaMs;}
  estaConfigurado(){return Boolean(this.urlBase);}
  async responder(solicitud){
    if(!this.estaConfigurado())throw new Error('Servidor de IA sin configurar');
    const respuesta=await fetchConTiempo(url(this.urlBase,'/api/v1/generar'),{method:'POST',headers:cabeceras(this.tokenSesion),body:JSON.stringify(solicitud)},this.tiempoEsperaMs);
    if(!respuesta.ok){let detalle='';try{const datos=await respuesta.json();detalle=typeof datos.detail==='string'?datos.detail:(datos.detail?.mensaje||'');}catch{}throw new Error(`Servidor IA HTTP ${respuesta.status}${detalle?` · ${detalle}`:''}`);}
    const datos=await respuesta.json();
    return {texto:datos.texto??'',modeloId:datos.modeloId??solicitud.modelo.id,proveedor:datos.proveedor||'servidor-inteligencia',usoRespaldo:false,advertencias:datos.advertencias||[]};
  }
  async comprobarSalud({tiempoEsperaMs=3500}={}){
    if(!this.estaConfigurado())throw new Error('Configura primero la URL del servidor');
    const respuesta=await fetchConTiempo(url(this.urlBase,'/salud'),{cache:'no-store'},tiempoEsperaMs);
    if(!respuesta.ok)throw new Error(`Salud HTTP ${respuesta.status}`);
    return respuesta.json();
  }
  async iniciarSesion(contrasena){
    if(!this.estaConfigurado())throw new Error('Configura primero la URL del servidor');
    const respuesta=await fetchConTiempo(url(this.urlBase,'/api/v1/sesion/iniciar'),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contrasena})},10000);
    if(!respuesta.ok)throw new Error('No se pudo iniciar sesión en el servidor');
    return respuesta.json();
  }
}
