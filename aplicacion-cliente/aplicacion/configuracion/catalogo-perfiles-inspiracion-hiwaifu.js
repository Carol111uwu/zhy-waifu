// Estos NO son modelos descargables de ZHY Companion. Son perfiles de comportamiento
// inspirados por nombres/controles observados en HiWaifu para experimentar con el estilo.
export const PERFILES_INSPIRACION_HIWAIFU=Object.freeze([
  {id:'narrativa-equilibrada',nombre:'Narrativa equilibrada',descripcion:'Perfil neutral para personajes propios.',temperatura:0.9,dryMultiplier:0.0,frecuenciaAcciones:0.62,multiplicadorLongitud:1.5},
  {id:'storyweaver-inspirado',nombre:'StoryWeaver · perfil inspirado',descripcion:'Más continuidad narrativa, iniciativa y escenas desarrolladas.',temperatura:1.0,dryMultiplier:1.4,frecuenciaAcciones:0.78,multiplicadorLongitud:2},
  {id:'storyweaver-flash-inspirado',nombre:'StoryWeaver Flash · perfil inspirado',descripcion:'Narrativo pero algo más rápido y directo.',temperatura:0.95,dryMultiplier:1.5,frecuenciaAcciones:0.72,multiplicadorLongitud:1.5},
  {id:'spiritcraft-v4-inspirado',nombre:'SpiritCraft V4 · perfil inspirado',descripcion:'Creativo, expresivo y con acciones frecuentes.',temperatura:1.0,dryMultiplier:1.6,frecuenciaAcciones:0.82,multiplicadorLongitud:2},
  {id:'epictale-large-inspirado',nombre:'EpicTale Large · perfil inspirado',descripcion:'Escenas extensas; incluye control DRY para reducir repeticiones.',temperatura:1.0,dryMultiplier:3.0,frecuenciaAcciones:0.8,multiplicadorLongitud:3},
  {id:'enigma-echo-inspirado',nombre:'Enigma Echo · perfil inspirado',descripcion:'Perfil experimental orientado a respuestas menos predecibles.',temperatura:1.1,dryMultiplier:1.5,frecuenciaAcciones:0.65,multiplicadorLongitud:2},
]);
export function buscarPerfilInspiracion(id){return PERFILES_INSPIRACION_HIWAIFU.find(p=>p.id===id)||PERFILES_INSPIRACION_HIWAIFU[0];}
