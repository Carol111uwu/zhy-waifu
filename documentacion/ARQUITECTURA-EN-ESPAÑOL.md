# Arquitectura en español · ZHY Companion v0.5

```text
ZHY-COMPANION/
├── aplicacion-cliente/
│   ├── index.html
│   ├── aplicacion/
│   │   ├── arranque-seguro.js
│   │   ├── configuracion/
│   │   ├── estado-y-persistencia-aplicacion/
│   │   ├── navegacion-aplicacion/
│   │   ├── integraciones/inteligencia-artificial/
│   │   └── modulos/
│   │       ├── inicio-aplicacion/
│   │       ├── listado-conversaciones/
│   │       ├── centro-creacion/
│   │       ├── perfil-aplicacion/
│   │       ├── conversacion/
│   │       ├── personajes/
│   │       ├── configuracion-conversacion/
│   │       ├── memoria-automatica/
│   │       ├── memoria-personaje/
│   │       ├── tarjetas-memoria/
│   │       ├── modelos-ia/
│   │       ├── voz-personaje/
│   │       ├── musica-conversacion/
│   │       └── notificaciones/
│   ├── estilos/
│   ├── publico/
│   └── trabajador-servicio.js
├── servidor-inteligencia/
│   └── FastAPI + LiteLLM + persistencia opcional
├── contratos-compartidos/
├── documentacion/
├── .github/workflows/
├── capacitor.config.json
└── render.yaml
```

## Separación obligatoria

- personaje ≠ modelo;
- memoria ≠ historial;
- memoria objetiva ≠ interpretación;
- ajustes temporales ≠ personalidad base;
- frontend ≠ servidor Python;
- proveedor IA ≠ interfaz;
- PWA/Android comparten el mismo cliente;
- Mack será un perfil nuevo, no una reescritura del motor.

## Resultado

El usuario ve una app sencilla de chat. La complejidad vive debajo en módulos con nombres descriptivos y responsabilidades pequeñas.
