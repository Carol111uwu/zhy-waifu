from pydantic import BaseModel

class SolicitudInicioSesion(BaseModel):
    contrasena: str

class RespuestaInicioSesion(BaseModel):
    token: str
    expira_en_segundos: int
