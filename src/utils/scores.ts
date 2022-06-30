import { SETTINGS_DEFAULT } from '../constants';
import { ScoreDetailType } from 'shared';

export interface AverageScoreType {
	total: number;
	count: number;
}

export const getAverageScore = (scores: ScoreDetailType[], initialValue?: AverageScoreType) => {
	const result = scores.reduce((prevValue, score) => {
		if (score.isIgnored) return prevValue;
		return {
			total: +prevValue.total + +score.base * +score.value,
			count: +prevValue.count + +score.base,
		};
	}, initialValue || { total: 0, count: 0 });

	return result;
};

export const getAverageScoreString = (a: AverageScoreType, trail?: number): string =>
	!a.count ? '' : (a.total / a.count).toFixed(trail || SETTINGS_DEFAULT.numberFormat);
