import {loggerReducer, initialState} from "./loggerReducer";
import {addLog} from "./loggerActions";
import { getId } from "./loggerUtils";

jest.mock('./loggerUtils');

const mockedISOStringValue = '2000-01-01T00:00:00.000Z';

beforeEach(() => {
    (getId as jest.Mock).mockReturnValue('123456789');
    jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(mockedISOStringValue);
});

afterEach(() => {
    jest.restoreAllMocks()
});

test('should reduce to initial state', () => {
    const actual = loggerReducer(undefined, {} as any);
    const expected = initialState;
    expect(actual).toEqual(expected);
});

test('should reduce to added login the state', () => {
    const actual = loggerReducer({...initialState}, addLog("Message"));
    const expected = {
        ...initialState,
        logs: [{
            createdAt: mockedISOStringValue,
            id: "123456789",
            log: "Message",
        }]
    };
    expect(actual).toEqual(expected);
});
