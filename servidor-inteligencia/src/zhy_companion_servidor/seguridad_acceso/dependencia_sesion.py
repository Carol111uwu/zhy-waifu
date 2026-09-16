from fastapi import Header, HTTPException
from .tokens_sesion import token_es_valido
from .verificar_contrasena_aplicacion import contrasena_configurada

async def exigir_sesion_si_esta_configurada(authorization: str | None = Header(default=None)) -> None:
    if not contrasena_configurada():
        return
    if not authorization or not authorization.lower().startswith('bearer '):
        raise HTTPException(status_code=401,detail='Sesión requerida')
    if not token_es_valido(authorization.split(' ',1)[1].strip()):
        raise HTTPException(status_code=401,detail='Sesión inválida o vencida')
