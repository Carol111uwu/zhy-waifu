const PREFIJO='zhy-companion:';
export const almacenamientoLocalAplicacion={
  leer(clave,valorPredeterminado=null){
    try{const bruto=localStorage.getItem(PREFIJO+clave);return bruto==null?valorPredeterminado:JSON.parse(bruto);}catch{return valorPredeterminado;}
  },
  guardar(clave,valor){
    try{localStorage.setItem(PREFIJO+clave,JSON.stringify(valor));return true;}
    catch(error){console.warn('No se pudo persistir el estado local de ZHY Companion:',error);return false;}
  },
  eliminar(clave){try{localStorage.removeItem(PREFIJO+clave);}catch{}},
};
