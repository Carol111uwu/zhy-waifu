const PATRONES=[
  {tipo:'gusto',regex:/\b(?:me gusta|me encanta|amo)\s+(.{2,100})/i,plantilla:x=>`Le gusta ${x}`},
  {tipo:'preferencia',regex:/\bprefiero\s+(.{2,100})/i,plantilla:x=>`Prefiere ${x}`},
  {tipo:'disgusto',regex:/\b(?:odio|detesto|no soporto)\s+(.{2,100})/i,plantilla:x=>`No le gusta ${x}`},
  {tipo:'identidad',regex:/\b(?:me llamo|mi nombre es)\s+([\p{L}0-9 _-]{2,60})/iu,plantilla:x=>`Su nombre es ${x}`},
  {tipo:'hecho-personal',regex:/\bmi (?:cumpleaños|cumple) es\s+(.{2,60})/i,plantilla:x=>`Su cumpleaños es ${x}`},
];
export function detectarRecuerdosEnTexto(texto){
  const limpio=String(texto||'').replace(/\s+/g,' ').trim();const salida=[];
  for(const p of PATRONES){const m=limpio.match(p.regex);if(!m)continue;const valor=m[1].replace(/[.,!?;:]+$/,'').trim();salida.push({id:`mem-${Date.now()}-${salida.length}`,tipo:p.tipo,contenido:p.plantilla(valor),confianza:0.82,fuente:'heuristica-local',creadaEn:new Date().toISOString()});}
  return salida;
}
