# javascript-unwind

![Current npm version](https://img.shields.io/npm/v/javascript-unwind.svg) 
![Current npm download count](https://img.shields.io/npm/dt/javascript-unwind.svg)
[![CircleCI](https://img.shields.io/circleci/project/github/NOALVO/javascript-unwind.svg)](https://circleci.com/gh/NOALVO/javascript-unwind)
![Compatible with ES5 and greater](https://img.shields.io/badge/ES5-compatible-orange.svg)

A very simple native function for unwinding a collection by a property, like MongoDB's [`$unwind`](https://docs.mongodb.com/manual/reference/operator/aggregation/unwind/) function.

## Features
* **This function is immutable.** Your original collection doesn't change.
* **It works for both primitives and complex values**.
* **It works for nested arrays, using dot-notation.** Like `a.b.c`.
* **It works in ES5-compatible environments**, without transpiling.
* **Typings available** for TypeScript.

## Installation

```
$ npm i javascript-unwind --save
```

## How to use

### Shallow level

```javascript
  const unwind = require('javascript-unwind');

  const collection = [
    { a: [{ x: 1 }, { x: 2 }], b: 123 },
    { a: [{ x: 3 }, { x: 4 }], b: 785, c: 368 },
  ];

  console.log(unwind(collection, 'a'));
```

Output:

```javascript
[ { a: { x: 1 }, b: 123 },
 { a: { x: 2 }, b: 123 },
 { a: { x: 3 }, b: 785, c: 368 },
 { a: { x: 4 }, b: 785, c: 368 } ]
```

### Deep level

```javascript
  const unwind = require('javascript-unwind');

  const collection = [{ 
      name: 'a1', 
      b: [{ 
          name: 'b1', 
          c: [ { name: 'c1' }, { name: 'c2' } ] 
        }, { 
          name: 'b2', 
          c: [ { name: 'c3' }, { name: 'c4' } ] 
        }, 
      ], 
    }, { 
      name: 'a2', 
      b: [{ 
          name: 'b3', 
          c: [ { name: 'c4' }, { name: 'c5' } ]
        }, { 
          name: 'b4',
          c: [ { name: 'c6' }, { name: 'c7' } ] 
        }
      ]
    }
  ];

  console.log(unwind(collection, 'b.c'));
```
Output:

```javascript
[
  {
    "name":"a1",
    "b":{
      "name":"b1",
      "c":{
        "name":"c1"
      }
    }
  },
  {
    "name":"a1",
    "b":{
      "name":"b1",
      "c":{
        "name":"c2"
      }
    }
  },
  {
    "name":"a1",
    "b":{
      "name":"b2",
      "c":{
        "name":"c3"
      }
    }
  },
  {
    "name":"a1",
    "b":{
      "name":"b2",
      "c":{
        "name":"c4"
      }
    }
  },
  {
    "name":"a2",
    "b":{
      "name":"b3",
      "c":{
        "name":"c4"
      }
    }
  },
  {
    "name":"a2",
    "b":{
      "name":"b3",
      "c":{
        "name":"c5"
      }
    }
  },
  {
    "name":"a2",
    "b":{
      "name":"b4",
      "c":{
        "name":"c6"
      }
    }
  },
  {
    "name":"a2",
    "b":{
      "name":"b4",
      "c":{
        "name":"c7"
      }
    }
  }
]
```

## Roadmap and Bugs

See [Issues](https://github.com/NOALVO/javascript-unwind/issues).
