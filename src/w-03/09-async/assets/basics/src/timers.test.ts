import {
  delay,
  period,
  ExecutionAction, Schedule, ExecutionStatus,
  exec,
} from './timers';

beforeEach(() => {
  jest.useFakeTimers();
});

function tickSeconds(seconds: number) {
  jest.runTimersToTime(seconds * 1000);
}

describe('timeouts/intervals', () => {
  describe('delay()', () => {
    test('should not run immediately passed function with 2s timeout', () => {
      const handlerMock = jest.fn();
      delay(handlerMock, 2);
      expect(handlerMock).not.toHaveBeenCalled();
    });
    test('should not run passed function with 2s timeout when 1s passed', () => {
      const handlerMock = jest.fn();
      delay(handlerMock, 2);
      tickSeconds(1);
      expect(handlerMock).not.toHaveBeenCalled();
    });
    test('should run passed function with 2s timeout when 2s passed', () => {
      const handlerMock = jest.fn();
      delay(handlerMock, 2);
      tickSeconds(2);
      expect(handlerMock).toHaveBeenCalled();
    });
    test('should abort passed function with 2s timeout', () => {
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

    test('should abort interval', () => {
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
