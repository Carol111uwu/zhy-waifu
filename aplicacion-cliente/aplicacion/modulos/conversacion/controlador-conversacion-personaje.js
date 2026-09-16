import { CONFIGURACION_GENERAL_APLICACION } from '../../configuracion/configuracion-general-aplicacion.js';
import { estadoGlobalAplicacion, actualizarEstadoGlobal, obtenerAjustesConversacion } from '../../estado-y-persistencia-aplicacion/estado-global-aplicacion.js';
import { obtenerPersonajePorId } from '../personajes/registro-personajes-disponibles.js';
import { solicitarRespuestaPersonaje } from '../../integraciones/inteligencia-artificial/coordinador-generacion-personajes.js';
import { registrarRecuerdosAutomaticosDelUsuario } from '../memoria-automatica/registrar-recuerdos-automaticos.js';
import { crearMensajeConversacion } from './crear-mensaje-conversacion.js';

export function obtenerConversacion(personajeId){return estadoGlobalAplicacion.conversaciones[personajeId]||[];}
export function obtenerHistorialArchivado(personajeId){return estadoGlobalAplicacion.historialesArchivados[personajeId]||[];}
export function obtenerRamasConversacion(personajeId){return estadoGlobalAplicacion.ramasConversacionPorPersonaje[personajeId]||[];}
export function asegurarSaludoInicial(personajeId){const personaje=obtenerPersonajePorId(personajeId);if(obtenerConversacion(personajeId).length)return;actualizarEstadoGlobal(s=>{s.conversaciones[personajeId]=[crearMensajeConversacion({rol:'personaje',texto:personaje.saludoInicial,personajeId})];});}

function guardarErrorEnChat(personajeId,error){actualizarEstadoGlobal(s=>{const lista=s.conversaciones[personajeId]||=[];lista.push(crearMensajeConversacion({rol:'sistema-error',texto:'No pude obtener una respuesta de la IA. El chat y tus datos siguen disponibles.',personajeId,metadatos:{detalle:error?.message||String(error)}}));s.conversaciones[personajeId]=lista;});}
export async function enviarMensajeUsuario(texto){
  const personajeId=estadoGlobalAplicacion.personajeActivoId, personaje=obtenerPersonajePorId(personajeId);
  registrarRecuerdosAutomaticosDelUsuario(texto);
  actualizarEstadoGlobal(s=>{const lista=s.conversaciones[personajeId]||=[];lista.push(crearMensajeConversacion({rol:'usuario',texto,personajeId}));s.conversaciones[personajeId]=lista.slice(-CONFIGURACION_GENERAL_APLICACION.maximoMensajesLocalesPorPersonaje);s.borradoresPorPersonaje[personajeId]='';});
  try{
    const resultado=await solicitarRespuestaPersonaje({personaje,mensaje:texto,historial:obtenerConversacion(personajeId)});
    actualizarEstadoGlobal(s=>{const lista=s.conversaciones[personajeId]||=[];lista.push(crearMensajeConversacion({rol:'personaje',texto:resultado.texto,personajeId,modeloId:resultado.modeloId,metadatos:{proveedor:resultado.proveedor,usoRespaldo:resultado.usoRespaldo,advertencias:resultado.advertencias||[]}}));s.conversaciones[personajeId]=lista.slice(-CONFIGURACION_GENERAL_APLICACION.maximoMensajesLocalesPorPersonaje);});
    return resultado;
  }catch(error){guardarErrorEnChat(personajeId,error);throw error;}
}

