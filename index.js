module.exports = unwind;

function unwind(array, prop) {
  return array
    .reduce((acc, curr) => [...acc, ...curr[prop]
      .map(x => ({curr, ...{ [prop]: x }})
      )], 
    []);
}
