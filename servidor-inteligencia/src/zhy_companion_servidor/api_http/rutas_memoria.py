from fastapi import APIRouter, Depends
from zhy_companion_servidor.modelos_datos.memoria import SolicitudExtraccionMemoria, RespuestaExtraccionMemoria, RecuerdoDetectado
from zhy_companion_servidor.memoria_automatica.extractor_recuerdos_heuristico import extraer_recuerdos_de_mensajes
from zhy_companion_servidor.seguridad_acceso.dependencia_sesion import exigir_sesion_si_esta_configurada

router=APIRouter(prefix='/api/v1/memoria',tags=['memoria'])

@router.post('/extraer',response_model=RespuestaExtraccionMemoria)
def extraer(datos:SolicitudExtraccionMemoria,_:None=Depends(exigir_sesion_si_esta_configurada)):
    recuerdos=[RecuerdoDetectado(tipo=r.tipo,contenido=r.contenido,confianza=r.confianza) for r in extraer_recuerdos_de_mensajes(datos.mensajes)]
    return RespuestaExtraccionMemoria(recuerdos=recuerdos)
