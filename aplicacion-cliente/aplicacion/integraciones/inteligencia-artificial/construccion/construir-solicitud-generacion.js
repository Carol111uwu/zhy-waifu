import { PERFILES_LONGITUD_RESPUESTA } from '../../../configuracion/perfiles-longitud-respuesta.js';
import { buscarPerfilInspiracion } from '../../../configuracion/catalogo-perfiles-inspiracion-hiwaifu.js';
import { estadoGlobalAplicacion, obtenerAjustesConversacion } from '../../../estado-y-persistencia-aplicacion/estado-global-aplicacion.js';
import { buscarEstiloConversacion } from '../../../modulos/configuracion-conversacion/catalogo-estilos-conversacion.js';
import { describirModificadoresTemporales } from '../../../modulos/personajes/modificadores/descripcion-modificadores-temporales.js';
import { obtenerRecuerdosContextualesCompletos } from '../../../modulos/memoria-personaje/gestor-memoria-editable-personaje.js';
import { obtenerValoresPredeterminadosModelo } from '../../../modulos/modelos-ia/configuracion-avanzada/valores-predeterminados-modelo.js';

export function construirSolicitudGeneracion({personaje,mensaje,historial,preferencias,modelo}){
  const ajustesChat=obtenerAjustesConversacion(personaje.id);
  const estilo=buscarEstiloConversacion(ajustesChat.estiloConversacionId);
  const perfilInspiracion=buscarPerfilInspiracion(personaje.perfilInspiracionId||preferencias.perfilInspiracionHiWaifuId);
  const configModelo={...obtenerValoresPredeterminadosModelo(modelo),...(estadoGlobalAplicacion.configuracionModelosPorId[modelo.id]||{})};
  const perfilLongitud=configModelo.perfilLongitudRespuesta||preferencias.perfilLongitudRespuesta||estilo.longitud;
  const longitudBase=PERFILES_LONGITUD_RESPUESTA[perfilLongitud]||PERFILES_LONGITUD_RESPUESTA.muyLarga;
  const multiplicador=Number(configModelo.multiplicadorLongitud||perfilInspiracion.multiplicadorLongitud||1);
  const longitud={...longitudBase,minimoCaracteres:Math.round(longitudBase.minimoCaracteres*multiplicador),objetivoCaracteres:Math.round(longitudBase.objetivoCaracteres*multiplicador),maximoCaracteres:Math.round(longitudBase.maximoCaracteres*multiplicador),maximoTokens:Math.max(600,Math.round((longitudBase.maximoCaracteres*multiplicador)/3.2))};
  const recuerdos=obtenerRecuerdosContextualesCompletos(personaje.id);
  return {
    personaje:{...personaje,recuerdosBase:recuerdos},
    personaUsuario:{...estadoGlobalAplicacion.personaUsuario},
    ajustesConversacion:{...ajustesChat,estiloConversacion:estilo,modificadoresTemporales:describirModificadoresTemporales(ajustesChat)},
    mensaje,
    historial,
    modelo:{id:modelo.id,nombre:modelo.nombreVisible,categoria:modelo.categoria},
    perfilInspiracion:{...perfilInspiracion},
    preferenciasGeneracion:{
      temperatura:Number(configModelo.temperatura ?? perfilInspiracion.temperatura ?? preferencias.creatividad),
      creatividad:Number(preferencias.creatividad),
      frecuenciaAccionesNarrativas:Number(configModelo.frecuenciaAccionesNarrativas ?? perfilInspiracion.frecuenciaAcciones ?? preferencias.frecuenciaAccionesNarrativas),
      multiplicadorLongitud:multiplicador,
      dryMultiplier:Number(configModelo.dryMultiplier || perfilInspiracion.dryMultiplier || 0),
      topP:Number(configModelo.topP ?? 0.95),
      topK:Number(configModelo.topK ?? 40),
      frequencyPenalty:Number(configModelo.frequencyPenalty ?? 0),
      presencePenalty:Number(configModelo.presencePenalty ?? 0),
      longitud,
      maxTokens:longitud.maximoTokens,
      instruccionesFormato:[
        'Escribir respuestas desarrolladas, naturales y suficientemente extensas; evitar respuestas de una sola línea salvo que el contexto lo pida.',
        'Separar acciones narrativas usando *asteriscos* y dejar el diálogo fuera de los asteriscos.',
        'Mantener la personalidad, recuerdos, persona del usuario, indicación adicional e historial relevante.',
        'Los modificadores temporales del chat ajustan el tono, pero nunca reescriben la identidad base del personaje.',
        'Evitar repeticiones textuales y no rellenar longitud repitiendo la misma idea.',
        `Apuntar aproximadamente a ${longitud.objetivoCaracteres} caracteres cuando la escena permita una respuesta larga.`,
      ],
    },
  };
}
