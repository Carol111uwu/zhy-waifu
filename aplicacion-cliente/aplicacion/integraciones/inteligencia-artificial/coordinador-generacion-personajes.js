import { buscarModeloIA } from '../../configuracion/catalogo-modelos-inteligencia-artificial.js';
import { estadoGlobalAplicacion } from '../../estado-y-persistencia-aplicacion/estado-global-aplicacion.js';
import { construirSolicitudGeneracion } from './construccion/construir-solicitud-generacion.js';
import { resolverProveedorSegunAjustes } from './seleccion/resolver-proveedor-segun-ajustes.js';

export async function solicitarRespuestaPersonaje({personaje,mensaje,historial}) {
  const preferencias=estadoGlobalAplicacion.preferencias;
  const idModelo=preferencias.modeloSeleccionadoId || personaje.modeloPreferidoId || 'demostracion-narrativa-larga';
  const modelo=buscarModeloIA(idModelo);
  const proveedor=resolverProveedorSegunAjustes(preferencias);
  const solicitud=construirSolicitudGeneracion({personaje,mensaje,historial,preferencias,modelo});
  return proveedor.responder(solicitud);
}
