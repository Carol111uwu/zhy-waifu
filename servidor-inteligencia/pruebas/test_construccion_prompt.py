from types import SimpleNamespace
from zhy_companion_servidor.generacion_respuestas.construir_mensajes_modelo import construir_mensajes_modelo

def test_incluye_personaje_y_acciones():
    solicitud=SimpleNamespace(
        personaje={'nombre':'Demo','descripcion':'Curioso','rasgos':['bromista'],'recuerdosBase':['Le gusta el azul']},
        personaUsuario={'nombre':'Carol'},
        ajustesConversacion={'modificadoresTemporales':'energía alta'},
        preferenciasGeneracion={'instruccionesFormato':['Usa *acciones*']},
        historial=[],
        mensaje='hola',
    )
    mensajes=construir_mensajes_modelo(solicitud)
    assert 'Demo' in mensajes[0]['content'] and 'acciones' in mensajes[0]['content']
