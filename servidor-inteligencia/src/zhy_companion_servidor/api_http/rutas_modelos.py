from fastapi import APIRouter, Depends
from zhy_companion_servidor.configuracion_servidor.configuracion_entorno import obtener_configuracion_entorno
from zhy_companion_servidor.seguridad_acceso.dependencia_sesion import exigir_sesion_si_esta_configurada

router=APIRouter(prefix='/api/v1/modelos',tags=['modelos'])

@router.get('')
def listar(_:None=Depends(exigir_sesion_si_esta_configurada)):
    modelos=obtener_configuracion_entorno().lista_modelos_prioridad
    return {'configurados':bool(modelos),'modelos':[{'id':m,'orden':i+1} for i,m in enumerate(modelos)]}
