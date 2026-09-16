export function analizarAccionesYDialogo(entrada = '') {
  const partes=[]; const patron=/\*([^*]+)\*/g; let cursor=0; let coincidencia;
  while ((coincidencia=patron.exec(entrada))) {
    const previo=entrada.slice(cursor,coincidencia.index);
    if (previo.trim()) partes.push({tipo:'dialogo',texto:previo.trim()});
    partes.push({tipo:'accion',texto:coincidencia[1].trim()});
    cursor=patron.lastIndex;
  }
  const resto=entrada.slice(cursor); if(resto.trim()) partes.push({tipo:'dialogo',texto:resto.trim()});
  if(!partes.length && entrada.trim()) partes.push({tipo:'dialogo',texto:entrada.trim()});
  return partes;
}
