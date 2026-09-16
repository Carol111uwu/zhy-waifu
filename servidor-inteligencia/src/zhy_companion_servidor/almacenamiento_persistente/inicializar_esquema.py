from sqlalchemy import text
from .conexion_base_datos import obtener_motor

SQL = '''
CREATE TABLE IF NOT EXISTS memorias_persona (
  id VARCHAR(80) PRIMARY KEY,
  persona_id VARCHAR(120) NOT NULL,
  tipo VARCHAR(60) NOT NULL,
  contenido TEXT NOT NULL,
  confianza REAL NOT NULL DEFAULT 0.7,
  fuente VARCHAR(120) NOT NULL,
  creada_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
'''

def inicializar_esquema() -> None:
    with obtener_motor().begin() as conexion:
        conexion.execute(text(SQL))
