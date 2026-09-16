$ErrorActionPreference = "Stop"
Write-Host "Instalando dependencias exactas de Capacitor..."
npm install
if (-not (Test-Path "android")) {
  Write-Host "Creando proyecto Android nativo..."
  npx cap add android
}
Write-Host "Sincronizando cliente web con Android..."
npx cap sync android
Write-Host "Listo. Para abrir Android Studio: npm run android:abrir"
