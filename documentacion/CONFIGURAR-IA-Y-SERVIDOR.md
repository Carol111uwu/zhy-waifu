# Configurar IA y servidor · v0.5

## La app no depende de Python para abrir

`aplicacion-cliente/` funciona como PWA/Android con datos locales. `servidor-inteligencia/` es opcional y contiene FastAPI + LiteLLM para modelos reales.

Si el backend no está disponible, el modo recomendado `automático con respaldo` entra al motor demostrativo local y mantiene la aplicación utilizable.

## Opción elegida para IA

Usar **LiteLLM en nuestro backend** como capa estable. Permite cambiar el modelo real sin editar el frontend.

Posibles proveedores detrás del servidor:

- OpenRouter;
- Anthropic/Claude;
- Qwen/DashScope;
- DeepSeek;
- MiniMax;
- Ollama en PC.

Las claves se configuran únicamente como variables secretas del servidor.

## Desarrollo local

```bash
cd servidor-inteligencia
python -m venv .venv
# Windows: .venv\\Scripts\\activate
# Linux/macOS/Termux compatible: source .venv/bin/activate
pip install -r requirements-dev.txt
cp .env.example .env
uvicorn zhy_companion_servidor.iniciar_servidor:aplicacion --app-dir src --reload --port 8000
```

## Sin dinero

El frontend puede vivir permanentemente en GitHub Pages. El `render.yaml` de v0.5 es solo una plantilla de backend gratuito opcional. Los planes gratuitos pueden dormir, reiniciarse o cambiar sus límites; por eso **no se considera requisito para que la app abra**.

Si más adelante existe un servidor estable, basta con configurar su URL en `Mi → Ajustes`.

## Importante

No subir `.env`, tokens ni API keys al repositorio. No poner secretos dentro de JavaScript, PWA ni APK.
