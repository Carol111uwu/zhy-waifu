from fastapi import APIRouter, Depends, HTTPException, Request
from zhy_companion_servidor.modelos_datos.solicitud_generacion import SolicitudGeneracion
from zhy_companion_servidor.modelos_datos.respuesta_generacion import RespuestaGeneracion
from zhy_companion_servidor.generacion_respuestas.coordinador_generacion import generar_respuesta
from zhy_companion_servidor.generacion_respuestas.enrutador_modelos_litellm import SinModelosConfigurados, TodosLosModelosFallaron
from zhy_companion_servidor.seguridad_acceso.dependencia_sesion import exigir_sesion_si_esta_configurada
from zhy_companion_servidor.seguridad_acceso.limitador_solicitudes import aplicar_limite_basico

router=APIRouter(prefix='/api/v1',tags=['generacion'])

@router.post('/generar',response_model=RespuestaGeneracion)
async def generar(datos:SolicitudGeneracion,request:Request,_:None=Depends(exigir_sesion_si_esta_configurada)):
    await aplicar_limite_basico(request)
    try:
        resultado=await generar_respuesta(datos)
        return RespuestaGeneracion(texto=resultado.texto,modeloId=resultado.modelo,proveedor=resultado.proveedor,advertencias=resultado.errores_previos)
    except SinModelosConfigurados as exc:
        raise HTTPException(status_code=503,detail=str(exc))
    except TodosLosModelosFallaron as exc:
        raise HTTPException(status_code=502,detail={'mensaje':'Ningún modelo respondió','errores':exc.errores[-4:]})
