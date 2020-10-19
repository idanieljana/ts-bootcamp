/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-use-before-define */

describe('async/await', () => {
  describe.skip('await keyword place difference demo', () => {
    test('should wait 2 seconds and return sum', async () => {
      const result = await addTwoNumbersSlow();
      expect(result).toBeGreaterThan(0);
    });
    test('should wait 1 second and return sum', async () => {
      const result = await addTwoNumbersFaster();
      expect(result).toBeGreaterThan(0);
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
