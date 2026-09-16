from pydantic import BaseModel, Field

class RespuestaGeneracion(BaseModel):
    texto: str
    modeloId: str
    proveedor: str
    usoRespaldo: bool = False
    advertencias: list[str] = Field(default_factory=list)
