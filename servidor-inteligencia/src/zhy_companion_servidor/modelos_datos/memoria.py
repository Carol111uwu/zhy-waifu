from pydantic import BaseModel, Field

class SolicitudExtraccionMemoria(BaseModel):
    persona_id: str
    mensajes: list[dict] = Field(default_factory=list)

class RecuerdoDetectado(BaseModel):
    tipo: str
    contenido: str
    confianza: float = 0.7
    fuente: str = "heuristica-local-servidor"

class RespuestaExtraccionMemoria(BaseModel):
    recuerdos: list[RecuerdoDetectado] = Field(default_factory=list)
