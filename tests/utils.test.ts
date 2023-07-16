import { averageScore } from '@/utils/styles';
import { describe, expect, test } from 'vitest';

describe('utils', () => {
  test('average status should work as expected', () => {
    expect(averageScore.check(10)).toBe('excellent');
  });

  test.fails('max fn should NOT work as expected', () => {
    expect(Math.max(3, 4)).toBe(3);
  });
});
