from .construir_mensajes_modelo import construir_mensajes_modelo
from .enrutador_modelos_litellm import generar_con_fallback

async def generar_respuesta(solicitud):
    mensajes=construir_mensajes_modelo(solicitud)
    selector=(solicitud.modelo or {}).get('id')
    return await generar_con_fallback(mensajes,solicitud.preferenciasGeneracion,selector)
