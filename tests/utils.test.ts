import { isObject as isObjectLD } from 'lodash';
import { describe, expect, test } from 'vitest';

import { classnames, deepObjectCompare, isObject } from '@/utils/base';
import { formatTimeForWeather } from '@/utils/date-fns';
import { getFirebaseErr } from '@/utils/firebase';

describe('utils', () => {
  test('"date fns" SHOULD work as EXPECTED', () => {
    expect(formatTimeForWeather('2005/11/18 18:11:00')).toStrictEqual({
      endTime: '2005-11-19T18:11:00.000Z',
      startTime: '2005-11-18T18:11:00.000Z',
    });
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
        { hello: 'world', helloworld: { hello: 'world2' } }
      )
    ).toBe(false);
    expect(
      deepObjectCompare(
        { hello: 'world', helloworld: { hello: 'world' } },
        { hello: 'world', helloworld: { hello: 'world2', helloo: 'world' } }
      )
    ).toBe(false);
  });

  test('"firebase fns" SHOULD work as EXPECTED', () => {
    expect(getFirebaseErr('(auth/not-auth).')).toBe('not auth');
  });
});
