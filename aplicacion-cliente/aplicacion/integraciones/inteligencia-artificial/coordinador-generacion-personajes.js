import { buscarModeloIA } from '../../configuracion/catalogo-modelos-inteligencia-artificial.js';
import { estadoGlobalAplicacion, obtenerAjustesConversacion } from '../../estado-y-persistencia-aplicacion/estado-global-aplicacion.js';
import { construirSolicitudGeneracion } from './construccion/construir-solicitud-generacion.js';
import { resolverProveedorSegunAjustes } from './seleccion/resolver-proveedor-segun-ajustes.js';

export async function solicitarRespuestaPersonaje({personaje,mensaje,historial,modeloIdForzado=null}){
  const preferencias=estadoGlobalAplicacion.preferencias;
  const ajustes=obtenerAjustesConversacion(personaje.id);
  const idModelo=modeloIdForzado||ajustes.modeloId||personaje.modeloPreferidoId||preferencias.modeloSeleccionadoId||'demostracion-narrativa-larga';
  const modelo=buscarModeloIA(idModelo);
  const proveedor=resolverProveedorSegunAjustes(preferencias);
  const solicitud=construirSolicitudGeneracion({personaje,mensaje,historial,preferencias,modelo});
  return proveedor.responder(solicitud);
}
