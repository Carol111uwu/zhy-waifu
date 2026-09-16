export const ESTILOS_CONVERSACION = Object.freeze([
  { id:'calma-1', nombre:'1 Calma', descripcion:'Respuestas más serenas, menos acciones y menor variación.', creatividad:0.55, frecuenciaAcciones:0.30, longitud:'larga' },
  { id:'suave-2', nombre:'2 Suave', descripcion:'Natural y tranquila, con acciones ocasionales.', creatividad:0.70, frecuenciaAcciones:0.42, longitud:'larga' },
  { id:'natural-3', nombre:'3 Natural', descripcion:'Equilibrio entre conversación, emoción y acciones.', creatividad:0.82, frecuenciaAcciones:0.55, longitud:'muyLarga' },
  { id:'expresivo-4', nombre:'4 Expresivo', descripcion:'Más iniciativa, emoción y lenguaje corporal.', creatividad:0.95, frecuenciaAcciones:0.68, longitud:'muyLarga' },
  { id:'energia-5', nombre:'5 Energía', descripcion:'Perfil de prueba intenso y expresivo, inspirado en la idea de estilos de chat.', creatividad:1.05, frecuenciaAcciones:0.80, longitud:'muyLarga' },
]);
export function buscarEstiloConversacion(id){ return ESTILOS_CONVERSACION.find(x=>x.id===id) || ESTILOS_CONVERSACION[4]; }
