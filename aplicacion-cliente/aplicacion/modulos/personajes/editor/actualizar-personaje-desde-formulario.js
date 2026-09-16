export function construirCambiosPersonaje(formData){
  return {
    nombre:String(formData.get('nombre')||'').trim(),
    genero:String(formData.get('genero')||'no-especificado'),
    edad:Number(formData.get('edad')||18),
    categoria:String(formData.get('categoria')||'General').trim(),
    etiquetas:String(formData.get('etiquetas')||'').split(',').map(x=>x.trim()).filter(Boolean),
    vozPreferida:String(formData.get('vozPreferida')||'dispositivo'),
    visibilidad:String(formData.get('visibilidad')||'Privado'),
    musicaPreferidaUrl:String(formData.get('musicaPreferidaUrl')||'').trim(),
    indicacionAdicional:String(formData.get('indicacionAdicional')||'').trim(),
    subtitulo:String(formData.get('subtitulo')||'').trim(),
    descripcion:String(formData.get('descripcion')||'').trim(),
    saludoInicial:String(formData.get('saludoInicial')||'').trim(),
    rasgos:String(formData.get('rasgos')||'').split(',').map(x=>x.trim()).filter(Boolean),
    nivelCreatividadPersonaje:Number(formData.get('nivelCreatividadPersonaje')||4),
    avatarImagen:String(formData.get('avatarImagen')||'').trim(),
    modeloPreferidoId:String(formData.get('modeloPreferidoId')||'servidor-inteligencia-con-respaldo'),
    perfilInspiracionId:String(formData.get('perfilInspiracionId')||'narrativa-equilibrada'),
  };
}
