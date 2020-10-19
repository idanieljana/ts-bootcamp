import {
  delay,
  period,
  ExecutionAction, Schedule, ExecutionStatus,
  exec,
} from './timers';

function tickSeconds(seconds: number) {
  jest.advanceTimersByTime(seconds * 1000);
}

describe('timeouts/intervals', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  describe('delay()', () => {
    test('should not run function immediately', () => {
      const handlerMock = jest.fn();
      delay(handlerMock, 2);
      expect(handlerMock).not.toHaveBeenCalled();
    });
    test('should not run function when delay is partial', () => {
      const handlerMock = jest.fn();
      delay(handlerMock, 2);
      tickSeconds(1);
      expect(handlerMock).not.toHaveBeenCalled();
    });
    test('should run function when delay is passed', () => {
      const handlerMock = jest.fn();
      delay(handlerMock, 2);
      tickSeconds(2);
      expect(handlerMock).toHaveBeenCalled();
    });
    test('should abort running function', () => {
      const handlerMock = jest.fn();
      const abort = delay(handlerMock, 2);
      abort();
      tickSeconds(2);
      expect(handlerMock).not.toHaveBeenCalled();
    });
  });
  describe('period()', () => {
    test('should run passed function with 2s interval', () => {
      const handlerMock = jest.fn();
      period(handlerMock, 2);
      tickSeconds(2);
      expect(handlerMock).toHaveBeenCalled();
      tickSeconds(2 * 4);
      expect(handlerMock).toHaveBeenCalledTimes(5);
    });

    test('should abort running passedinterval', () => {
      const handlerMock = jest.fn();
      const abortInterval = period(handlerMock, 2);
      tickSeconds(2);
      expect(handlerMock).toHaveBeenCalled();
      handlerMock.mockClear();
      abortInterval();
      tickSeconds(2);
      expect(handlerMock).not.toHaveBeenCalled();
    });
  });

  // TODO: move to another describe section
  test('should executed play action with 200ms delay', () => {
    const handlerMock = jest.fn();
    const loggerMock = jest.fn();
    const params: Schedule = [ExecutionAction.Play, handlerMock, loggerMock];
    exec(params);
    expect(handlerMock).toHaveBeenCalled();
    expect(loggerMock).toHaveBeenCalledWith([ExecutionAction.Play, ExecutionStatus.Running]);
  });
});


describe("fast/slow", () => {
  test('slow', async () => {
    const result = await addTwoNumbersSlow();
    console.log(result)
    expect(result).toBeGreaterThan(0)
  });
  test('faster', async () => {
    const result = await addTwoNumbersFaster();
    console.log(result)
    expect(result).toBeGreaterThan(0)
  });
})

async function getOperandSlow() {
  return new Promise<number>(resolve => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * Math.floor(10)));
    }, 2 * 1000);
  });
}

async function addTwoNumbersSlow() {
  console.clear();
  console.time('Time elapsed');

  const operand1 = await getOperandSlow();
  const operand2 = await getOperandSlow();

  const sum = operand1 + operand2;

  console.log('First operand: ' + operand1);
  console.log('Second operand: ' + operand2);
  console.log('Sum: ' + sum);

  console.timeEnd('Time elapsed');
  return sum;
}

async function addTwoNumbersFaster() {
  console.clear();
  console.time('Time elapsed');

  const operandPromise1 = getOperandSlow();
  const operandPromise2 = getOperandSlow();
  const operand1 = await operandPromise1;
  const operand2 = await operandPromise2;
  const sum = operand1 + operand2;
  console.log('First operand: ' + operand1);
  console.log('Second operand: ' + operand2);
  console.log('Sum: ' + sum);

  console.timeEnd('Time elapsed');

  return sum;
}