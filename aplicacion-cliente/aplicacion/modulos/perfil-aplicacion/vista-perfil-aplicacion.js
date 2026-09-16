import { crearElementoHtml as e } from '../../interfaz/crear-elemento-html.js';
import { estadoGlobalAplicacion } from '../../estado-y-persistencia-aplicacion/estado-global-aplicacion.js';
import { irASeccion } from '../../navegacion-aplicacion/navegacion-entre-secciones.js';
function fila(icono,titulo,sub,accion){return e('button',{clase:'fila-perfil-opcion',type:'button',alclic:accion},[e('span',{clase:'icono-opcion-perfil',texto:icono}),e('div',{},[e('strong',{texto:titulo}),e('small',{texto:sub||''})]),e('span',{texto:'›'})]);}
export function renderizarVistaPerfilAplicacion(){const p=estadoGlobalAplicacion.personaUsuario;return e('section',{clase:'pagina-desplazable pagina-app-movil'},[
 e('div',{clase:'cabecera-perfil-usuario'},[p.avatarImagen?e('img',{src:p.avatarImagen,clase:'avatar-perfil-usuario',alt:''}):e('div',{clase:'avatar-perfil-usuario avatar-texto-grande',texto:(p.nombre||'T')[0]}),e('div',{},[e('h1',{texto:p.nombre||'Tú'}),e('p',{texto:p.descripcion||'Tu persona se usa como contexto del chat, separada de cada personaje.'})])]),
 e('div',{clase:'grupo-opciones-perfil'},[fila('👤','Persona del usuario',p.apodo||p.pronombres||'Editar cómo te conocen los personajes',()=>irASeccion('editarPersonaUsuario','perfil')),fila('⚙','Ajustes de la aplicación','Servidor, proveedor de IA, memoria y apariencia general',()=>irASeccion('ajustes')),fila('🔔','Mensajes del sistema','Cambios, avisos y estado de funciones',()=>irASeccion('notificaciones'))]),
 e('div',{clase:'tarjeta-informativa'},[e('strong',{texto:'ZHY Companion v0.5'}),e('p',{texto:'La app prioriza chat y personajes. Modelos, memoria y parámetros técnicos aparecen dentro de cada conversación cuando hacen falta.'})])
 ]);}
