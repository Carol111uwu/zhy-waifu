import { CONFIGURACION_GENERAL_APLICACION } from '../configuracion/configuracion-general-aplicacion.js';
import { PERFIL_LONGITUD_PREDETERMINADO } from '../configuracion/perfiles-longitud-respuesta.js';
import { CONFIGURACION_CONEXION_SERVIDOR } from '../configuracion/configuracion-conexion-servidor.js';
import { almacenamientoLocalAplicacion } from './almacenamiento-local-aplicacion.js';

const observadores = new Set();
const guardado = almacenamientoLocalAplicacion.leer('estado-principal-v4', almacenamientoLocalAplicacion.leer('estado-principal-v2', {}));

const ajustesConversacionPredeterminados = Object.freeze({
  nombreChat: '',
  estiloConversacionId: 'energia-5',
  fondoConversacionId: 'noche-profunda',
  estiloBurbujaId: 'redondeada',
  musicaFondoUrl: '',
  musicaFondoActiva: false,
  volumenMusicaFondo: 0.35,
  timidezCoqueteo: 58,
  seriedadJuego: 62,
  calmaEnergia: 68,
  estiloImagen: 'acg',
  generacionImagenActiva: false,
  recibirSaludosEspontaneos: true,
});

export const estadoGlobalAplicacion = {
  seccionActual: guardado.seccionActual || 'inicio',
  parametroVista: guardado.parametroVista || null,
  personajeActivoId: guardado.personajeActivoId || CONFIGURACION_GENERAL_APLICACION.personajeInicialId,
  personajesCreados: guardado.personajesCreados || [],
  personajesEditados: guardado.personajesEditados || {},
  favoritosPersonajes: guardado.favoritosPersonajes || [],
  conversaciones: guardado.conversaciones || {},
  historialesArchivados: guardado.historialesArchivados || {},
  memoriasEditablesPersonaje: guardado.memoriasEditablesPersonaje || {},
  memoriasAutomaticasUsuario: guardado.memoriasAutomaticasUsuario || [],
  memoriasAutomaticasPorPersonaje: guardado.memoriasAutomaticasPorPersonaje || {},
  tarjetasMemoriaPorPersonaje: guardado.tarjetasMemoriaPorPersonaje || {},
  ajustesConversacionPorPersonaje: guardado.ajustesConversacionPorPersonaje || {},
  configuracionModelosPorId: guardado.configuracionModelosPorId || {},
  personaUsuario: {
    nombre: 'Tú', apodo: '', pronombres: '', descripcion: '',
    ...(guardado.personaUsuario || {}),
  },
  notificacionesLeidas: guardado.notificacionesLeidas || [],
  ajustesListadoConversaciones: {
    orden: 'recientes',
    recibirSaludos: true,
    ...(guardado.ajustesListadoConversaciones || {}),
  },
  conexionServidor: {
    tokenSesion: '',
    ultimoEstado: 'desconocido',
    ultimaComprobacion: null,
    ...(guardado.conexionServidor || {}),
  },
  preferencias: {
    mostrarHoraMensajes: true,
    accionesNarrativasCompactas: false,
    modeloSeleccionadoId: 'servidor-inteligencia-con-respaldo',
    perfilInspiracionHiWaifuId: 'narrativa-equilibrada',
    modoProveedorIA: CONFIGURACION_CONEXION_SERVIDOR.modoProveedorIA,
    urlBaseServidorInteligencia: CONFIGURACION_CONEXION_SERVIDOR.urlBaseServidorInteligencia,
    perfilLongitudRespuesta: PERFIL_LONGITUD_PREDETERMINADO,
    creatividad: 0.95,
    frecuenciaAccionesNarrativas: 0.72,
    memoriaAutomaticaActiva: true,
    ...(guardado.preferencias || {}),
  },
};

export function obtenerAjustesConversacion(personajeId) {
  return {...ajustesConversacionPredeterminados, ...(estadoGlobalAplicacion.ajustesConversacionPorPersonaje[personajeId] || {})};
}

function persistir() {
  almacenamientoLocalAplicacion.guardar('estado-principal-v4', estadoGlobalAplicacion);
}

export function suscribirseCambiosEstado(funcion) {
  observadores.add(funcion);
  return () => observadores.delete(funcion);
}

export function actualizarEstadoGlobal(mutador) {
  mutador(estadoGlobalAplicacion);
  persistir();
  for (const observador of observadores) observador(estadoGlobalAplicacion);
}

export function actualizarAjustesConversacion(personajeId, cambios) {
  actualizarEstadoGlobal(estado => {
    estado.ajustesConversacionPorPersonaje[personajeId] = {...obtenerAjustesConversacion(personajeId), ...cambios};
  });
}

export function cambiarVista(seccion, parametroVista = null) {
  actualizarEstadoGlobal(estado => { estado.seccionActual = seccion; estado.parametroVista = parametroVista; });
}
