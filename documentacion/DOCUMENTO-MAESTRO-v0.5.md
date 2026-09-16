# Documento maestro · ZHY Companion v0.5

## 1. Objetivo

Construir una aplicación propia de personajes conversacionales para web/PWA/Android. La interfaz debe sentirse como una app de chat y esconder la complejidad técnica. La arquitectura permanece modular para que cambiar personajes, modelos, memoria, voz, imágenes o backend afecte lo mínimo posible a otros módulos.

## 2. Regla central

```text
PERSONAJE ≠ MODELO DE IA
```

El personaje define identidad, personalidad, relaciones, memoria, límites, forma de hablar y ejemplos. El modelo es el motor que procesa el contexto y redacta la respuesta. Un mismo personaje puede cambiar de modelo sin convertirse en otra persona.

## 3. Navegación principal

```text
Inicio   Chats   + Crear   Personajes   Mi
```

Los modelos ya no son una sección principal. Se eligen dentro del chat.

## 4. Biblioteca

- Mis personajes.
- Favoritos.
- Búsqueda.
- Ficha individual.
- Chat / editar / favorito / eliminar personajes creados.
- `Demo` es el único personaje de laboratorio incluido de fábrica.
- Mack se incorporará después como perfil independiente.

## 5. Chats

- Lista con avatar, último mensaje, hora/fecha y borrador.
- Orden por recientes o antiguos.
- Opción de recibir saludos preparada.
- Pestaña Grupos reservada sin mezclarla todavía con chats individuales.
- Cada personaje mantiene su conversación y sus ajustes.

## 6. Mensajes

Formato de acciones:

```text
*acción narrativa*
diálogo normal
```

Opciones de mensaje implementadas:

- copiar;
- editar mensajes del usuario;
- generar otra respuesta;
- conservar alternativas de una respuesta;
- navegar entre alternativas;
- guardar respuesta como tarjeta de memoria;
- rebobinar desde un mensaje;
- eliminar;
- voz del dispositivo para mensajes del personaje.

## 7. Ramas

`Rebobinar desde aquí` no elimina silenciosamente el futuro. Guarda el tramo retirado en `ramasConversacionPorPersonaje`. Una rama puede restaurarse después.

## 8. Configuración por conversación

- modelo de IA;
- estilo de chat;
- persona del usuario;
- nombre del chat;
- fondo;
- burbuja;
- música;
- historial archivado;
- ramas;
- caja de memoria;
- modificadores temporales del personaje;
- preferencia visual ACG/realista para futuro módulo de imágenes.

Los modificadores temporales no reescriben la personalidad base.

## 9. Modelos

Familias preparadas para backend:

- Claude;
- Qwen;
- DeepSeek;
- MiniMax;
- modelo prioritario del servidor;
- Ollama local en PC;
- automático servidor + respaldo;
- motor demostrativo offline.

Los nombres observados en otras aplicaciones como StoryWeaver, SpiritCraft, EpicTale o Enigma Echo permanecen únicamente como **perfiles de estilo inspirados**. No se afirma disponer de sus pesos/modelos internos.

### Parámetros dinámicos

Cada modelo declara qué controles admite. La pantalla solo muestra los correspondientes:

- temperatura;
- DRY multiplier;
- Top P;
- Top K;
- penalización de frecuencia;
- longitud;
- multiplicador de longitud;
- frecuencia de acciones narrativas.

## 10. Memoria

Tres superficies visibles:

```text
Caja
Yo
Personaje
```

Capas internas:

1. historial bruto;
2. memoria automática sobre el usuario;
3. memoria automática sobre el personaje;
4. memoria base editable;
5. tarjetas independientes;
6. ramas e historiales archivados.

Las tarjetas incluyen categoría, origen y contenido; pueden editarse, reordenarse o eliminarse.

## 11. Persona del usuario

Separada de los personajes:

- nombre;
- apodo;
- pronombres;
- identidad/género opcional;
- avatar URL;
- biografía;
- gustos;
- límites.

## 12. Personaje

Campos actuales:

- nombre;
- género;
- edad;
- avatar;
- subtítulo;
- descripción;
- saludo;
- rasgos;
- categoría;
- etiquetas;
- voz;
- visibilidad local;
- música de fondo predeterminada;
- indicación adicional;
- creatividad;
- recuerdos base;
- modelo predeterminado para chats nuevos;
- perfil de estilo narrativo.

## 13. Robustez

El cliente y Python son procesos independientes.

Si el backend falla:

```text
interfaz         sigue ✅
personajes       siguen ✅
chats locales    siguen ✅
memoria local    sigue ✅
ajustes           siguen ✅
IA remota         puede fallar ⚠
```

Se añadió un arranque seguro: si un módulo JavaScript rompe el grafo de imports, se muestra una pantalla de error y botón de reintento en vez de una pantalla negra sin explicación.

## 14. Hosting sin dinero

- GitHub Pages mantiene el cliente estático gratis.
- El backend remoto es opcional.
- Un hosting gratuito de backend puede dormir; no se promete 24/7.
- El fallback local evita que la app completa quede inutilizable por eso.
- Nunca guardar API keys en GitHub, JavaScript o APK.

## 15. Mack

Mack no se usa para depurar infraestructura. Se integrará cuando estén estables:

- interfaz;
- chats;
- memoria;
- modelos reales;
- alternativas/ramas;
- personalización;
- PWA/Android.

Su identidad deberá seguir siendo portable entre esta app y un posible ZHY-BOT futuro.

## 16. Pendiente después de v0.5

- backend real con un proveedor/modelo configurado;
- subida de imágenes/avatares sin URL manual;
- generación real de imágenes;
- proveedor de voz avanzado;
- grupos;
- historias;
- notificaciones espontáneas reales;
- APK firmado;
- pruebas de modelo comparativas;
- importación de Mack.
