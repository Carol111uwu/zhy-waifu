# ZHY Companion Web ES · Laboratorio de personaje secundario

Versión de prueba independiente para validar la experiencia tipo companion antes de integrar a Mack.

## Personaje actual

- **Demo**: personaje secundario descartable de laboratorio; Mack todavía no está incluida.
- Mack **no está incluida todavía**. Se añadirá después como un perfil nuevo cuando su diseño quede cerrado.

## Funciones implementadas

- Chat mobile-first con respuestas largas.
- Acciones narrativas `*entre asteriscos*` separadas visualmente del diálogo.
- Regeneración de la última respuesta.
- Editor de personaje: nombre, género, edad adulta, avatar por URL, subtítulo, descripción, saludo, rasgos, creatividad y modelo preferido.
- Generador local de ejemplo para saludo y descripción.
- Estilos de chat de `1 Calma` a `5 Energía`.
- Persona del usuario separada del personaje.
- Nombre del chat por personaje.
- Fondos de conversación y estilos de burbuja.
- Historial archivado al crear un chat nuevo.
- Caja de memoria editable separada del historial.
- Modificadores temporales: tímido/coqueto, serio/juguetón, calmado/energético.
- Preferencia de estilo de imagen ACG/Realista y activador de generación visual (la generación real se conectará después).
- Música de fondo por URL y control de volumen.
- Catálogo de modelos y perfiles de referencia.
- Configuración avanzada por modelo: temperatura, longitud, frecuencia de acciones y multiplicador 1x / 1.5x / 2x / 3x.
- Mensajes/avisos del sistema separados de los chats de personaje.
- Proveedor de demostración sin API y conector HTTP preparado para ZHY-AI.

## Modelos

Los nombres propios de HiWaifu (StoryWeaver, SpiritCraft, EpicTale, character-* y Enigma Echo) se conservan como **referencias de experiencia**. Esta aplicación no afirma ejecutar esos modelos internos.

## Ejecutar

No requiere Vite, React ni compilación.

```bash
python -m http.server 8080
```

Abrir `http://localhost:8080`.

También puede usarse cualquier servidor local equivalente de VS Code, Antigravity, Acode, Spck u otro editor que sirva archivos ES Modules mediante HTTP.

## Pruebas

```bash
npm run probar
```

No instala paquetes: el script de prueba usa Node.js únicamente.
