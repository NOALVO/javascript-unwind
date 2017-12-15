'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
    return array.reduce(function (acc, curr) {
      return [].concat(_toConsumableArray(acc), _toConsumableArray(curr[prop].map(function (x) {
        return Object.assign({}, curr, _defineProperty({}, prop, x));
      })));
    }, []);
  }

  function unwindDeep(array, path) {
    var shifted = path.split('.');
    var prop = shifted.shift();
    var nextLevel = shifted.join('.');
    var result = array.reduce(function (acc, curr) {
      return [].concat(_toConsumableArray(acc), _toConsumableArray(curr[prop].map(function (x) {
        return Object.assign({}, curr, _defineProperty({}, prop, unwind(x, nextLevel)));
      })));
    }, []);
    return unwind(result, prop);
  }

  var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

  /** Detect free variable `self`. */
  var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal || freeSelf || Function('return this')();

  /** Detect free variable `exports`. */
  var freeExports = (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && (typeof module === 'undefined' ? 'undefined' : _typeof(module)) == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  // Some AMD build optimizers, like r.js, check for condition patterns like:
  if (typeof define == 'function' && _typeof(define.amd) == 'object' && define.amd) {
    // loaded by a script tag in the presence of an AMD loader.
    // See http://requirejs.org/docs/errors.html#mismatch for more details.
    root.unwind = unwind;

    // Define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module.
    define(function () {
      return unwind;
    });
  }
  // Check for `exports` after `define` in case a build optimizer adds it.
  else if (freeModule) {
      // Export for Node.js.
      (freeModule.exports = unwind).unwind = unwind;
      // Export for CommonJS support.
      freeExports.unwind = unwind;
    } else {
      // Export to the global object.
      root.unwind = unwind;
    }

  return unwind;
}).call(undefined);
//# sourceMappingURL=index.js.map