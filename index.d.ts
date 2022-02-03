/**
 * Unwinds an object array by a property, like MongoDB's $unwind function.
 * @export
 * @param {any[]} array Object array to be unwinded.
 * @param {string} path Object property or path using dot notation.
 * @return {any[]} Unwinded object array.
 */
export default function unwind(array: any[], path: string): any[];
