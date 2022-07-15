import { SETTINGS_DEFAULT, ScoreDetailType, SubjectListFilterType, SubjectListType } from 'shared';

export interface AverageScoreType {
	total: number;
	count: number;
}

export const filterScoreList = (list: SubjectListType[] | null, filter: SubjectListFilterType | null) => {
	if (list === null || filter === null) return [];

	return [...list]
		.map((_) => ({ ..._.subject, isShow: _.isShow }))
		.filter((_) => {
			if (!filter?.searchPattern || !filter.searchPattern.length) return true;
			return _.name.toLowerCase().includes(filter.searchPattern.toLowerCase());
		})
		.filter((_) => {
			if (!filter.hasIgnored && !filter.hasSpecial && !filter.hasVital) return true;
			if (filter.hasSpecial && _.isSpecial) return true;
			if (filter.hasVital && _.isVital) return true;
			if (filter.hasIgnored && _.isIgnored) return true;
			return false;
		});
};

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
