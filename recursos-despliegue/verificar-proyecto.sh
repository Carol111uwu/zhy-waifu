#!/usr/bin/env sh
set -eu
node ./aplicacion-cliente/pruebas/ejecutar-pruebas-basicas.mjs
PYTHONDONTWRITEBYTECODE=1 python -m compileall -q servidor-inteligencia/src servidor-inteligencia/pruebas
cd servidor-inteligencia
PYTHONDONTWRITEBYTECODE=1 PYTHONPATH=src pytest -q pruebas
