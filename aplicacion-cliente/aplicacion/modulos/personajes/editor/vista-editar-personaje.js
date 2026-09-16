import { crearElementoHtml as e } from '../../../interfaz/crear-elemento-html.js';
import { estadoGlobalAplicacion, actualizarEstadoGlobal } from '../../../estado-y-persistencia-aplicacion/estado-global-aplicacion.js';
import { irASeccion } from '../../../navegacion-aplicacion/navegacion-entre-secciones.js';
import { obtenerPersonajePorId } from '../registro-personajes-disponibles.js';
import { CATALOGO_MODELOS_IA } from '../../../configuracion/catalogo-modelos-inteligencia-artificial.js';
import { PERFILES_INSPIRACION_HIWAIFU } from '../../../configuracion/catalogo-perfiles-inspiracion-hiwaifu.js';
import { construirCambiosPersonaje } from './actualizar-personaje-desde-formulario.js';
import { generarCampoPersonajeDemostracion } from './generar-campo-personaje-demostracion.js';

function campo(etiqueta,control,ayuda=''){return e('label',{clase:'campo-formulario'},[e('span',{texto:etiqueta}),ayuda?e('small',{texto:ayuda}):null,control]);}
export function renderizarVistaEditarPersonaje(){
  const personaje=obtenerPersonajePorId(estadoGlobalAplicacion.personajeActivoId);
  const nombre=e('input',{name:'nombre',required:'required',maxlength:'50',value:personaje.nombre});
  const genero=e('select',{name:'genero'},[e('option',{value:'femenino',texto:'Femenino'}),e('option',{value:'masculino',texto:'Masculino'}),e('option',{value:'no-binario',texto:'No binario'}),e('option',{value:'no-especificado',texto:'No especificado'})]);genero.value=personaje.genero||'no-especificado';
  const edad=e('input',{name:'edad',type:'number',min:'1',value:personaje.edad||22});
  const subtitulo=e('input',{name:'subtitulo',maxlength:'120',value:personaje.subtitulo||'',placeholder:'Descripción breve del personaje'});
  const descripcion=e('textarea',{name:'descripcion',rows:'5'});descripcion.value=personaje.descripcion||'';
  const saludo=e('textarea',{name:'saludoInicial',rows:'7',maxlength:'4000'});saludo.value=personaje.saludoInicial||'';
  const rasgos=e('input',{name:'rasgos',value:(personaje.rasgos||[]).join(', ')});
  const avatar=e('input',{name:'avatarImagen',type:'url',value:personaje.avatarImagen||'',placeholder:'https://... (opcional)'});
  const categoria=e('input',{name:'categoria',value:personaje.categoria||'General'});
  const etiquetas=e('input',{name:'etiquetas',value:(personaje.etiquetas||[]).join(', ')});
  const indicacion=e('textarea',{name:'indicacionAdicional',rows:'4'});indicacion.value=personaje.indicacionAdicional||'';
  const voz=e('select',{name:'vozPreferida'},[e('option',{value:'dispositivo',texto:'Voz del dispositivo'}),e('option',{value:'sin-voz',texto:'Sin voz'}),e('option',{value:'servidor',texto:'Voz del servidor · futuro'})]);voz.value=personaje.vozPreferida||'dispositivo';
  const creatividad=e('input',{name:'nivelCreatividadPersonaje',type:'range',min:'1',max:'5',step:'1',value:personaje.nivelCreatividadPersonaje||4});
  const valorCreatividad=e('strong',{texto:`${personaje.nivelCreatividadPersonaje||4}/5`});creatividad.addEventListener('input',()=>valorCreatividad.textContent=`${creatividad.value}/5`);
  const modelo=e('select',{name:'modeloPreferidoId'},CATALOGO_MODELOS_IA.map(m=>e('option',{value:m.id,texto:m.nombreVisible})));modelo.value=personaje.modeloPreferidoId||'servidor-inteligencia-con-respaldo';
  const perfil=e('select',{name:'perfilInspiracionId'},PERFILES_INSPIRACION_HIWAIFU.map(p=>e('option',{value:p.id,texto:p.nombre})));perfil.value=personaje.perfilInspiracionId||'narrativa-equilibrada';
  const formulario=e('form',{clase:'formulario-personaje'},[
    campo('Nombre *',nombre),campo('Género',genero),campo('Edad',edad),campo('Subtítulo / descripción corta',subtitulo),campo('Avatar por URL',avatar),
    campo('Categoría',categoria),campo('Etiquetas',etiquetas,'Separadas por coma.'),campo('Voz',voz),
    campo('Saludo *',saludo,'Puede mezclar *acciones* y diálogo normal.'),e('button',{clase:'boton-secundario',type:'button',texto:'✨ Generar saludo de prueba',alclic:()=>{saludo.value=generarCampoPersonajeDemostracion('saludo',{nombre:nombre.value,genero:genero.value,rasgos:rasgos.value});}}),
    campo('Descripción completa',descripcion),e('button',{clase:'boton-secundario',type:'button',texto:'✨ Generar descripción de prueba',alclic:()=>{descripcion.value=generarCampoPersonajeDemostracion('descripcion',{nombre:nombre.value,genero:genero.value,rasgos:rasgos.value});}}),
    campo('Rasgos separados por coma',rasgos),campo('Indicación adicional',indicacion),
    e('label',{clase:'campo-formulario'},[e('span',{texto:'Creatividad del personaje'}),e('div',{clase:'titulo-rango'},[e('span',{texto:'Más estable ↔ más creativo'}),valorCreatividad]),creatividad]),
    campo('Motor / modelo preferido',modelo),campo('Perfil de generación inspirado',perfil,'StoryWeaver/EpicTale/SpiritCraft aparecen aquí como perfiles propios inspirados, no como modelos extraídos.'),
    e('button',{clase:'boton-principal ancho-completo',type:'submit',texto:'Guardar cambios del personaje'})
  ]);
  formulario.addEventListener('submit',ev=>{ev.preventDefault();const cambios=construirCambiosPersonaje(new FormData(formulario));actualizarEstadoGlobal(s=>{s.personajesEditados[personaje.id]=cambios;s.seccionActual='configuracionConversacion';s.parametroVista=null;});});
  return e('section',{clase:'pagina-desplazable pagina-angosta'},[e('div',{clase:'encabezado-pagina'},[e('button',{clase:'boton-icono',type:'button',texto:'←',alclic:()=>irASeccion('configuracionConversacion')}),e('div',{clase:'titulo-flexible'},[e('h1',{texto:'Editar personaje'}),e('p',{texto:'Cada bloque pertenece al personaje actual y no modifica otros perfiles.'})])]),formulario]);
}
