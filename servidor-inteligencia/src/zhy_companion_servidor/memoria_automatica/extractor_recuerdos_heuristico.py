import re
from dataclasses import dataclass

@dataclass(slots=True)
class RecuerdoHeuristico:
    tipo: str
    contenido: str
    confianza: float

PATRONES=[
    ('gusto',re.compile(r'\b(?:me gusta|me encanta|amo)\s+(.{2,100})',re.I),'Le gusta {x}'),
    ('preferencia',re.compile(r'\bprefiero\s+(.{2,100})',re.I),'Prefiere {x}'),
    ('disgusto',re.compile(r'\b(?:odio|no soporto|detesto)\s+(.{2,100})',re.I),'No le gusta {x}'),
    ('identidad',re.compile(r'\b(?:me llamo|mi nombre es)\s+([\wÁÉÍÓÚÜÑáéíóúüñ -]{2,60})',re.I),'Su nombre es {x}'),
    ('hecho_personal',re.compile(r'\bmi (?:cumpleaños|cumple) es\s+(.{2,60})',re.I),'Su cumpleaños es {x}'),
]

def extraer_recuerdos_de_texto(texto: str) -> list[RecuerdoHeuristico]:
    salida=[]
    limpio=' '.join(texto.strip().split())
    for tipo,patron,plantilla in PATRONES:
        coincidencia=patron.search(limpio)
        if coincidencia:
            valor=coincidencia.group(1).strip(' .,!?:;')
            salida.append(RecuerdoHeuristico(tipo,plantilla.format(x=valor),0.82))
    return salida

def extraer_recuerdos_de_mensajes(mensajes: list[dict]) -> list[RecuerdoHeuristico]:
    vistos=set(); salida=[]
    for mensaje in mensajes:
        if mensaje.get('rol') not in {'usuario','user'}:
            continue
        texto=mensaje.get('texto',mensaje.get('content',''))
        for recuerdo in extraer_recuerdos_de_texto(texto):
            clave=(recuerdo.tipo,recuerdo.contenido.casefold())
            if clave not in vistos:
                vistos.add(clave); salida.append(recuerdo)
    return salida
