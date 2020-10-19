/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { getDirectorsAsync, getMoviesAsync, getMoviesWithScore } from './async-await';

describe('async/await', () => {
  describe('await keyword place difference demo', () => {
    test('should wait 2 seconds and return sum', async () => {
      const result = await addTwoNumbersSlow();
      expect(result).toBeGreaterThan(0);
    });
    test('should wait 1 second and return sum', async () => {
      const result = await addTwoNumbersFaster();
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('should return the list of directors (version)', () => {
    test('should return list of directors', async () => {
      const directors = await getDirectorsAsync();
      expect(directors).toMatchSnapshot();
    });
    test('should return list of directors movies', async () => {
      const directors = await getDirectorsAsync();
      const movies = await getMoviesAsync(directors);
      expect(movies).toMatchSnapshot();
    });
    test('should return list of movies with scores', async () => {
      const directors = await getDirectorsAsync();
      const movies = await getMoviesAsync(directors);
      const moviesWithScores = await getMoviesWithScore(movies);
      expect(moviesWithScores).not.toBe(null);
    });
  });
});

async function getOperandWithDelay() {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * Math.floor(10)));
    }, 1000);
  });
}

async function addTwoNumbersSlow() {
  console.time('Time elapsed');
  const operand1 = await getOperandWithDelay();
  const operand2 = await getOperandWithDelay();
  const sum = operand1 + operand2;
  console.timeEnd('Time elapsed');
  return sum;
}

async function addTwoNumbersFaster() {
  console.time('Time elapsed');
  const operandPromise1 = getOperandWithDelay();
  const operandPromise2 = getOperandWithDelay();
  const operand1 = await operandPromise1;
  const operand2 = await operandPromise2;
  const sum = operand1 + operand2;
  console.timeEnd('Time elapsed');
  return sum;
}
