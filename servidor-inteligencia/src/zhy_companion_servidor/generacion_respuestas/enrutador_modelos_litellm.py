from dataclasses import dataclass
import logging
from zhy_companion_servidor.configuracion_servidor.configuracion_entorno import obtener_configuracion_entorno

logger=logging.getLogger(__name__)

@dataclass(slots=True)
class ResultadoModelo:
    texto: str
    modelo: str
    proveedor: str
    errores_previos: list[str]

class SinModelosConfigurados(RuntimeError):
    pass
class TodosLosModelosFallaron(RuntimeError):
    def __init__(self, errores:list[str]):
        self.errores=errores
        super().__init__('Todos los modelos configurados fallaron')

def _orden_modelos(selector: str | None) -> list[str]:
    cfg=obtener_configuracion_entorno(); base=cfg.lista_modelos_prioridad; elegido=cfg.modelo_para_selector(selector or '')
    salida=[]
    if elegido: salida.append(elegido)
    for modelo in base:
        if modelo not in salida: salida.append(modelo)
    return salida

async def generar_con_fallback(mensajes, preferencias, selector_modelo: str | None=None) -> ResultadoModelo:
    modelos=_orden_modelos(selector_modelo)
    if not modelos:
        raise SinModelosConfigurados('No hay modelos configurados en el servidor')
    from litellm import acompletion
    temperatura=float(preferencias.get('temperatura',0.9)); longitud=preferencias.get('longitud') or {}
    max_tokens=int(preferencias.get('maxTokens',longitud.get('maximoTokens',1800))); errores=[]
    parametros_comunes={'temperature':temperatura,'max_tokens':max_tokens,'timeout':70}
    if preferencias.get('topP') is not None: parametros_comunes['top_p']=float(preferencias['topP'])
    if preferencias.get('frequencyPenalty') is not None: parametros_comunes['frequency_penalty']=float(preferencias['frequencyPenalty'])
    if preferencias.get('presencePenalty') is not None: parametros_comunes['presence_penalty']=float(preferencias['presencePenalty'])
    for modelo in modelos:
        try:
            respuesta=await acompletion(model=modelo,messages=mensajes,**parametros_comunes)
            texto=(respuesta.choices[0].message.content or '').strip()
            if not texto: raise RuntimeError('respuesta vacía')
            return ResultadoModelo(texto=texto,modelo=modelo,proveedor=modelo.split('/',1)[0],errores_previos=errores)
        except Exception as exc:
            logger.exception('Falló el modelo %s durante una generación',modelo)
            errores.append(f'{modelo}: {type(exc).__name__}')
    raise TodosLosModelosFallaron(errores)
