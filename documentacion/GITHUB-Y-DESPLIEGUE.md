# GitHub y despliegue · v0.5

## Repositorio oficial

`https://github.com/Carol111uwu/zhy-waifu`

GitHub conserva código, historial y Actions. No subir `.env`, claves de proveedores ni tokens.

## Frontend sin costo

GitHub Pages publica `aplicacion-cliente/` mediante `.github/workflows/publicar-github-pages.yml`. La URL actual prevista es:

```text
https://carol111uwu.github.io/zhy-waifu/
```

Este sitio contiene la PWA y sigue abriendo aunque el backend Python no esté disponible.

## Backend opcional

`render.yaml` describe un Web Service Python gratuito opcional. Un servicio gratuito puede dormirse o cambiar sus límites. Por eso el cliente no depende de él para arrancar y tiene respaldo local.

## Flujo seguro

1. editar un módulo;
2. ejecutar pruebas;
3. commit;
4. push a `main`;
5. GitHub Actions verifica cliente y servidor;
6. Pages publica el cliente;
7. si una publicación falla, la versión previa sigue siendo el punto de referencia en Git.

## CORS

El ejemplo de backend permite el origen de GitHub Pages. Para Android nativo u otros dominios se agregan explícitamente los orígenes necesarios en el servidor.
