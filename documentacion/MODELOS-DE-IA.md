# Modelos de IA · v0.5

## Regla

**Personaje y modelo son capas diferentes.** Cambiar Claude/Qwen/DeepSeek/MiniMax/etc. no debe cambiar identidad, memoria o relaciones del personaje.

## Familias preparadas

- automático servidor + respaldo;
- modelo prioritario del servidor;
- Claude vía backend;
- Qwen vía backend;
- DeepSeek vía backend;
- MiniMax vía backend;
- Ollama local en PC;
- motor narrativo offline de demostración.

## Parámetros por modelo

Cada entrada declara sus propios controles. La interfaz puede mostrar temperatura, DRY, Top P, Top K, penalización de frecuencia, longitud, multiplicador y acciones narrativas solo cuando corresponda.

## Referencias vistas en HiWaifu

StoryWeaver, StoryWeaver Flash, SpiritCraft, EpicTale, character-* y Enigma Echo se conservan únicamente como **nombres de referencia/perfiles inspirados de comportamiento**. ZHY Companion no contiene sus pesos, API privada ni código interno.

## Respuestas diferentes

Es normal que un mismo personaje responda distinto según el modelo. También influyen temperatura, longitud, memoria recuperada, prompt, estilo y otros parámetros. Por eso la app guarda estas capas por separado.
