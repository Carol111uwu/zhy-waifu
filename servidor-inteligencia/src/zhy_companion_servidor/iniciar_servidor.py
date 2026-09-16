from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from zhy_companion_servidor.api_http.rutas_salud import router as rutas_salud
from zhy_companion_servidor.api_http.rutas_sesion import router as rutas_sesion
from zhy_companion_servidor.api_http.rutas_modelos import router as rutas_modelos
from zhy_companion_servidor.api_http.rutas_generacion import router as rutas_generacion
from zhy_companion_servidor.api_http.rutas_memoria import router as rutas_memoria
from zhy_companion_servidor.almacenamiento_persistente.inicializar_esquema import inicializar_esquema
from zhy_companion_servidor.configuracion_servidor.configuracion_entorno import obtener_configuracion_entorno

@asynccontextmanager
async def ciclo_vida(_app):
    inicializar_esquema()
    yield

cfg=obtener_configuracion_entorno()
aplicacion=FastAPI(title='ZHY Companion · Servidor de Inteligencia',version='0.5.0',lifespan=ciclo_vida)
aplicacion.add_middleware(
    CORSMiddleware,
    allow_origins=cfg.lista_origenes_permitidos or ['*'],
    allow_credentials=False,
    allow_methods=['GET','POST','OPTIONS'],
    allow_headers=['Authorization','Content-Type'],
)
aplicacion.include_router(rutas_salud)
aplicacion.include_router(rutas_sesion)
aplicacion.include_router(rutas_modelos)
aplicacion.include_router(rutas_generacion)
aplicacion.include_router(rutas_memoria)
