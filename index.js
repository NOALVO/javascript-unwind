'use strict';

;(function () {
  function unwind(array, path) {
    if (!array.length) {
      array = [array];
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


  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal || freeSelf || Function('return this')();
  
  /** Detect free variable `exports`. */
  var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  // Some AMD build optimizers, like r.js, check for condition patterns like:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // loaded by a script tag in the presence of an AMD loader.
    // See http://requirejs.org/docs/errors.html#mismatch for more details.
    root.unwind = unwind;

    // Define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module.
    define(function() {
      return unwind;
    });
  }
  // Check for `exports` after `define` in case a build optimizer adds it.
  else if (freeModule) {
    // Export for Node.js.
    (freeModule.exports = unwind).unwind = unwind;
    // Export for CommonJS support.
    freeExports.unwind = unwind;
  }
  else {
    // Export to the global object.
    root.unwind = unwind;
  }

  return unwind;

}.call(this));
