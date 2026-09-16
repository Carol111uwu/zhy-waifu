# ZHY Companion v0.5.0

Aplicación independiente de personajes y conversación con IA, pensada primero como **app de chat** y no como panel técnico. La experiencia fue reconstruida después de analizar los flujos útiles de una app de referencia, sin copiar sus recursos, código ni servicios internos.

**Mack todavía no está incluida.** `Demo` sigue siendo el personaje de laboratorio para validar la aplicación antes de importar una personalidad compleja.

## Qué cambió en v0.5

- Inicio convertido en biblioteca de personajes con búsqueda y favoritos.
- Lista de chats estilo mensajería, borradores, fechas, orden y pestaña de grupos preparada.
- Navegación principal: `Inicio · Chats · Crear · Personajes · Mi`.
- Modelos movidos fuera de la navegación principal: ahora se seleccionan **por conversación**.
- `Personaje ≠ modelo`: cambiar el modelo conserva identidad, memoria e historial.
- Chat con opciones por mensaje: copiar, editar, otra respuesta, rebobinar, guardar en memoria y eliminar.
- Respuestas alternativas conservadas y navegables sin destruir inmediatamente la anterior.
- Ramas al rebobinar para no perder el tramo eliminado.
- Caja de memoria dividida en `Caja · Yo · Personaje`.
- Tarjetas de memoria editables, ordenables y eliminables.
- Persona del usuario ampliada: nombre, apodo, pronombres, identidad, biografía, gustos y límites.
- Configuración por chat: modelo, estilo, persona, nombre, fondo, burbujas, historial, ramas, memoria, modificadores temporales, música e imagen.
- Parámetros avanzados dinámicos según modelo: temperatura, DRY, Top P, Top K, penalización de frecuencia, longitud y acciones cuando correspondan.
- Pantalla de error de arranque: si un módulo falla, la app ya no debe quedarse simplemente negra.
- PWA y caché actualizados a v0.5.
- Backend Python sigue aislado; la app web/Android abre aunque el servidor no responda.

## Arquitectura sin costo obligatorio

- **Frontend/PWA:** GitHub Pages.
- **Android:** mismo cliente con Capacitor.
- **IA remota:** backend FastAPI opcional.
- **Sin servidor:** la app conserva interfaz, personajes, chats y memoria local, y puede usar el motor demostrativo.
- `render.yaml` queda como ejemplo de backend gratuito opcional; los servicios gratuitos pueden dormir y no se consideran disponibilidad 24/7 garantizada.

## Ejecutar cliente

```bash
npm run servir:web
```

Abrir `http://127.0.0.1:8080`.

## Probar

```bash
npm run probar:web
cd servidor-inteligencia
PYTHONPATH=src pytest -q pruebas
```

## Android

```bash
npm install
npm run android:agregar
npm run android:sincronizar
npm run android:abrir
```

Lee `documentacion/DOCUMENTO-MAESTRO-v0.5.md` para el estado funcional y las decisiones actuales.
