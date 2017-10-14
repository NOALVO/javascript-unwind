# javascript-unwind
A very simple native function for unwinding a collection by a property, like MongoDB's [`$unwind`](https://docs.mongodb.com/manual/reference/operator/aggregation/unwind/) function.

## Features 
* **This function is immutable.** Your original collection doesn't change.
* **It works for both primitives and complex values**.

## Installation

```
$ npm i javascript-unwind --save
```

## How to use

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
[
  { a: [{ x: 1 }, { x: 2 }], b: 123 },
  { a: [{ x: 3 }, { x: 4 }], b: 785, c: 368 },
]
```
