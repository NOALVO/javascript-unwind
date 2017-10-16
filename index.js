module.exports = unwind;

function unwind(array, path) {
  if (!array.length) {
    array = [ array ];
  }
  if (path.indexOf('.') !== -1) {
    return unwindDeep(array, path);
  }
  return unwindSingle(array, path);
}

function unwindSingle(array, prop) {
  return array
    .reduce((acc, curr) => [...acc, ...curr[prop]
      .map(x => Object
        .assign({}, curr, { [prop]: x }),
      )], 
    []);
}

function unwindDeep(array, path) {
  let shifted = path.split('.');
  let prop = shifted.shift();
  nextLevel = shifted.join('.');
  const result = array
    .reduce((acc, curr) => [...acc, ...curr[prop]
      .map(x => Object
        .assign({}, curr, { [prop]: unwind(x, nextLevel) }),
      )], 
    []);
  return unwind(result, prop);
}


// let collection = [ { nome: 'Espaço 1', precificacoes: [ { nome: 'Precificação 1', formatos: [ { nome: 'Formato 1' }, { nome: 'Formato 2' } ] }, { nome: 'Precificação 2', formatos: [ { nome: 'Formato 3' }, { nome: 'Formato 4' } ] }, ], }, { nome: 'Espaço 2', precificacoes: [ { nome: 'Precificação 3', formatos: [ { nome: 'Formato 4' }, { nome: 'Formato 5' } ], }, { nome: 'Precificação 4', formatos: [ { nome: 'Formato 6' }, { nome: 'Formato 7' } ], }, ], }, ];
