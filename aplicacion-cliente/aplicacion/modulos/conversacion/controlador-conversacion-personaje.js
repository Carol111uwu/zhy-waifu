import { CONFIGURACION_GENERAL_APLICACION } from '../../configuracion/configuracion-general-aplicacion.js';
import { estadoGlobalAplicacion, actualizarEstadoGlobal } from '../../estado-y-persistencia-aplicacion/estado-global-aplicacion.js';
import { obtenerPersonajePorId } from '../personajes/registro-personajes-disponibles.js';
import { solicitarRespuestaPersonaje } from '../../integraciones/inteligencia-artificial/coordinador-generacion-personajes.js';
import { registrarRecuerdosAutomaticosDelUsuario } from '../memoria-automatica/registrar-recuerdos-automaticos.js';
import { crearMensajeConversacion } from './crear-mensaje-conversacion.js';

export function obtenerConversacion(personajeId){return estadoGlobalAplicacion.conversaciones[personajeId]||[];}
export function obtenerHistorialArchivado(personajeId){return estadoGlobalAplicacion.historialesArchivados[personajeId]||[];}
export function asegurarSaludoInicial(personajeId){
  const personaje=obtenerPersonajePorId(personajeId);if(obtenerConversacion(personajeId).length)return;
  actualizarEstadoGlobal(s=>{s.conversaciones[personajeId]=[crearMensajeConversacion({rol:'personaje',texto:personaje.saludoInicial,personajeId})];});
}
export async function enviarMensajeUsuario(texto){
  const personajeId=estadoGlobalAplicacion.personajeActivoId;const personaje=obtenerPersonajePorId(personajeId);
  registrarRecuerdosAutomaticosDelUsuario(texto);
  actualizarEstadoGlobal(s=>{const lista=s.conversaciones[personajeId]||=[];lista.push(crearMensajeConversacion({rol:'usuario',texto,personajeId}));s.conversaciones[personajeId]=lista.slice(-CONFIGURACION_GENERAL_APLICACION.maximoMensajesLocalesPorPersonaje);});
  const resultado=await solicitarRespuestaPersonaje({personaje,mensaje:texto,historial:obtenerConversacion(personajeId)});
  actualizarEstadoGlobal(s=>{const lista=s.conversaciones[personajeId]||=[];lista.push(crearMensajeConversacion({rol:'personaje',texto:resultado.texto,personajeId,modeloId:resultado.modeloId,metadatos:{proveedor:resultado.proveedor,usoRespaldo:resultado.usoRespaldo,advertencias:resultado.advertencias||[]}}));s.conversaciones[personajeId]=lista.slice(-CONFIGURACION_GENERAL_APLICACION.maximoMensajesLocalesPorPersonaje);});
  return resultado;
}
export async function regenerarUltimaRespuestaPersonaje(){
  const personajeId=estadoGlobalAplicacion.personajeActivoId;const lista=obtenerConversacion(personajeId);const indiceUsuario=[...lista].map((m,i)=>({m,i})).reverse().find(x=>x.m.rol==='usuario')?.i;
  if(indiceUsuario==null)return;const mensaje=lista[indiceUsuario].texto;const personaje=obtenerPersonajePorId(personajeId);
  actualizarEstadoGlobal(s=>{s.conversaciones[personajeId]=s.conversaciones[personajeId].slice(0,indiceUsuario+1);});
  const resultado=await solicitarRespuestaPersonaje({personaje,mensaje,historial:obtenerConversacion(personajeId)});
  actualizarEstadoGlobal(s=>{s.conversaciones[personajeId].push(crearMensajeConversacion({rol:'personaje',texto:resultado.texto,personajeId,modeloId:resultado.modeloId,metadatos:{proveedor:resultado.proveedor,usoRespaldo:resultado.usoRespaldo}}));});return resultado;
}
export function borrarConversacion(personajeId){actualizarEstadoGlobal(s=>{s.conversaciones[personajeId]=[];});asegurarSaludoInicial(personajeId);}
export function archivarYCrearNuevaConversacion(personajeId){
  const actual=obtenerConversacion(personajeId);
  actualizarEstadoGlobal(s=>{const archivos=s.historialesArchivados[personajeId]||=[];if(actual.length)archivos.unshift({id:`archivo-${Date.now()}`,fecha:new Date().toISOString(),mensajes:actual});s.historialesArchivados[personajeId]=archivos.slice(0,CONFIGURACION_GENERAL_APLICACION.maximoHistorialesArchivadosPorPersonaje);s.conversaciones[personajeId]=[];s.seccionActual='conversacion';s.parametroVista=null;});
  asegurarSaludoInicial(personajeId);
}
export function borrarTodosLosHistoriales(){actualizarEstadoGlobal(s=>{s.historialesArchivados={};});}
