import { loggerReducer, initialState } from './loggerReducer';
import { addLog, clearLogs } from './loggerActions';
import { getId } from './loggerUtils';
import { LogType } from './loggerTypes';

jest.mock('./loggerUtils');

const mockedISOStringValue = '2000-01-01T00:00:00.000Z';

beforeEach(() => {
  (getId as jest.Mock).mockReturnValue('123456789');
  jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(mockedISOStringValue);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('loggerReducer', () => {
  test('should reduce to initial state', () => {
    const actual = loggerReducer(undefined, {} as never);
    expect(actual).toEqual(initialState);
  });

  test('should reduce to added log in the state', () => {
    const actual = loggerReducer({ ...initialState }, addLog('Message', LogType.Card));
    const expected = {
      ...initialState,
      logs: [{
        createdAt: mockedISOStringValue,
        id: '123456789',
        log: 'Message',
        type: LogType.Card,
      }],
    };
    expect(actual).toEqual(expected);
  });

  test('should reduce to cleared logs in the state', () => {
    const state = {
      ...initialState,
      logs: [{
        createdAt: mockedISOStringValue,
        id: '123456789',
        log: 'Message',
        type: LogType.Card,
      }],
    };
    const actual = loggerReducer(state, clearLogs());
    expect(actual).toEqual(initialState);
  });
});
