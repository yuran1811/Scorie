import { SETTINGS_DEFAULT } from '../constants';
import { ScoreDetailType } from 'shared';

export interface AverageScoreType {
	total: number;
	count: number;
}

export const getAverageScore = (scores: ScoreDetailType[], trail?: number, initialValue?: AverageScoreType) => {
	const result = scores.reduce((prevValue, score) => {
		if (score.isIgnored) return prevValue;
		return {
			total: +prevValue.total + +score.base * +score.value,
			count: +prevValue.count + +score.base,
		};
	}, initialValue || { total: 0, count: 0 });

	return !result.count ? '' : (result.total / result.count).toFixed(trail || SETTINGS_DEFAULT.numberFormat);
};
