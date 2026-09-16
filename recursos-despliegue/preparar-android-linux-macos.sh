#!/usr/bin/env sh
set -eu
printf '%s\n' 'Instalando dependencias exactas de Capacitor...'
npm install
if [ ! -d android ]; then
  printf '%s\n' 'Creando proyecto Android nativo...'
  npx cap add android
fi
printf '%s\n' 'Sincronizando cliente web con Android...'
npx cap sync android
printf '%s\n' 'Listo. Para abrir Android Studio: npm run android:abrir'
