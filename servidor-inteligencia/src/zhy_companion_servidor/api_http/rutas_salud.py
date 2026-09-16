from fastapi import APIRouter
from fastapi.responses import JSONResponse
from zhy_companion_servidor.almacenamiento_persistente.conexion_base_datos import comprobar_base_datos
from zhy_companion_servidor.configuracion_servidor.configuracion_entorno import obtener_configuracion_entorno

router=APIRouter()

def _resumen_salud():
    cfg=obtener_configuracion_entorno()
    try:
        base_datos=bool(comprobar_base_datos())
    except Exception:
        base_datos=False
    modelos={m for m in cfg.lista_modelos_prioridad if m}
    modelos.update(m for m in [cfg.modelo_claude,cfg.modelo_qwen,cfg.modelo_deepseek,cfg.modelo_minimax,cfg.modelo_ollama] if m)
    return {'estado':'ok' if base_datos else 'degradado','baseDatos':base_datos,'modelosConfigurados':len(modelos)}

@router.get('/salud')
def salud():
    return _resumen_salud()

@router.get('/salud/preparado')
def preparado():
    resumen=_resumen_salud()
    return JSONResponse(status_code=200 if resumen['baseDatos'] else 503,content=resumen)
