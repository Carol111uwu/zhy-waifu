from typing import Any
from pydantic import BaseModel, Field

class SolicitudGeneracion(BaseModel):
    personaje: dict[str, Any]
    personaUsuario: dict[str, Any] = Field(default_factory=dict)
    ajustesConversacion: dict[str, Any] = Field(default_factory=dict)
    mensaje: str
    historial: list[dict[str, Any]] = Field(default_factory=list)
    modelo: dict[str, Any] = Field(default_factory=dict)
    preferenciasGeneracion: dict[str, Any] = Field(default_factory=dict)
    perfilInspiracion: dict[str, Any] = Field(default_factory=dict)
