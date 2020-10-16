import {
  timeout,
  interval,
  ExecutionAction, Schedule, ExecutionStatus,
  exec,
} from './timers';

beforeEach(() => {
  jest.useFakeTimers();
});

describe('timeouts/intervals', () => {
  test('should not run immediately passed function with 200ms timeout', () => {
    const handlerMock = jest.fn();
    timeout(handlerMock, 200);
    expect(handlerMock).not.toHaveBeenCalled();
  })
  test('should not run passed function with 200ms timeout when 100ms passed', () => {
    const handlerMock = jest.fn();
    timeout(handlerMock, 200);
    jest.runTimersToTime(100)
    expect(handlerMock).not.toHaveBeenCalled();
  })
  test('should run passed function with 200ms timeout when 200ms passed', () => {
    const handlerMock = jest.fn();
    timeout(handlerMock, 200);
    jest.runTimersToTime(200)
    expect(handlerMock).toHaveBeenCalled();
  })

  test('should run passed function with 200ms interval', () => {
    const handlerMock = jest.fn();
    interval(handlerMock, 200);
    jest.runTimersToTime(200)
    expect(handlerMock).toHaveBeenCalled();
    jest.runTimersToTime(200 * 4)
    expect(handlerMock).toHaveBeenCalledTimes(5);
  })

  test('should cancel interval', () => {
    const handlerMock = jest.fn();
    const cancelInterval = interval(handlerMock, 200);
    jest.runTimersToTime(200)
    expect(handlerMock).toHaveBeenCalled();
    handlerMock.mockClear();
    cancelInterval();
    jest.runTimersToTime(200)
    expect(handlerMock).not.toHaveBeenCalled();
  })

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
