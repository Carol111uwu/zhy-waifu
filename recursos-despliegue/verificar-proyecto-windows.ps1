$ErrorActionPreference = "Stop"
node .\aplicacion-cliente\pruebas\ejecutar-pruebas-basicas.mjs
python -m compileall -q .\servidor-inteligencia\src .\servidor-inteligencia\pruebas
Push-Location .\servidor-inteligencia
$env:PYTHONPATH = "src"
pytest -q pruebas
Pop-Location
