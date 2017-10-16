module.exports = unwind;

function unwind(array, path) {
  if (!array.length) {
    array = [ array ];
  }
  if (path.indexOf('.') !== -1) {
    return unwindDeep(array, path);
  }
  return unwindShallow(array, path);
}

function unwindShallow(array, prop) {
  return array
    .reduce((acc, curr) => [...acc, ...curr[prop]
      .map(x => Object
        .assign({}, curr, { [prop]: x }),
      )], 
    []);
}

function unwindDeep(array, path) {
  const shifted = path.split('.');
  const prop = shifted.shift();
  const nextLevel = shifted.join('.');
  const result = array
    .reduce((acc, curr) => [...acc, ...curr[prop]
      .map(x => Object
        .assign({}, curr, { [prop]: unwind(x, nextLevel) }),
      )], 
    []);
  return unwind(result, prop);
}
