import { estadoGlobalAplicacion, actualizarEstadoGlobal } from '../../estado-y-persistencia-aplicacion/estado-global-aplicacion.js';
import { obtenerPersonajePorId } from '../personajes/registro-personajes-disponibles.js';
import { obtenerTarjetasComoRecuerdos } from '../tarjetas-memoria/gestor-tarjetas-memoria.js';

export function obtenerMemoriaEditable(personajeId){
  if(typeof estadoGlobalAplicacion.memoriasEditablesPersonaje[personajeId]==='string')return estadoGlobalAplicacion.memoriasEditablesPersonaje[personajeId];
  return (obtenerPersonajePorId(personajeId).recuerdosBase||[]).join('\n');
}
export function guardarMemoriaEditable(personajeId,texto){actualizarEstadoGlobal(s=>{s.memoriasEditablesPersonaje[personajeId]=texto;});}
export function obtenerRecuerdosComoLista(personajeId){return obtenerMemoriaEditable(personajeId).split('\n').map(x=>x.trim()).filter(Boolean);}
export function obtenerRecuerdosContextualesCompletos(personajeId){
  const manual=obtenerRecuerdosComoLista(personajeId);
  const automaticosUsuario=(estadoGlobalAplicacion.memoriasAutomaticasUsuario||[]).map(r=>`Sobre el usuario: ${r.contenido}`);
  const automaticosPersonaje=(estadoGlobalAplicacion.memoriasAutomaticasPorPersonaje[personajeId]||[]).map(r=>r.contenido);
  const tarjetas=obtenerTarjetasComoRecuerdos(personajeId);
  return [...manual,...automaticosUsuario,...automaticosPersonaje,...tarjetas].slice(-80);
}
