import { isObject as isObjectLD } from 'lodash';
import { describe, expect, test } from 'vitest';

import { classnames, deepObjectCompare, isObject } from '@/utils/base';
import { formatTimeForWeather, formatTimerValue } from '@/utils/date-fns';
import { getFirebaseErr } from '@/utils/firebase';

describe('utils', () => {
  test('"date fns" SHOULD work as EXPECTED', () => {
    expect(formatTimeForWeather('2005/11/18 18:11:00')).toStrictEqual({
      endTime: '2005-11-19T18:11:00.000Z',
      startTime: '2005-11-18T18:11:00.000Z',
    });
  });

  test('"timer format" SHOULD work as EXPECTED', () => {
    expect(formatTimerValue((2 * 60 + 30) * 1000, { format: 'HH:mm:ss:SSS' })).toBe('00:02:30:000');

    expect(formatTimerValue(120)).toBe('0:120');

    expect(formatTimerValue(0)).toBe('0');
    expect(formatTimerValue(3 * 1000)).toBe('3');
    expect(formatTimerValue(30 * 1000)).toBe('30');

    expect(formatTimerValue(60 * 1000)).toBe('1:00');
    expect(formatTimerValue(12 * 60 * 1000)).toBe('12:00');

    expect(formatTimerValue((2 * 60 * 60 + 30 * 60) * 1000)).toBe('2:30:00');
    expect(formatTimerValue((12 * 60 * 60 + 30 * 60) * 1000)).toBe('12:30:00');

    expect(formatTimerValue((26 * 60 * 60 + 30 * 60) * 1000)).toBe('1:02:30:00');
  });

  test('"classnames" SHOULD work as EXPECTED', () => {
    expect(classnames('hello', null, undefined, false, NaN, 'world')).toBe('hello world');
  });

  test('"object fns" SHOULD work as EXPECTED', () => {
    expect(isObject({ hello: 'world' })).toBe(isObjectLD({ hello: 'world' }));
    expect(isObject('world')).toBe(isObjectLD('world'));

    expect(deepObjectCompare({}, {})).toBe(true);
    expect(deepObjectCompare({ hello: 'world' }, { hello: 'world' })).toBe(true);
    expect(
      deepObjectCompare(
        { hello: 'world', helloworld: { hello: 'world' } },
        { hello: 'world', helloworld: { hello: 'world2' } },
      ),
    ).toBe(false);
    expect(
      deepObjectCompare(
        { hello: 'world', helloworld: { hello: 'world' } },
        { hello: 'world', helloworld: { hello: 'world2', helloo: 'world' } },
      ),
    ).toBe(false);
  });

  test('"firebase fns" SHOULD work as EXPECTED', () => {
    expect(getFirebaseErr('(auth/not-auth).')).toBe('not auth');
  });
});
