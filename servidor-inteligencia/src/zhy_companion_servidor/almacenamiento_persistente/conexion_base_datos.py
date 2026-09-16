from pathlib import Path
from sqlalchemy import create_engine, text
from zhy_companion_servidor.configuracion_servidor.configuracion_entorno import obtener_configuracion_entorno

_motor=None

def obtener_motor():
    global _motor
    if _motor is None:
        url=obtener_configuracion_entorno().database_url
        if url.startswith('sqlite'):
            Path('datos-locales').mkdir(exist_ok=True)
            _motor=create_engine(url,connect_args={'check_same_thread':False})
        else:
            _motor=create_engine(url,pool_pre_ping=True,pool_recycle=1800)
    return _motor

def comprobar_base_datos() -> bool:
    with obtener_motor().connect() as conexion:
        conexion.execute(text('SELECT 1'))
    return True
