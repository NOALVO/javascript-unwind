const assert = require('assert');
const unwind = require('..');

describe('#unwind()', function() {
  const mock = [
    { a: [{ x: 1 }, { x: 2 }], b: 123 },
    { a: [{ x: 3 }, { x: 4 }], b: 785, c: 368 },
  ];

  it('unwind([{a:[{x:1},{x:2}],b:123},{a:[{x:3},{x:4}],b:785,c:368}], \'a\') should return [{a:{x:1},b:123},{a:{x:2},b:123},{a:{x:3},b:785,c:368},{a:{x:4},b:785,c:368}]', function() {
    const actual = unwind(mock, 'a');
    const expected = [ { a: { x: 1 }, b: 123 },
     { a: { x: 2 }, b: 123 },
     { a: { x: 3 }, b: 785, c: 368 },
     { a: { x: 4 }, b: 785, c: 368 } ];

    assert.deepEqual(actual, expected);
  });
});
