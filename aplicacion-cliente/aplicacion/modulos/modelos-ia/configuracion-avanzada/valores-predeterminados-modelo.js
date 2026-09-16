export function obtenerValoresPredeterminadosModelo(modelo){
  return {
    temperatura:Number(modelo.temperaturaPredeterminada ?? 0.9),
    dryMultiplier:Number(modelo.dryMultiplierPredeterminado ?? 0),
    perfilLongitudRespuesta:modelo.perfilLongitudPredeterminado || 'muyLarga',
    frecuenciaAccionesNarrativas:Number(modelo.frecuenciaAccionesPredeterminada ?? 0.7),
    multiplicadorLongitud:1.5,
  };
}
