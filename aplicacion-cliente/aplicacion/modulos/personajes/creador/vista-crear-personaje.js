import { crearElementoHtml as e } from '../../../interfaz/crear-elemento-html.js';
import { actualizarEstadoGlobal } from '../../../estado-y-persistencia-aplicacion/estado-global-aplicacion.js';
import { CATALOGO_MODELOS_IA } from '../../../configuracion/catalogo-modelos-inteligencia-artificial.js';
import { PERFILES_INSPIRACION_HIWAIFU } from '../../../configuracion/catalogo-perfiles-inspiracion-hiwaifu.js';
import { construirPersonajeDesdeFormulario } from './construir-personaje-desde-formulario.js';
import { generarCampoPersonajeDemostracion } from '../editor/generar-campo-personaje-demostracion.js';

function campo(etiqueta,control,ayuda=''){return e('label',{clase:'campo-formulario'},[e('span',{texto:etiqueta}),ayuda?e('small',{texto:ayuda}):null,control]);}
function selectorModelos(){return e('select',{name:'modeloPreferidoId'},CATALOGO_MODELOS_IA.map(m=>e('option',{value:m.id,texto:m.nombreVisible})));}
function selectorPerfiles(){return e('select',{name:'perfilInspiracionId'},PERFILES_INSPIRACION_HIWAIFU.map(p=>e('option',{value:p.id,texto:p.nombre})));}
export function renderizarVistaCrearPersonaje(){
  const nombre=e('input',{name:'nombre',required:'required',maxlength:'40',placeholder:'Ej. Luma'});
  const genero=e('select',{name:'genero'},[e('option',{value:'femenino',texto:'Femenino'}),e('option',{value:'masculino',texto:'Masculino'}),e('option',{value:'no-binario',texto:'No binario'}),e('option',{value:'no-especificado',texto:'No especificado'})]);
  const subtitulo=e('input',{name:'subtitulo',maxlength:'120',placeholder:'Una frase corta que lo describa'});
  const avatar=e('input',{name:'avatarImagen',type:'url',placeholder:'https://... (opcional)'});
  const rasgos=e('input',{name:'rasgos',placeholder:'bromista, curiosa, tranquila'});
  const descripcion=e('textarea',{name:'descripcion',rows:'5',placeholder:'Quién es, cómo se comporta y qué sensación debería transmitir.'});
  const saludo=e('textarea',{name:'saludoInicial',rows:'6',placeholder:'*te mira de reojo* Holii...'});
  const formulario=e('form',{clase:'formulario-personaje'},[
    campo('Nombre *',nombre),campo('Género',genero),campo('Edad',e('input',{name:'edad',type:'number',min:'1',value:'22'})),
    campo('Subtítulo / descripción corta',subtitulo),campo('Avatar por URL',avatar,'Opcional. Luego podremos añadir carga real de archivos.'),
    campo('Categoría',e('input',{name:'categoria',placeholder:'Compañía, historia, fantasy...'})),campo('Etiquetas',e('input',{name:'etiquetas',placeholder:'romance, humor, aventura'}),'Separadas por coma.'),
    campo('Voz',e('select',{name:'vozPreferida'},[e('option',{value:'dispositivo',texto:'Voz del dispositivo'}),e('option',{value:'sin-voz',texto:'Sin voz'}),e('option',{value:'servidor',texto:'Voz del servidor · futuro'})])),
    campo('Rasgos separados por coma',rasgos),
    campo('Saludo inicial',saludo),e('button',{clase:'boton-secundario',type:'button',texto:'✨ Generar saludo de prueba',alclic:()=>{saludo.value=generarCampoPersonajeDemostracion('saludo',{nombre:nombre.value,genero:genero.value,rasgos:rasgos.value});}}),
    campo('Descripción',descripcion),e('button',{clase:'boton-secundario',type:'button',texto:'✨ Generar descripción de prueba',alclic:()=>{descripcion.value=generarCampoPersonajeDemostracion('descripcion',{nombre:nombre.value,genero:genero.value,rasgos:rasgos.value});}}),
    campo('Indicación adicional',e('textarea',{name:'indicacionAdicional',rows:'4',placeholder:'Información útil adicional para interpretar este personaje.'})),
    campo('Recuerdos base · una línea por recuerdo',e('textarea',{name:'recuerdosBase',rows:'7',placeholder:'Le gusta...\nNo soporta...\nRecuerda que...'})),
    campo('Creatividad del personaje',e('input',{name:'nivelCreatividadPersonaje',type:'range',min:'1',max:'5',step:'1',value:'4'})),
    campo('Motor / modelo preferido',selectorModelos()),campo('Perfil de generación inspirado',selectorPerfiles(),'Son perfiles nuestros; no son los modelos internos de HiWaifu.'),
    e('button',{clase:'boton-principal ancho-completo',type:'submit',texto:'Crear personaje local'})
  ]);
  formulario.addEventListener('submit',evento=>{evento.preventDefault();const personaje=construirPersonajeDesdeFormulario(new FormData(formulario));actualizarEstadoGlobal(estado=>{estado.personajesCreados.push(personaje);estado.personajeActivoId=personaje.id;estado.seccionActual='conversacion';});});
  return e('section',{clase:'pagina-desplazable pagina-angosta'},[e('div',{clase:'encabezado-pagina'},[e('div',{},[e('h1',{texto:'Crear personaje'}),e('p',{texto:'Crea personajes secundarios sin tocar el futuro perfil premium de Mack.'})])]),formulario]);
}
