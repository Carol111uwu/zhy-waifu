export function describirModificadoresTemporales(ajustes){
  const timidez = ajustes.timidezCoqueteo < 40 ? 'más tímido/reservado' : ajustes.timidezCoqueteo > 65 ? 'más coqueto/seguro' : 'equilibrado entre timidez y coqueteo';
  const juego = ajustes.seriedadJuego < 40 ? 'más serio' : ajustes.seriedadJuego > 65 ? 'más juguetón' : 'equilibrado entre seriedad y juego';
  const energia = ajustes.calmaEnergia < 40 ? 'más calmado' : ajustes.calmaEnergia > 65 ? 'más energético' : 'energía media';
  return [timidez,juego,energia];
}
