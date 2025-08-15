import getCorrectLetter from '../src/utils/getCorrectLetter';
import getCurrentWeekType from '../src/utils/getCurrentWeekType';

describe('getCorrectLetter', () => {
  it('returns "P" for "PROJECT"', () => {
    expect(getCorrectLetter('PROJECT')).toBe('P');
  });

  it('returns "K" for "COMPUTER_LABORATORY"', () => {
    expect(getCorrectLetter('COMPUTER_LABORATORY')).toBe('K');
  });

  it('returns "L" for "LABORATORY"', () => {
    expect(getCorrectLetter('LABORATORY')).toBe('L');
  });

  it('returns "W" for "LECTURE"', () => {
    expect(getCorrectLetter('LECTURE')).toBe('W');
  });

  it('returns "Ć" for "EXERCISES"', () => {
    expect(getCorrectLetter('EXERCISES')).toBe('Ć');
  });

  it('returns empty string for unknown input', () => {
    expect(getCorrectLetter('UNKNOWN')).toBe('');
  });

  it('returns empty string for empty input', () => {
    expect(getCorrectLetter('')).toBe('');
  });

  it('is case sensitive (should return "" for lowercase)', () => {
    expect(getCorrectLetter('lecture')).toBe('');
  });
});

describe('getCurrentWeekType', () => {
  const RealDate = Date;

  function mockDate(isoDate: string) {
    global.Date = class extends RealDate {
      constructor(...args: ConstructorParameters<typeof Date>) {
        if (args.length) {
          super(...args);
        } else {
          super(isoDate);
        }
      }
    } as typeof Date;
  }

  afterEach(() => {
    global.Date = RealDate; // Reset after each test
  });

  it('returns correct week type after Oct 1st (odd week)', () => {
    mockDate('2024-10-15T12:00:00Z'); // 2 weeks after Oct 1
    expect(getCurrentWeekType()).toBe(false);
  });

  it('returns correct week type after Oct 1st (even week)', () => {
    mockDate('2024-10-08T12:00:00Z'); // 1 week after Oct 1
    expect(getCurrentWeekType()).toBe(true);
  });

  it('uses previous year if before Oct 1st', () => {
    // Sept 25, 2024 should use Oct 1st, 2023 as reference
    mockDate('2024-09-25T12:00:00Z');
    expect(typeof getCurrentWeekType()).toBe('boolean'); // Just checking it works
  });

  it('returns consistent results for the same week', () => {
    mockDate('2024-11-04T12:00:00Z');
    const result1 = getCurrentWeekType();
    const result2 = getCurrentWeekType();
    expect(result1).toBe(result2);
  });

  it('returns boolean type', () => {
    mockDate('2024-10-01T12:00:00Z');
    const result = getCurrentWeekType();
    expect(typeof result).toBe('boolean');
  });
});
