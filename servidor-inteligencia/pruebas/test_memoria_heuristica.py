from zhy_companion_servidor.memoria_automatica.extractor_recuerdos_heuristico import extraer_recuerdos_de_texto

def test_detecta_gusto():
    recuerdos=extraer_recuerdos_de_texto('me gusta mucho el azul')
    assert recuerdos and recuerdos[0].tipo == 'gusto'
    assert 'azul' in recuerdos[0].contenido.lower()
