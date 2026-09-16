# Estado funcional v0.4.1

## Funciona ya

- Interfaz responsive web/PWA.
- Personaje secundario `Demo`.
- Creación/edición/detalles/favoritos de personajes.
- Chats, historial archivado y ordenamiento.
- Parser de acciones `*acción*` + diálogo.
- Respuestas largas del motor offline de laboratorio.
- Memoria automática heurística local.
- Caja de memoria y tarjetas editables.
- Estilos de chat y modificadores temporales.
- Modelos por familia y perfiles narrativos inspirados en comportamientos observados en HiWaifu.
- Temperatura, longitud, acciones y DRY donde corresponda como configuración.
- Voz del dispositivo mediante Speech Synthesis cuando el navegador/WebView la soporte.
- PWA/service worker.
- Backend FastAPI independiente.
- Router secuencial LiteLLM con fallback entre IDs configurados.
- Sesión opcional por contraseña para proteger el backend.
- Health/readiness endpoints.
- Render Blueprint.
- GitHub Actions.
- Configuración Capacitor 8 para Android.
- Fallback offline inmediato si no hay URL de servidor; fallback rápido si el servidor no responde.

## Requiere configuración externa

- Un proveedor/modelo real necesita API key en el backend.
- El backend 24/7 necesita hosting siempre activo; la plantilla está preparada para Render de pago.
- PostgreSQL se crea al desplegar el Blueprint.
- La URL final del backend se coloca en `aplicacion-cliente/aplicacion/configuracion/configuracion-conexion-servidor.js`.

## Preparado pero no terminado

- Generación de imágenes real.
- Voz premium/TTS de servidor.
- Sincronización completa de memoria entre dispositivos.
- Grupos de personajes.
- Notificaciones push remotas.
- Sistema de saludos espontáneos con scheduler remoto.
- Mack: deliberadamente NO incluida todavía.
