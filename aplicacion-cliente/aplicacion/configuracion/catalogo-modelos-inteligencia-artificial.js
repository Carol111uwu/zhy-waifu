export const CATEGORIAS_MODELOS_IA=Object.freeze({
  RECOMENDADO:'recomendado',
  SERVIDOR:'servidor',
  LOCAL:'local',
  DEMOSTRACION:'demostracion',
});

export const CATALOGO_MODELOS_IA=Object.freeze([
  {
    id:'servidor-inteligencia-con-respaldo',
    nombreVisible:'Automático · servidor + respaldo offline',
    categoria:CATEGORIAS_MODELOS_IA.RECOMENDADO,
    origen:'ZHY Companion',
    descripcion:'Opción recomendada. Intenta el servidor FastAPI/LiteLLM y, si no responde, la aplicación sigue funcionando con el motor de demostración local.',
    disponibleAhora:true, permiteConexionReal:true,
    temperaturaPredeterminada:0.95, perfilLongitudPredeterminado:'muyLarga', frecuenciaAccionesPredeterminada:0.72,
    parametrosAvanzados:['temperatura','longitud','acciones','multiplicadorLongitud'],
  },
  {
    id:'servidor-modelo-prioritario',
    nombreVisible:'Modelo prioritario del servidor',
    categoria:CATEGORIAS_MODELOS_IA.SERVIDOR,
    origen:'LiteLLM · configurado en servidor',
    descripcion:'Usa el primer modelo configurado en MODELOS_LITELLM_PRIORIDAD. Permite cambiar proveedores sin modificar la app.',
    disponibleAhora:false, permiteConexionReal:true,
    temperaturaPredeterminada:0.9, perfilLongitudPredeterminado:'muyLarga', frecuenciaAccionesPredeterminada:0.65,
    parametrosAvanzados:['temperatura','longitud','acciones','multiplicadorLongitud'],
  },
  {id:'claude-servidor',nombreVisible:'Claude · vía servidor',categoria:CATEGORIAS_MODELOS_IA.SERVIDOR,origen:'Anthropic mediante LiteLLM',descripcion:'Familia Claude configurable en el backend. El identificador exacto se mantiene fuera del código cliente.',disponibleAhora:false,permiteConexionReal:true,temperaturaPredeterminada:0.85,perfilLongitudPredeterminado:'muyLarga',frecuenciaAccionesPredeterminada:0.55,parametrosAvanzados:['temperatura','longitud','acciones','multiplicadorLongitud']},
  {id:'qwen-servidor',nombreVisible:'Qwen · vía servidor',categoria:CATEGORIAS_MODELOS_IA.SERVIDOR,origen:'Qwen mediante LiteLLM',descripcion:'Familia Qwen configurable en el backend. Útil para experimentar sin exponer API keys.',disponibleAhora:false,permiteConexionReal:true,temperaturaPredeterminada:0.9,perfilLongitudPredeterminado:'muyLarga',frecuenciaAccionesPredeterminada:0.62,parametrosAvanzados:['temperatura','longitud','acciones','multiplicadorLongitud']},
  {id:'deepseek-servidor',nombreVisible:'DeepSeek · vía servidor',categoria:CATEGORIAS_MODELOS_IA.SERVIDOR,origen:'DeepSeek mediante LiteLLM',descripcion:'Familia DeepSeek configurable en el backend y disponible como posible fallback.',disponibleAhora:false,permiteConexionReal:true,temperaturaPredeterminada:0.85,perfilLongitudPredeterminado:'muyLarga',frecuenciaAccionesPredeterminada:0.55,parametrosAvanzados:['temperatura','longitud','acciones','multiplicadorLongitud']},
  {id:'minimax-servidor',nombreVisible:'MiniMax · vía servidor',categoria:CATEGORIAS_MODELOS_IA.SERVIDOR,origen:'MiniMax mediante LiteLLM',descripcion:'Familia MiniMax configurable en el backend si se dispone de acceso/API.',disponibleAhora:false,permiteConexionReal:true,temperaturaPredeterminada:0.95,perfilLongitudPredeterminado:'muyLarga',frecuenciaAccionesPredeterminada:0.68,parametrosAvanzados:['temperatura','longitud','acciones','multiplicadorLongitud']},
  {id:'ollama-local',nombreVisible:'Ollama · PC local',categoria:CATEGORIAS_MODELOS_IA.LOCAL,origen:'Equipo local',descripcion:'Para pruebas en PC con un modelo local. No se recomienda como motor principal en los teléfonos objetivo.',disponibleAhora:false,permiteConexionReal:true,temperaturaPredeterminada:0.9,perfilLongitudPredeterminado:'larga',frecuenciaAccionesPredeterminada:0.6,parametrosAvanzados:['temperatura','dryMultiplier','longitud','acciones','multiplicadorLongitud']},
  {
    id:'demostracion-narrativa-larga',nombreVisible:'Motor narrativo offline de demostración',categoria:CATEGORIAS_MODELOS_IA.DEMOSTRACION,origen:'ZHY Companion',
    descripcion:'No usa ninguna API. Sirve para probar interfaz, acciones, memoria y funcionamiento cuando no hay servidor.',
    disponibleAhora:true,permiteConexionReal:false,temperaturaPredeterminada:0.95,perfilLongitudPredeterminado:'muyLarga',frecuenciaAccionesPredeterminada:0.72,
    parametrosAvanzados:['temperatura','dryMultiplier','longitud','acciones','multiplicadorLongitud'],
  },
]);

export function buscarModeloIA(id){return CATALOGO_MODELOS_IA.find(m=>m.id===id)||CATALOGO_MODELOS_IA[0];}
