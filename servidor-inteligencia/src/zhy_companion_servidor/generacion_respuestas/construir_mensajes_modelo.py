def construir_mensajes_modelo(solicitud) -> list[dict[str,str]]:
    personaje=solicitud.personaje
    usuario=solicitud.personaUsuario
    ajustes=solicitud.ajustesConversacion
    preferencias=solicitud.preferenciasGeneracion
    recuerdos=personaje.get('recuerdosBase') or []
    rasgos=personaje.get('rasgos') or []
    instrucciones=preferencias.get('instruccionesFormato') or []
    perfil=getattr(solicitud,'perfilInspiracion',None) or {}
    modificadores=ajustes.get('modificadoresTemporales') or ''
    partes=[
        f"Eres {personaje.get('nombre','un personaje')} dentro de una aplicación de compañía conversacional.",
        'IDENTIDAD Y DESCRIPCIÓN:',
        personaje.get('descripcion',''),
        f"Indicación adicional: {personaje.get('indicacionAdicional','')}",
        f"Rasgos: {', '.join(rasgos)}",
        'RECUERDOS RELEVANTES:',
        *[f'- {r}' for r in recuerdos[-30:]],
        f"Persona del usuario: {usuario.get('nombre','Usuario')} · {usuario.get('descripcion','')}",
        f'Modificadores temporales de este chat: {modificadores}',
        f"Perfil de generación: {perfil.get('nombre','propio')} · {perfil.get('descripcion','')}",
        'REGLAS DE SALIDA:',
        *[f'- {r}' for r in instrucciones],
        '- No hables como un asistente genérico. Mantén continuidad y la voz del personaje.',
    ]
    mensajes=[{'role':'system','content':'\n'.join(x for x in partes if x)}]
    for mensaje in solicitud.historial[-40:]:
        texto=mensaje.get('texto') or ''
        if not texto:
            continue
        rol='assistant' if mensaje.get('rol')=='personaje' else 'user'
        mensajes.append({'role':rol,'content':texto})
    if mensajes[-1].get('content') != solicitud.mensaje:
        mensajes.append({'role':'user','content':solicitud.mensaje})
    return mensajes
