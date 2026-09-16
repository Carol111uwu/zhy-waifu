import { personajeDemoLaboratorio } from './perfiles/personaje-demo-laboratorio.js';
import { estadoGlobalAplicacion } from '../../estado-y-persistencia-aplicacion/estado-global-aplicacion.js';

function aplicarEdicion(personaje){
  return {...personaje, ...(estadoGlobalAplicacion.personajesEditados[personaje.id] || {})};
}
export function obtenerPersonajesDisponibles() {
  return [personajeDemoLaboratorio, ...estadoGlobalAplicacion.personajesCreados].map(aplicarEdicion);
}
export function obtenerPersonajePorId(id) {
  return obtenerPersonajesDisponibles().find(p => p.id === id) || aplicarEdicion(personajeDemoLaboratorio);
}
