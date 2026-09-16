import { generarIdentificadorSeguro } from '../../estado-y-persistencia-aplicacion/generar-identificador-seguro.js';
export function crearMensajeConversacion({rol,texto,personajeId,id=generarIdentificadorSeguro('mensaje'),marcaTiempo=Date.now(),modeloId=null,metadatos={}}){
  return {id,rol,texto,personajeId,marcaTiempo,modeloId,metadatos:{alternativas:[],indiceAlternativa:0,...metadatos}};
}
