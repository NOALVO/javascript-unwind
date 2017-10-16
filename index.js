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
      .map(x => ({curr, ...{ [prop]: x }})
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
