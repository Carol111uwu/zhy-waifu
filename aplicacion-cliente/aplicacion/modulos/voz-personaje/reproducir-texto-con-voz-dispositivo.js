export function reproducirTextoConVozDispositivo(texto,{velocidad=1,tono=1}={}){
  if(!('speechSynthesis' in window))throw new Error('Este navegador no ofrece síntesis de voz');
  speechSynthesis.cancel();const limpio=String(texto||'').replace(/\*[^*]+\*/g,' ').replace(/\s+/g,' ').trim();const voz=new SpeechSynthesisUtterance(limpio);voz.lang='es';voz.rate=velocidad;voz.pitch=tono;speechSynthesis.speak(voz);
}
