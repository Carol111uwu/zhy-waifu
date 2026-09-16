import hmac
from zhy_companion_servidor.configuracion_servidor.configuracion_entorno import obtener_configuracion_entorno

def contrasena_configurada() -> bool:
    return bool(obtener_configuracion_entorno().contrasena_aplicacion)

def verificar_contrasena(valor: str) -> bool:
    esperada=obtener_configuracion_entorno().contrasena_aplicacion
    if not esperada:
        return True
    return hmac.compare_digest(valor,esperada)
