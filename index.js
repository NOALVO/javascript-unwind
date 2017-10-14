module.exports = unwind;

function unwind(array, prop) {
  return array
    .reduce((acc, curr) => [...acc, ...curr[prop]
      .map(x => Object
        .assign({}, curr, { [prop]: x }),
      )], 
    []);
}
