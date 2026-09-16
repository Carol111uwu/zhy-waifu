# ZHY Companion v0.4.1

Aplicación independiente de compañía conversacional. **Mack todavía no está incluida**: `Demo` es el personaje descartable para probar la app antes de importar una personalidad premium.

## Qué contiene

- Cliente HTML/CSS/JavaScript vanilla, responsive y PWA.
- Configuración para convertir el mismo cliente en Android con Capacitor 8.
- Personajes, biblioteca, chats, historial, memoria automática local y tarjetas de memoria.
- Acciones narrativas `*acción*` separadas visualmente del diálogo.
- Modelos seleccionables por familia, temperatura, longitud, frecuencia de acciones y perfiles inspirados en estilos vistos en HiWaifu (sin afirmar acceso a sus modelos internos).
- Backend Python FastAPI independiente.
- LiteLLM para cambiar/fallback entre proveedores sin reescribir la app.
- PostgreSQL para persistencia del servidor.
- Fallback narrativo local para que la app siga utilizable si backend/modelos no responden.
- GitHub Actions, Render Blueprint y documentación de despliegue.

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

Consulta `documentacion/` antes de desplegar.
