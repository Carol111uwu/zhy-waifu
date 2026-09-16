import { cambiarVista } from '../estado-y-persistencia-aplicacion/estado-global-aplicacion.js';

export function irASeccion(seccion, parametroVista = null) {
  cambiarVista(seccion, parametroVista);
}
