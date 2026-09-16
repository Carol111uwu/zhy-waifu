# Configurar IA y servidor

## Arquitectura recomendada

La aplicación se divide deliberadamente en dos procesos independientes:

1. `aplicacion-cliente/`: interfaz, personajes, chats, memoria local, PWA y contenido Android. Sigue abriendo aunque la IA remota no responda.
2. `servidor-inteligencia/`: FastAPI + LiteLLM + PostgreSQL. Guarda secretos y llama modelos reales.

Python **no forma parte del arranque del cliente Android/web**. Si el backend está caído, el modo `automático con respaldo` cambia al generador offline de demostración en pocos segundos.

## Opción de modelos elegida

Usar **LiteLLM en nuestro backend** como interfaz estable.

Orden recomendado:

1. OpenRouter como acceso principal a varios modelos/proveedores con una sola clave.
2. Proveedores directos opcionales (Anthropic, DeepSeek, Qwen/DashScope, MiniMax) como fallbacks externos adicionales.
3. Ollama solo para desarrollo local en PC.
4. Motor narrativo offline de la app como último respaldo de experiencia, no como LLM real.

El frontend solo conoce familias (`Claude`, `Qwen`, etc.). Los IDs reales se configuran en variables de entorno y pueden cambiarse sin editar la app.

## Desarrollo local

```bash
cd servidor-inteligencia
python -m venv .venv
# Windows: .venv\\Scripts\\activate
# Linux/macOS: source .venv/bin/activate
pip install -r requirements-dev.txt
cp .env.example .env
uvicorn zhy_companion_servidor.iniciar_servidor:aplicacion --app-dir src --reload --port 8000
```

Después, en Ajustes de la app, usa `http://127.0.0.1:8000` como URL del servidor.

## Producción

Para disponibilidad continua no uses un Web Service gratuito que se duerma. `render.yaml` está preparado con:

- cliente estático;
- Web Service Python `0.5c-512mb`;
- PostgreSQL `0.1c-256mb`;
- health check `/salud/preparado`;
- despliegue automático desde GitHub.

Ningún hosting puede prometer 100 % de uptime. Esta arquitectura reduce el impacto de fallas porque la app cliente es independiente y cuenta con fallback local.

## Variables

Copia `.env.example` a `.env` solo en desarrollo. Nunca subas `.env`.

`MODELOS_LITELLM_PRIORIDAD` es una lista separada por comas, por ejemplo:

```text
openrouter/<modelo-principal>,openrouter/<modelo-respaldo>,anthropic/<modelo-directo>
```

Usa IDs vigentes del proveedor en el momento de configurar producción. No se fijan IDs comerciales en el código para evitar romper la app cuando un proveedor renombra o retira un modelo.
