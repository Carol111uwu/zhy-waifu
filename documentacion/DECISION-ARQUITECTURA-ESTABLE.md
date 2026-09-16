# Decisión de arquitectura estable

## Objetivo

Que ZHY Companion siga siendo utilizable aunque falle un modelo, un proveedor o temporalmente el servidor de inteligencia.

## Capas

```text
Android / PWA / Web
        │
        ├── interfaz + chats + memoria local + personaje Demo
        │
        └── proveedor automático
                 │
          ┌──────┴──────┐
          ▼             ▼
      FastAPI        respaldo local
          │
       LiteLLM
          │
   ┌──────┼────────┐
   ▼      ▼        ▼
OpenRouter directos Ollama(dev)
          │
      PostgreSQL
```

## Reglas de estabilidad

- El cliente nunca contiene claves de proveedores.
- Python no es necesario para abrir la app.
- URL de backend vacía = fallback local inmediato.
- Backend no accesible = comprobación corta y fallback local.
- Modelo A falla = backend intenta el siguiente modelo configurado.
- Datos persistentes de servidor van a PostgreSQL, no al disco efímero del host.
- Personalidad y modelos permanecen desacoplados.
- Mack no está incluida hasta terminar las pruebas con `Demo`.

## Cambiar la URL del backend sin buscar por todo el proyecto

Solo edita:

`aplicacion-cliente/aplicacion/configuracion/configuracion-conexion-servidor.js`

Así Android, PWA y web comparten el mismo valor predeterminado sin acoplar las vistas al hosting.
