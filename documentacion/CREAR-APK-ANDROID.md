# Crear una aplicación Android real

ZHY Companion usa Capacitor 8. El mismo HTML/CSS/JS que corre en la web se empaqueta en Android.

Requisitos en PC: Node.js, Android Studio y JDK compatible con la versión actual de Android Studio.

```bash
npm install
npm run android:agregar
npm run android:sincronizar
npm run android:abrir
```

Desde Android Studio puedes generar APK para pruebas o AAB para publicación.

Los teléfonos objetivo son HONOR X7d 8/256, HONOR X6, Galaxy A21s, Galaxy A32 y ZTE Blade A7s/A7020. Por eso el LLM pesado no se ejecuta dentro del teléfono; el dispositivo mantiene la UI, memoria local de respaldo y conexión al servidor.

## Scripts incluidos

Desde la raíz puedes usar:

- Windows PowerShell: `./recursos-despliegue/preparar-android-windows.ps1`
- Linux/macOS: `./recursos-despliegue/preparar-android-linux-macos.sh`

El directorio `android/` es generado por Capacitor y Android Studio. Sus nombres internos (`MainActivity`, `build.gradle`, etc.) siguen las convenciones obligatorias del ecosistema Android aunque el código propio de ZHY Companion mantenga nombres descriptivos en español.
