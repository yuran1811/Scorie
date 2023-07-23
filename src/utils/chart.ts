import { SubjectDetailType } from '@/shared';
import { averageScore, getAverageScore } from '@/utils';

export const getChartData = (scores: SubjectDetailType[], numberFormat: number) => {
  return [...scores].map((score) => {
    const average = getAverageScore(score.scores);
    const value = !average.count ? 0 : (average.total / average.count).toFixed(numberFormat);
    const expectedAverage = score?.expectedAverage || null;

    const goals = [];

    if (expectedAverage)
      goals.push({
        name: 'Expected',
        value: expectedAverage,
        strokeHeight: 5,
        strokeColor: '#775DD0',
      });

    const valueToCheck = +value > Number(expectedAverage) ? +value : (+value + Number(expectedAverage)) / 2.5;

    return {
      x: score.name,
      y: value,
      fillColor: averageScore[averageScore.check(valueToCheck)].color,
      goals,
      average,
    };
  });
};
