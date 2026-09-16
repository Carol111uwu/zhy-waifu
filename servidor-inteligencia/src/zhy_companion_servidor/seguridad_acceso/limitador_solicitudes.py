from collections import defaultdict, deque
from time import monotonic
from fastapi import HTTPException, Request
from zhy_companion_servidor.configuracion_servidor.configuracion_entorno import obtener_configuracion_entorno

_historial: dict[str, deque[float]] = defaultdict(deque)

async def aplicar_limite_basico(request: Request) -> None:
    maximo=obtener_configuracion_entorno().max_solicitudes_por_minuto
    clave=request.client.host if request.client else 'desconocido'
    ahora=monotonic()
    cola=_historial[clave]
    while cola and ahora-cola[0] > 60:
        cola.popleft()
    if len(cola)>=maximo:
        raise HTTPException(status_code=429,detail='Demasiadas solicitudes; intenta de nuevo en un momento')
    cola.append(ahora)
