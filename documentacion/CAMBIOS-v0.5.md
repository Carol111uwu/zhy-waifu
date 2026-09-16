# Cambios principales · v0.5

## Experiencia

- navegación reconstruida alrededor de Inicio, Chats, Crear, Personajes y Mi;
- modelos retirados de la navegación principal y movidos al chat;
- biblioteca con búsqueda/favoritos;
- chats tipo mensajería con borradores y orden;
- ficha de personaje simplificada;
- perfil/persona del usuario independiente.

## Conversación

- menú por mensaje;
- edición/copia/eliminación;
- otra respuesta sin perder inmediatamente la anterior;
- navegación entre alternativas;
- rebobinado con rama conservada;
- errores de IA visibles sin romper la app;
- modelo visible/cambiable desde la cabecera del chat.

## Memoria

- Caja / Yo / Personaje;
- memoria base;
- recuerdos automáticos;
- tarjetas con categoría/origen;
- editar, subir, bajar y borrar tarjetas;
- guardar una respuesta directamente como tarjeta.

## Modelos

- selección por conversación;
- configuración avanzada declarativa;
- temperatura, DRY, Top P, Top K, penalización, longitud y acciones según capacidades;
- backend recibe parámetros estándar compatibles;
- persona y memoria permanecen separadas del modelo.

## Robustez

- `arranque-seguro.js` captura errores de carga y evita pantalla negra silenciosa;
- pruebas CI verifican existencia de rutas y exports nombrados de imports;
- service worker actualizado a caché v0.5 y estrategia network-first;
- frontend funciona sin Python;
- `render.yaml` deja de requerir servicios de pago y pasa a backend gratuito opcional.
