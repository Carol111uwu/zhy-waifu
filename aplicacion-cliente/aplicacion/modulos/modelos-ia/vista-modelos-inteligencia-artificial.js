import { crearElementoHtml as e } from '../../interfaz/crear-elemento-html.js';
import { CATALOGO_MODELOS_IA, CATEGORIAS_MODELOS_IA } from '../../configuracion/catalogo-modelos-inteligencia-artificial.js';
import { PERFILES_INSPIRACION_HIWAIFU } from '../../configuracion/catalogo-perfiles-inspiracion-hiwaifu.js';
import { estadoGlobalAplicacion, actualizarEstadoGlobal } from '../../estado-y-persistencia-aplicacion/estado-global-aplicacion.js';
import { irASeccion } from '../../navegacion-aplicacion/navegacion-entre-secciones.js';

function textoCategoria(c){if(c===CATEGORIAS_MODELOS_IA.RECOMENDADO)return'Recomendado';if(c===CATEGORIAS_MODELOS_IA.SERVIDOR)return'Vía servidor';if(c===CATEGORIAS_MODELOS_IA.LOCAL)return'Local / PC';return'Offline';}
export function renderizarVistaModelosIA(){
  const tarjetas=CATALOGO_MODELOS_IA.map(modelo=>{
    const seleccionada=estadoGlobalAplicacion.preferencias.modeloSeleccionadoId===modelo.id;
    return e('article',{clase:`tarjeta-modelo ${seleccionada?'seleccionada':''}`},[
      e('button',{clase:'boton-seleccionar-modelo',type:'button',alclic:()=>actualizarEstadoGlobal(s=>{s.preferencias.modeloSeleccionadoId=modelo.id;})},[
        e('div',{clase:'cabecera-tarjeta-modelo'},[e('strong',{texto:modelo.nombreVisible}),e('span',{clase:`etiqueta-modelo categoria-${modelo.categoria}`,texto:textoCategoria(modelo.categoria)})]),e('p',{texto:modelo.descripcion}),e('small',{texto:`Origen: ${modelo.origen}`})
      ]),
      e('div',{clase:'acciones-tarjeta-modelo'},[e('span',{texto:seleccionada?'✓ Seleccionado':'Tocar arriba para seleccionar'}),e('button',{clase:'boton-ajustar-modelo',type:'button',texto:'Ajustes avanzados',alclic:()=>irASeccion('configuracionModeloIA',modelo.id)})])
    ]);
  });
  const perfiles=PERFILES_INSPIRACION_HIWAIFU.map(perfil=>e('article',{clase:'tarjeta-perfil-inspirado'},[e('strong',{texto:perfil.nombre}),e('p',{texto:perfil.descripcion}),e('small',{texto:`Temperatura ${perfil.temperatura} · DRY ${perfil.dryMultiplier} · longitud ${perfil.multiplicadorLongitud}x`})]));
  return e('section',{clase:'pagina-desplazable'},[
    e('div',{clase:'encabezado-pagina'},[e('div',{},[e('h1',{texto:'Modelos de IA'}),e('p',{texto:'Elige cómo generar respuestas. La opción automática es la más resistente a caídas.'})])]),
    e('div',{clase:'aviso-modelos'},[e('strong',{texto:'Recomendación'}),e('p',{texto:'Usa “Automático · servidor + respaldo offline”. El servidor maneja los modelos reales y las API keys; si falla, la interfaz no se rompe.'})]),
    e('div',{clase:'cuadricula-modelos'},tarjetas),
    e('h2',{texto:'Perfiles inspirados en HiWaifu'}),e('p',{clase:'explicacion-ajuste',texto:'StoryWeaver, SpiritCraft, EpicTale y otros nombres se usan solo como inspiración de parámetros/experiencia. No fingimos haber extraído sus modelos privados.'}),
    e('div',{clase:'cuadricula-modelos'},perfiles)
  ]);
}
