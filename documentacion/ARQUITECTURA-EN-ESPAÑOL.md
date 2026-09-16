# Arquitectura en español · ZHY Companion v0.4

El proyecto es **una sola aplicación** con capas reemplazables. Python existe únicamente en el servidor opcional; el cliente web/Android puede abrir aunque el backend esté temporalmente fuera de línea.

```text
ZHY-COMPANION/
├── aplicacion-cliente/          # web + PWA + contenido Android
│   ├── aplicacion/
│   │   ├── configuracion/
│   │   ├── estado-y-persistencia-aplicacion/
│   │   ├── navegacion-aplicacion/
│   │   ├── integraciones/inteligencia-artificial/
│   │   └── modulos/
│   │       ├── inicio-aplicacion/
│   │       ├── listado-conversaciones/
│   │       ├── conversacion/
│   │       ├── personajes/
│   │       ├── memoria-automatica/
│   │       ├── memoria-personaje/
│   │       ├── tarjetas-memoria/
│   │       ├── configuracion-conversacion/
│   │       ├── modelos-ia/
│   │       ├── musica-conversacion/
│   │       ├── voz-personaje/
│   │       └── notificaciones/
│   ├── estilos/
│   ├── publico/
│   └── trabajador-servicio.js
├── servidor-inteligencia/       # FastAPI + LiteLLM + BD
├── contratos-compartidos/
├── documentacion/
├── .github/workflows/
├── capacitor.config.json
└── render.yaml
```

## Regla principal

Personaje, memoria, conversación, apariencia, proveedor de IA, servidor y despliegue son módulos diferentes. Quitar uno no debe obligar a reescribir todos los demás.

## Mack

Mack NO está implementada en esta versión. Cuando termine su ficha, se añadirá como perfil propio y podrá reutilizar chat, memoria, voz, modelos y servidor sin modificar sus motores internos.
