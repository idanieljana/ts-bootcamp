import { getLogs, getLogsCount } from './loggerSelectors';
import { LogType } from './loggerTypes';

describe('loggerSelectors', () => {
  test('should return logs from the state', () => {
    const logs = [{
      createdAt: '2000-01-01T00:00:00.000Z',
      id: '123456789',
      log: 'Message',
      type: LogType.Card,
    }];
    const state = {
      logger: {
        logs,
      },
    };
    expect(getLogs(state)).toEqual(logs);
  });
  test('should return logs from the state', () => {
    const selected = getLogsCount.resultFunc([
      {
        createdAt: '2000-01-01T00:00:00.000Z',
        id: '123456789',
        log: 'Message',
        type: LogType.Card,
      },
      {
        createdAt: '2000-01-01T00:00:00.000Z',
        id: '123456789',
        log: 'Message',
        type: LogType.Card,
      },
    ]);
    expect(selected).toEqual(2);
  });
});
