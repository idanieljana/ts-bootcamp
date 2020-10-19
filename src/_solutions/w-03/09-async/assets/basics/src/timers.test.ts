import {
  delay,
  period,
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

    test('should abort running passed interval', () => {
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
});
