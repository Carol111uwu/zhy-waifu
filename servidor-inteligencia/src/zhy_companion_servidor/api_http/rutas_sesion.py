from fastapi import APIRouter, HTTPException
from zhy_companion_servidor.modelos_datos.sesion import SolicitudInicioSesion, RespuestaInicioSesion
from zhy_companion_servidor.seguridad_acceso.verificar_contrasena_aplicacion import verificar_contrasena
from zhy_companion_servidor.seguridad_acceso.tokens_sesion import crear_token_sesion

router=APIRouter(prefix='/api/v1/sesion',tags=['sesion'])

@router.post('/iniciar',response_model=RespuestaInicioSesion)
def iniciar(datos: SolicitudInicioSesion):
    if not verificar_contrasena(datos.contrasena):
        raise HTTPException(status_code=401,detail='Contraseña incorrecta')
    token,duracion=crear_token_sesion()
    return RespuestaInicioSesion(token=token,expira_en_segundos=duracion)
