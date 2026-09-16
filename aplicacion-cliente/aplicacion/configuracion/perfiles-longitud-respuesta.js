export const PERFILES_LONGITUD_RESPUESTA = Object.freeze({
  larga: {
    id: 'larga',
    nombre: 'Larga',
    minimoCaracteres: 900,
    objetivoCaracteres: 1500,
    maximoCaracteres: 2400,
    minimoParrafos: 3,
  },
  muyLarga: {
    id: 'muyLarga',
    nombre: 'Muy larga',
    minimoCaracteres: 1500,
    objetivoCaracteres: 2600,
    maximoCaracteres: 4200,
    minimoParrafos: 5,
  },
  escenaExtensa: {
    id: 'escenaExtensa',
    nombre: 'Escena extensa',
    minimoCaracteres: 2400,
    objetivoCaracteres: 4200,
    maximoCaracteres: 7000,
    minimoParrafos: 7,
  },
});

export const PERFIL_LONGITUD_PREDETERMINADO = 'muyLarga';
