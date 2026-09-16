import base64
import hashlib
import hmac
import json
import time
from zhy_companion_servidor.configuracion_servidor.configuracion_entorno import obtener_configuracion_entorno
from .verificar_contrasena_aplicacion import contrasena_configurada

def _b64(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).decode().rstrip('=')

def _desb64(texto: str) -> bytes:
    return base64.urlsafe_b64decode(texto + '=' * (-len(texto) % 4))

def crear_token_sesion() -> tuple[str,int]:
    cfg=obtener_configuracion_entorno()
    duracion=cfg.horas_duracion_sesion*3600
    payload={'exp':int(time.time())+duracion,'tipo':'zhy-companion'}
    cuerpo=_b64(json.dumps(payload,separators=(',',':')).encode())
    firma=_b64(hmac.new(cfg.secreto_firma_sesiones.encode(),cuerpo.encode(),hashlib.sha256).digest())
    return f'{cuerpo}.{firma}',duracion

def token_es_valido(token: str) -> bool:
    if not contrasena_configurada():
        return True
    try:
        cuerpo,firma=token.split('.',1)
        cfg=obtener_configuracion_entorno()
        esperada=_b64(hmac.new(cfg.secreto_firma_sesiones.encode(),cuerpo.encode(),hashlib.sha256).digest())
        if not hmac.compare_digest(firma,esperada):
            return False
        payload=json.loads(_desb64(cuerpo))
        return payload.get('exp',0)>time.time() and payload.get('tipo')=='zhy-companion'
    except Exception:
        return False
