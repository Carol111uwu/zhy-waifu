# GitHub y despliegue

## Un solo repositorio

Guardar todo ZHY Companion en un repositorio privado o público:

```text
ZHY-COMPANION/
├── aplicacion-cliente/
├── servidor-inteligencia/
├── contratos-compartidos/
├── documentacion/
├── .github/workflows/
├── capacitor.config.json
└── render.yaml
```

GitHub conserva código, ramas, historial y CI. **No guardar API keys ni `.env`.**

## Hosting recomendado

### Producción principal: Render

Conectar el repositorio a Render y crear un Blueprint usando `render.yaml`.

- `zhy-companion-web`: sitio estático.
- `zhy-companion-api`: FastAPI siempre activo con plan de pago.
- `zhy-companion-db`: PostgreSQL administrado.

Render puede desplegar cada cambio de Git y usa health checks para evitar enviar tráfico a una versión que no arrancó correctamente.

### GitHub Pages: opcional

El workflow `publicar-github-pages.yml` publica **solo `aplicacion-cliente/`**. Es útil para demo/PWA estática, pero Pages no ejecuta Python. El backend continúa desplegado por separado.

## Flujo de cambios seguro

1. Crear rama.
2. Modificar un módulo.
3. GitHub Actions ejecuta pruebas JS y Python.
4. Fusionar a `main` solo si pasan.
5. Render reconstruye y despliega.
6. El health check decide cuándo la nueva API está lista.

Si un deploy del backend falla, la versión anterior puede seguir atendiendo mientras se corrige el commit.

## CORS

El Blueprint inicial usa `ORIGENES_PERMITIDOS=*` para que la primera publicación web/Android no falle por desconocer todavía la URL final del frontend. Como no usamos cookies de autenticación (`allow_credentials=False`), esto facilita el primer despliegue. Cuando conozcas el dominio definitivo, puedes reemplazar `*` por el origen exacto desde Render.
