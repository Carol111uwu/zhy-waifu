export function generarIdentificadorSeguro(prefijo = 'id') {
  if (globalThis.crypto?.randomUUID) return `${prefijo}-${crypto.randomUUID()}`;
  const aleatorio = Math.random().toString(36).slice(2);
  return `${prefijo}-${Date.now().toString(36)}-${aleatorio}`;
}
