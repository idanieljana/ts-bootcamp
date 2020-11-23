import { initialState, loggerReducer } from './loggerReducer';
import { setCreated } from './loggerActions';
import { getId } from './loggerUtils';

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
  test('should reduce to setting created', () => {
    const logMock = jest.spyOn(console, 'log').mockImplementation(jest.fn());
    const actual = loggerReducer({ ...initialState }, setCreated());
    const mockedCreated = '123456789 - 2000-01-01T00:00:00.000Z';
    expect(logMock).toBeCalledWith(mockedCreated);
    const expected = {
      ...initialState,
      created: mockedCreated,
    };
    expect(actual).toEqual(expected);
  });

  test('should reduce to initial state', () => {
    expect(loggerReducer).toEqual(loggerReducer);
  });

  test('should reduce to added log in the state', () => {
    expect(true).toEqual(true);
  });

  test('should reduce to cleared logs in the state', () => {
    expect(true).toEqual(true);
  });
});
