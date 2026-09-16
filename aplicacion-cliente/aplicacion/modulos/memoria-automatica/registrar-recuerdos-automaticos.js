import { estadoGlobalAplicacion, actualizarEstadoGlobal } from '../../estado-y-persistencia-aplicacion/estado-global-aplicacion.js';
import { detectarRecuerdosEnTexto } from './detectar-recuerdos-en-texto.js';

export function registrarRecuerdosAutomaticosDelUsuario(texto){
  if(!estadoGlobalAplicacion.preferencias.memoriaAutomaticaActiva)return [];
  const detectados=detectarRecuerdosEnTexto(texto);if(!detectados.length)return [];
  actualizarEstadoGlobal(estado=>{
    const existentes=new Set((estado.memoriasAutomaticasUsuario||[]).map(r=>r.contenido.toLowerCase()));
    for(const recuerdo of detectados)if(!existentes.has(recuerdo.contenido.toLowerCase()))estado.memoriasAutomaticasUsuario.push(recuerdo);
    estado.memoriasAutomaticasUsuario=estado.memoriasAutomaticasUsuario.slice(-120);
  });
  return detectados;
}
