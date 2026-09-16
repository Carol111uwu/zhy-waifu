import { generarIdentificadorSeguro } from '../../../estado-y-persistencia-aplicacion/generar-identificador-seguro.js';
export function construirPersonajeDesdeFormulario(datos){
  const nombre=String(datos.get('nombre')||'').trim();
  return {
    id:generarIdentificadorSeguro('personaje'),
    nombre,
    genero:String(datos.get('genero')||'no-especificado'),
    edad:Number(datos.get('edad')||18),
    categoria:String(datos.get('categoria')||'General').trim(),
    etiquetas:String(datos.get('etiquetas')||'').split(',').map(v=>v.trim()).filter(Boolean),
    vozPreferida:String(datos.get('vozPreferida')||'dispositivo'),
    visibilidad:String(datos.get('visibilidad')||'Privado'),
    musicaPreferidaUrl:String(datos.get('musicaPreferidaUrl')||'').trim(),
    indicacionAdicional:String(datos.get('indicacionAdicional')||'').trim(),
    avatarTexto:nombre.slice(0,1).toUpperCase()||'?',
    avatarImagen:String(datos.get('avatarImagen')||'').trim(),
    subtitulo:String(datos.get('subtitulo')||'').trim(),
    descripcion:String(datos.get('descripcion')||'').trim(),
    saludoInicial:String(datos.get('saludoInicial')||'').trim(),
    rasgos:String(datos.get('rasgos')||'').split(',').map(v=>v.trim()).filter(Boolean),
    nivelCreatividadPersonaje:Number(datos.get('nivelCreatividadPersonaje')||4),
    recuerdosBase:String(datos.get('recuerdosBase')||'').split('\n').map(v=>v.trim()).filter(Boolean),
    modeloPreferidoId:String(datos.get('modeloPreferidoId')||'servidor-inteligencia-con-respaldo'),
    perfilInspiracionId:String(datos.get('perfilInspiracionId')||'narrativa-equilibrada'),
    ejemplosDialogo:[],
  };
}
