import {
  answer,
  greeting,
  joined,
  answerAsArrayInstance,
  answerFromArray,
  emptyAnswerWithLengthFiveFromArray,
  answerDoubled,
  sparsedArray,
  emptySparsedWithLength,
  numbers,
  uniqueLettersFromGreeting,
  answerFromArrayOf,
  greetingCopiedAndModified,
  greetingWithDeletedLastElement,
  greetingWithChangedLength,
  greetingWithNewElements,
} from './arrayBasics';

describe('array', () => {
  test('answer length should be 4', () => {
    expect(answer.length).toBe(4);
  });
  test('answer elements sum should equal 42', () => {
    const sum = answer.reduce((a, b) => a + b, 0);
    expect(sum).toBe(42);
  });
  test('answerAsArrayInstance should be equal to answer', () => {
    expect(answerAsArrayInstance).toEqual(answer);
  });
  test('answerFromArray should be equal to answer', () => {
    // With an iterable argument, Array.from(iterable) works like the
    // spread operator [...iterable] does. It is also a simple way to make a
    // copy of an array:
    expect(answerFromArray).toEqual(answer);
  });

  test('emptyAnswerWithLengthFiveFromArray length should be 5', () => {
    expect(emptyAnswerWithLengthFiveFromArray.length).toEqual(5);
  });
  test('answerDoubled should be equal to double answer', () => {
    const sumAnswer = answer.reduce((a, b) => a + b, 0);
    const sumDoubledAnswer = answerDoubled.reduce((a, b) => a + b, 0);
    expect(sumDoubledAnswer).toBe(sumAnswer * 2);
  });

  test('answerFromArrayOf should have first element from array', () => {
    // When the Array() constructor function is invoked with one numeric
    // argument, it uses that argument as an array length. But when invoked with
    // more than one numeric argument, it treats those arguments as elements for
    // the array to be created. This means that the Array() constructor cannot be
    // used to create an array with a sin‐ gle numeric element.
    expect(answerFromArrayOf).toEqual([answer[0]]);
  });
  test('greeting length should be 6', () => {
    expect(greeting.length).toBe(6);
  });

  test('greeting elements joined should be`hello`', () => {
    const message = greeting.join('');
    expect(message).toBe('hello');
  });
  test('joined should be reduced to 42_hello', () => {
    const message = joined.reduce((a, b) => (typeof a === 'number' && typeof b === 'number'
      ? a + b
      : `${a}${b}`), 0);
    expect(message).toBe('42_hello');
  });
  test('sparsed array sum of first and last elements and length is equal 20', () => {
    const sparsedSum = () => {
      const first = sparsedArray[0] || 0;
      const last = sparsedArray[sparsedArray.length - 1] || 0;
      return last + first + sparsedArray.length;
    };
    expect(sparsedSum()).toBe(20);
  });

  test('empty sparsed array length is equal 2', () => {
    // Array literal syntax allows an optional trailing comma,
    // so [,,] has a length of 2, not 3.
    // so it is also a valid option as [,]
    expect(emptySparsedWithLength.length).toBe(2);
  });
  test('initialize numbers using spread operator', () => {
    // The spread operator works on any iterable object.
    expect(numbers).toEqual(
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    );
  });
  test('should have unique letters only for greeting', () => {
    // Hint: you could use Set
    expect(uniqueLettersFromGreeting.join('')).toEqual('helo');
  });
  test('should have unique letters only', () => {
    expect(greetingCopiedAndModified.join('')).toEqual('Hello');
  });
  test('should have deleted last element', () => {
    expect(greetingWithDeletedLastElement.length).toBe(6);
    const last = greetingWithDeletedLastElement[greetingWithDeletedLastElement.length - 1];
    expect(last).toBe(undefined);
  });
  test('should change length of greeting array', () => {
    expect(greetingWithChangedLength.length).toBe(5);
    const last = greetingWithChangedLength[greetingWithChangedLength.length - 1];
    expect(last).toBe('o');
  });
  test('should add 3 exclamation marks to greeting array', () => {
    expect(greetingWithNewElements.length).toBe(9);
    expect(greetingWithNewElements.slice(-3)).toEqual(['!', '!', '!']);
  });
});
