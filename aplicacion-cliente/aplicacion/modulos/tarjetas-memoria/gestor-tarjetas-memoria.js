import { estadoGlobalAplicacion, actualizarEstadoGlobal } from '../../estado-y-persistencia-aplicacion/estado-global-aplicacion.js';
import { CONFIGURACION_GENERAL_APLICACION } from '../../configuracion/configuracion-general-aplicacion.js';

export function obtenerTarjetasMemoria(personajeId){return estadoGlobalAplicacion.tarjetasMemoriaPorPersonaje[personajeId]||[];}
export function agregarTarjetaMemoria(personajeId,{titulo,contenido,categoria='General'}){
  const tarjeta={id:`tarjeta-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,titulo:titulo.trim()||'Sin título',contenido:contenido.trim(),categoria,creadaEn:new Date().toISOString()};
  actualizarEstadoGlobal(s=>{const lista=s.tarjetasMemoriaPorPersonaje[personajeId]||=[];lista.unshift(tarjeta);s.tarjetasMemoriaPorPersonaje[personajeId]=lista.slice(0,CONFIGURACION_GENERAL_APLICACION.maximoTarjetasMemoriaPorPersonaje);});return tarjeta;
}
export function eliminarTarjetaMemoria(personajeId,tarjetaId){actualizarEstadoGlobal(s=>{s.tarjetasMemoriaPorPersonaje[personajeId]=(s.tarjetasMemoriaPorPersonaje[personajeId]||[]).filter(t=>t.id!==tarjetaId);});}
export function obtenerTarjetasComoRecuerdos(personajeId){return obtenerTarjetasMemoria(personajeId).map(t=>`${t.titulo}: ${t.contenido}`);}
