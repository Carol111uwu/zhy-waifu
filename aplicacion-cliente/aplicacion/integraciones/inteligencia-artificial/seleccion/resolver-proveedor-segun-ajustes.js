import { estadoGlobalAplicacion } from '../../../estado-y-persistencia-aplicacion/estado-global-aplicacion.js';
import { ProveedorDemostracionRespuestasExtensas } from '../proveedores/proveedor-demostracion-respuestas-extensas.js';
import { ProveedorServidorInteligencia } from '../proveedores/proveedor-servidor-inteligencia.js';
import { ProveedorAutomaticoConRespaldo } from '../proveedores/proveedor-automatico-con-respaldo.js';

export function resolverProveedorSegunAjustes(preferencias){
  const opciones={urlBase:preferencias.urlBaseServidorInteligencia,tokenSesion:estadoGlobalAplicacion.conexionServidor.tokenSesion};
  if(preferencias.modoProveedorIA==='solo-servidor')return new ProveedorServidorInteligencia(opciones);
  if(preferencias.modoProveedorIA==='demostracion')return new ProveedorDemostracionRespuestasExtensas();
  return new ProveedorAutomaticoConRespaldo(opciones);
}
