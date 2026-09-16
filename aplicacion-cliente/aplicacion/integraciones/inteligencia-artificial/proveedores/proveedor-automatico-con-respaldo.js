import { ContratoProveedorInteligenciaArtificial } from './contrato-proveedor-inteligencia-artificial.js';
import { ProveedorServidorInteligencia } from './proveedor-servidor-inteligencia.js';
import { ProveedorDemostracionRespuestasExtensas } from './proveedor-demostracion-respuestas-extensas.js';

export class ProveedorAutomaticoConRespaldo extends ContratoProveedorInteligenciaArtificial{
  constructor(opciones={}){super();this.servidor=new ProveedorServidorInteligencia(opciones);this.respaldo=new ProveedorDemostracionRespuestasExtensas();}
  async responder(solicitud){
    if(!this.servidor.estaConfigurado()){
      const local=await this.respaldo.responder(solicitud);
      return {...local,usoRespaldo:true,advertencias:['Servidor de IA aún no configurado; se usa el respaldo offline.']};
    }
    try{
      await this.servidor.comprobarSalud({tiempoEsperaMs:3000});
      return await this.servidor.responder(solicitud);
    }catch(error){
      console.warn('Servidor de IA no disponible; se usa el respaldo offline.',error);
      const local=await this.respaldo.responder(solicitud);
      return {...local,usoRespaldo:true,advertencias:[`Servidor no disponible: ${error.message}`]};
    }
  }
}
