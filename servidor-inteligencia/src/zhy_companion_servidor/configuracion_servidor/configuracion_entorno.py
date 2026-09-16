from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict

class ConfiguracionEntorno(BaseSettings):
    entorno: str = "desarrollo"
    origenes_permitidos: str = "http://127.0.0.1:8080,http://localhost:8080"
    contrasena_aplicacion: str = ""
    secreto_firma_sesiones: str = "desarrollo-no-usar-en-produccion"
    horas_duracion_sesion: int = 168
    database_url: str = "sqlite:///./datos-locales/zhy-companion.db"
    modelos_litellm_prioridad: str = ""
    max_solicitudes_por_minuto: int = 24
    modelo_claude: str = ''
    modelo_qwen: str = ''
    modelo_deepseek: str = ''
    modelo_minimax: str = ''
    modelo_ollama: str = ''
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    @property
    def lista_origenes_permitidos(self) -> list[str]:
        return [x.strip() for x in self.origenes_permitidos.split(",") if x.strip()]

    @property
    def lista_modelos_prioridad(self) -> list[str]:
        return [x.strip() for x in self.modelos_litellm_prioridad.split(',') if x.strip()]

    def modelo_para_selector(self, selector: str) -> str | None:
        mapa={
            'claude-servidor': self.modelo_claude,
            'qwen-servidor': self.modelo_qwen,
            'deepseek-servidor': self.modelo_deepseek,
            'minimax-servidor': self.modelo_minimax,
            'ollama-local': self.modelo_ollama,
        }
        valor=mapa.get(selector,'').strip()
        return valor or None

@lru_cache
def obtener_configuracion_entorno() -> ConfiguracionEntorno:
    return ConfiguracionEntorno()
