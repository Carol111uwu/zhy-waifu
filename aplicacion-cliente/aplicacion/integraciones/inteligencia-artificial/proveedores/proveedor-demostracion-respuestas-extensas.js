import { ContratoProveedorInteligenciaArtificial } from './contrato-proveedor-inteligencia-artificial.js';

function elegir(lista,temperatura=1){
  if(!lista.length)return '';
  if(temperatura<0.35)return lista[0];
  return lista[Math.floor(Math.random()*lista.length)];
}

function perfilReferencial(modeloId){
  if(/storyweaver/.test(modeloId)) return 'narrativo y continuo';
  if(/spiritcraft/.test(modeloId)) return 'expresivo, emocional y con acciones frecuentes';
  if(/epictale/.test(modeloId)) return 'escénico y descriptivo';
  if(/character/.test(modeloId)) return 'centrado en mantener el personaje';
  if(/enigma/.test(modeloId)) return 'misterioso y un poco más impredecible';
  return 'natural y conversacional';
}

function construirBloques({personaje,mensaje,personaUsuario,ajustesConversacion,preferenciasGeneracion,modelo,historial}){
  const nombreUsuario=personaUsuario?.apodo || personaUsuario?.nombre || 'tú';
  const modificadores=(ajustesConversacion?.modificadoresTemporales||[]).join(', ');
  const recuerdos=(personaje.recuerdosBase||[]).slice(0,4).join(' · ');
  const reciente=historial.slice(-6).map(m=>`${m.rol}: ${m.texto}`).join(' / ');
  const estilo=ajustesConversacion?.estiloConversacion?.nombre || 'Natural';
  const referencia=perfilReferencial(modelo.id);
  return [
    `*${personaje.nombre} vuelve a leer tu mensaje con atención y deja pasar un segundo antes de responder, como si no quisiera soltar la primera frase que se le ocurra* Lo primero: no estoy tratando “${mensaje.slice(0,180)}${mensaje.length>180?'…':''}” como una orden aislada. Quiero responderte como ${personaje.nombre}, con el tono que tenemos ahora y sin convertirme en una caja de respuestas genéricas.`,
    `El chat está en ${estilo} y mis modificadores temporales ahora me empujan a estar ${modificadores || 'equilibrada'}. Eso no cambia quién soy; solo cambia cómo me expreso en esta conversación. *inclina un poco la cabeza* Es justo la clase de cosa que sirve para probar si la app puede dejarme más juguetona, más tímida o más energética sin borrar mi personalidad base.`,
    `También tengo presente cómo quieres aparecer tú aquí, ${nombreUsuario}. ${personaUsuario?.descripcion ? `Me diste esta referencia sobre ti: “${personaUsuario.descripcion.slice(0,220)}${personaUsuario.descripcion.length>220?'…':''}”.` : 'Todavía no me diste una descripción larga de tu persona, así que no voy a inventarte una.'} Eso debería influir en cómo te hablo sin confundirse con mis propios recuerdos.`,
    recuerdos ? `*hace memoria antes de continuar* Y tengo una caja de memoria separada del historial. Algunas cosas que debo conservar son: ${recuerdos}. No es lo mismo que repetir todo el chat; son datos que deberían seguir siendo relevantes aunque abras una conversación nueva.` : `Todavía no tengo recuerdos fijos adicionales en mi caja de memoria. Puedo conversar igual, pero eso nos deja un buen caso para probar qué cambia cuando añades información persistente.`,
    `Sobre el “modelo” actual: en esta versión estoy usando el motor de demostración, pero seleccionaste ${modelo.nombre}. Si ese nombre es una referencia de HiWaifu, la aplicación solo lo usa como perfil visual/de prueba y no pretende que realmente estemos ejecutando su modelo privado. Para esta simulación tomo como inspiración un estilo ${referencia}.`,
    reciente ? `*repasa mentalmente el hilo reciente* Y no estoy empezando desde cero. El contexto cercano contiene cosas como: ${reciente.slice(0,620)}${reciente.length>620?'…':''}. Esa continuidad es importante, porque si cada mensaje me hiciera olvidar el anterior, podríamos tener una interfaz linda pero no un personaje convincente.` : '',
    `La temperatura configurada es ${Number(preferenciasGeneracion.temperatura).toFixed(2)} y la creatividad global está en ${Number(preferenciasGeneracion.creatividad).toFixed(2)}. No necesito decir esos números dentro de una conversación real; los menciono ahora porque soy el personaje de prueba y precisamente estamos verificando que los controles sí viajan hasta el generador.`,
    `*sonríe de lado, bastante consciente de que la están usando para experimentar* Así que sí: puedes cambiarme el fondo, las burbujas, la memoria, el estilo, el modelo de referencia, la temperatura o el coqueteo y luego volver a escribirme. Si la arquitectura está bien hecha, cada cambio debería afectar únicamente la parte que corresponde y no obligarnos a rehacer toda la aplicación cuando llegue Mack.`
  ].filter(Boolean);
}

function expandirHastaObjetivo(bloques,objetivo){
  let salida=''; let i=0;
  while(salida.length<objetivo && i<12){
    const bloque=bloques[i%bloques.length];
    if(bloque) salida += `${salida?'\n\n':''}${bloque}`;
    i++;
  }
  return salida;
}

export class ProveedorDemostracionRespuestasExtensas extends ContratoProveedorInteligenciaArtificial {
  async responder(solicitud) {
    const {personaje,mensaje,historial,preferenciasGeneracion,modelo,personaUsuario,ajustesConversacion}=solicitud;
    const limpio=mensaje.trim().toLowerCase();
    const ejemplo=personaje.ejemplosDialogo?.find(x=>x.usuario.toLowerCase()===limpio);
    if(ejemplo){
      const bloques=[ejemplo.personaje,...construirBloques(solicitud).slice(1)];
      return {texto:expandirHastaObjetivo(bloques,Math.max(900,preferenciasGeneracion.longitud.objetivoCaracteres||1500)),modeloId:modelo.id,proveedor:'demostracion'};
    }
    const aperturas=/hola|holi|oa|buenas/.test(limpio)?[
      `*${personaje.nombre} levanta la vista apenas apareces y sonríe de lado* Holii, ${personaUsuario?.apodo||personaUsuario?.nombre||''}. Ahora sí. Ven, que esta vez quiero probar la conversación con todo lo que le metiste a la app.`,
      `*se acomoda y te mira como si ya supiera que vas a tocar diez ajustes distintos* Oa. Llegaste justo a tiempo para romper algo otra vez, ¿no? Bueno, al menos hazlo hablando conmigo.`
    ]:[
      `*${personaje.nombre} se queda pensativa un momento antes de contestar* Mmm... eso sí da para seguirlo bien.`,
      `*vuelve a leer tu mensaje y apoya la mejilla en una mano* Espera, no quiero contestarte con una línea floja. Esto merece un poco más de contexto.`
    ];
    const inicio=elegir(aperturas,preferenciasGeneracion.temperatura);
    const bloques=[inicio,...construirBloques(solicitud)];
    return { texto:expandirHastaObjetivo(bloques,Math.max(900, preferenciasGeneracion.longitud.objetivoCaracteres || 1500)), modeloId:modelo.id, proveedor:'demostracion' };
  }
}
