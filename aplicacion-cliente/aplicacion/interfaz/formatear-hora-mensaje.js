export function formatearHoraMensaje(marcaTiempo) {
  return new Date(marcaTiempo).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
