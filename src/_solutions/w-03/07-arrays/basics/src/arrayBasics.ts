/* eslint-disable no-sparse-arrays */

// initialize array with 4 numbers so if summing together they equal to 42
export const answer = [10, 10, 20, 2];

// initialize duplicate of answer using new Array instance
export const answerAsArrayInstance = new Array(...answer);

// initialize duplicate of answer using Array.from method
export const answerFromArray = Array.from(answer);

// initialize empty answer using Array instance. Should have length of 5
export const emptyAnswerWithLengthFiveFromArray = new Array(5);

// initialize answerFromArrayOf using Array.of() with first element from `answer`
export const answerFromArrayOf = Array.of(answer[0]);

// initialize array with 4 numbers from `answer` using arbitrary expressions
// (answer[index] * 2) so if summing together they equal to 84
// using any methods like map/reduce is forbidden in this exercise
export const answerDoubled = [
  answer[0] * 2,
  answer[1] * 2,
  answer[2] * 2,
  answer[3] * 2,
];

// initialize array with 6 string values so if joined together they equal to "hello"
export const greeting = ['h', 'e', 'l', 'l', 'o', ''];

// initialize array using a and b variables (use spread operator), so
// if reduced together with plus operator will equal to `42_hello`
export const joined = [...answer, '_', ...greeting];

// initialize sparsed array using only 2 numbers in order sum of first and last element and
// array length should equal 20: (a[0] + a[a.length - 1]) + a.length) === 20
export const sparsedArray = [6,,,,,,,,,4];

// initialize sparsed array which length should be 2
export const emptySparsedWithLength = [,,];

// initialize numbers from zero to nine using spread operator
export const numbers = [...'0123456789'];

// initialize array of unique letters from greeting variable
export const uniqueLettersFromGreeting = [...new Set(greeting)];

// make a copy of greeting array, modify the first element of an array
// to be Uppercase
export const greetingCopiedAndModified = [...greeting];
greetingCopiedAndModified[0] = greetingCopiedAndModified[0].toUpperCase();

// make a copy of greeting array, delete the last element
export const greetingWithDeletedLastElement = [...greeting];
delete greetingWithDeletedLastElement[greetingWithDeletedLastElement.length - 1];

// make a copy of greeting array, change the length of array to 5
export const greetingWithChangedLength = [...greeting];
greetingWithChangedLength.length = greetingWithDeletedLastElement.length - 1;

// make a copy of greeting, use Array.push() method and add 3 exclamation marks
export const greetingWithNewElements = [...greeting];
greetingWithNewElements.push(...'!!!');
