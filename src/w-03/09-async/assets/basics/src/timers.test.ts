import {
  delay,
  period,
} from './timers';

function tickSeconds(seconds: number) {
  return seconds;
}

describe.skip('timeouts/intervals', () => {
  beforeEach(() => {
    // use Fake Timers
  });

  describe('delay()', () => {
    test('should not run function immediately', () => {
      delay(() => () => {}, -1);
      tickSeconds(-1);
      expect(true).toBe(false);
    });
    test('should not run function when delay is partial', () => {
      expect(true).toBe(false);
    });
    test('should run function when delay is passed', () => {
      expect(true).toBe(false);
    });
    test('should abort running function', () => {
      expect(true).toBe(false);
    });
  });
  describe('period()', () => {
    test('should run passed function with 2s interval', () => {
      period(() => () => {}, -1);
      tickSeconds(-1);
      expect(true).toBe(false);
    });

    test('should abort running passed interval', () => {
      expect(true).toBe(false);
    });
  });
});