async function generarDesdeIndiceUsuario(personajeId,indiceUsuario,modeloIdForzado=null){
  const lista=obtenerConversacion(personajeId), personaje=obtenerPersonajePorId(personajeId), mensaje=lista[indiceUsuario]?.texto;if(!mensaje)return null;
  return solicitarRespuestaPersonaje({personaje,mensaje,historial:lista.slice(0,indiceUsuario+1),modeloIdForzado});
}
export async function regenerarUltimaRespuestaPersonaje(){
  const personajeId=estadoGlobalAplicacion.personajeActivoId,lista=obtenerConversacion(personajeId),indiceUsuario=[...lista].map((m,i)=>({m,i})).reverse().find(x=>x.m.rol==='usuario')?.i;if(indiceUsuario==null)return;
  actualizarEstadoGlobal(s=>{s.conversaciones[personajeId]=s.conversaciones[personajeId].slice(0,indiceUsuario+1);});
  const resultado=await generarDesdeIndiceUsuario(personajeId,indiceUsuario);
  if(resultado)actualizarEstadoGlobal(s=>{s.conversaciones[personajeId].push(crearMensajeConversacion({rol:'personaje',texto:resultado.texto,personajeId,modeloId:resultado.modeloId,metadatos:{proveedor:resultado.proveedor,usoRespaldo:resultado.usoRespaldo}}));});
  return resultado;
}
export async function generarAlternativaParaMensaje(mensajeId){
  const personajeId=estadoGlobalAplicacion.personajeActivoId,lista=obtenerConversacion(personajeId),indice=lista.findIndex(m=>m.id===mensajeId);if(indice<0||lista[indice].rol!=='personaje')return null;
  let indiceUsuario=indice-1;while(indiceUsuario>=0&&lista[indiceUsuario].rol!=='usuario')indiceUsuario--;if(indiceUsuario<0)return null;
  const original=lista[indice],resultado=await generarDesdeIndiceUsuario(personajeId,indiceUsuario);
  if(!resultado)return null;
  actualizarEstadoGlobal(s=>{const m=s.conversaciones[personajeId].find(x=>x.id===mensajeId);const actuales=m.metadatos?.alternativas||[];const base=actuales.length?actuales:[{texto:m.texto,modeloId:m.modeloId||null}];const nuevas=[...base,{texto:resultado.texto,modeloId:resultado.modeloId||null}].slice(-CONFIGURACION_GENERAL_APLICACION.maximoAlternativasPorMensaje);m.metadatos={...(m.metadatos||{}),alternativas:nuevas,indiceAlternativa:nuevas.length-1};m.texto=resultado.texto;m.modeloId=resultado.modeloId||m.modeloId;});
  return resultado;
}
export function cambiarAlternativaMensaje(mensajeId,direccion){actualizarEstadoGlobal(s=>{const m=(s.conversaciones[s.personajeActivoId]||[]).find(x=>x.id===mensajeId);const alts=m?.metadatos?.alternativas||[];if(alts.length<2)return;let i=Number(m.metadatos.indiceAlternativa||0)+direccion;i=(i+alts.length)%alts.length;m.metadatos.indiceAlternativa=i;m.texto=alts[i].texto;m.modeloId=alts[i].modeloId||m.modeloId;});}
export function editarMensaje(mensajeId,nuevoTexto){actualizarEstadoGlobal(s=>{const m=(s.conversaciones[s.personajeActivoId]||[]).find(x=>x.id===mensajeId);if(m&&nuevoTexto.trim())m.texto=nuevoTexto.trim();});}
export function eliminarMensaje(mensajeId){actualizarEstadoGlobal(s=>{const id=s.personajeActivoId;s.conversaciones[id]=(s.conversaciones[id]||[]).filter(m=>m.id!==mensajeId);});}
export function rebobinarDesdeMensaje(mensajeId){
  const personajeId=estadoGlobalAplicacion.personajeActivoId,lista=obtenerConversacion(personajeId),indice=lista.findIndex(m=>m.id===mensajeId);if(indice<0||indice>=lista.length-1)return false;
  const cola=lista.slice(indice+1);actualizarEstadoGlobal(s=>{const ramas=s.ramasConversacionPorPersonaje[personajeId]||[];ramas.unshift({id:`rama-${Date.now()}`,fecha:new Date().toISOString(),desdeMensajeId:mensajeId,mensajes:cola});s.ramasConversacionPorPersonaje[personajeId]=ramas.slice(0,CONFIGURACION_GENERAL_APLICACION.maximoRamasPorPersonaje);s.conversaciones[personajeId]=lista.slice(0,indice+1);});return true;
}
export function restaurarRama(ramaId){const personajeId=estadoGlobalAplicacion.personajeActivoId,rama=obtenerRamasConversacion(personajeId).find(r=>r.id===ramaId);if(!rama)return false;const actual=obtenerConversacion(personajeId),indice=actual.findIndex(m=>m.id===rama.desdeMensajeId);if(indice<0)return false;actualizarEstadoGlobal(s=>{s.conversaciones[personajeId]=[...actual.slice(0,indice+1),...rama.mensajes];});return true;}
export function borrarConversacion(personajeId){actualizarEstadoGlobal(s=>{s.conversaciones[personajeId]=[];});asegurarSaludoInicial(personajeId);}
export function archivarYCrearNuevaConversacion(personajeId){const actual=obtenerConversacion(personajeId);actualizarEstadoGlobal(s=>{const archivos=s.historialesArchivados[personajeId]||=[];if(actual.length)archivos.unshift({id:`archivo-${Date.now()}`,fecha:new Date().toISOString(),mensajes:actual});s.historialesArchivados[personajeId]=archivos.slice(0,CONFIGURACION_GENERAL_APLICACION.maximoHistorialesArchivadosPorPersonaje);s.conversaciones[personajeId]=[];s.seccionActual='conversacion';s.parametroVista=null;});asegurarSaludoInicial(personajeId);}
export function borrarTodosLosHistoriales(){actualizarEstadoGlobal(s=>{s.historialesArchivados={};});}
export function guardarBorrador(personajeId,texto){actualizarEstadoGlobal(s=>{s.borradoresPorPersonaje[personajeId]=texto;});}
