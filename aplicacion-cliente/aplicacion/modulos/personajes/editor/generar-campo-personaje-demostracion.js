export function generarCampoPersonajeDemostracion(tipo,{nombre,genero,rasgos}){
  const n=nombre||'el personaje'; const lista=(rasgos||'curioso, expresivo').split(',').map(x=>x.trim()).filter(Boolean).slice(0,4).join(', ');
  if(tipo==='saludo') return `*${n} levanta la mirada al notar tu presencia y se queda observándote un instante antes de sonreír apenas* Holii... así que viniste. Tenía curiosidad por saber qué clase de conversación ibas a empezar conmigo. No hace falta que seas formal; dime qué tienes en mente y vemos hasta dónde llega esto.`;
  return `${n} es un personaje de conversación pensado para interacciones naturales, extensas y coherentes. Sus rasgos principales son ${lista || 'curiosidad y expresividad'}. Debe mantener continuidad, reaccionar al contexto y evitar respuestas genéricas de asistente.`;
}
