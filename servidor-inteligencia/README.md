# Servidor de inteligencia de ZHY Companion

Backend opcional pero recomendado para usar modelos reales sin exponer claves en el navegador o APK.

- FastAPI sirve una API estable.
- LiteLLM unifica varios proveedores y permite fallback.
- Si el servidor no está disponible, el cliente puede continuar en modo demostración/offline.
- SQLite sirve para desarrollo local; PostgreSQL administrado es la opción de producción.
