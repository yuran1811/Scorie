import { averageScore, getAverageScoreString } from 'utils';
import { DivProps, SubjectDetailType } from 'shared';
import { FC, useMemo } from 'react';
import { useStore } from 'store';

export interface SubjectAverageType {
	averageScore: number;
	isLoaded: boolean;
}

export interface SubjectAverageState {
	count: number;
	loaded: number;
	averageScores: {
		name: string;
		score: number;
	}[];
}

export interface SubjectAverageProps {
	subjects: SubjectDetailType[];
}

export const SubjectAverage: FC<SubjectAverageProps & DivProps> = ({ subjects }) => {
	const settings = useStore((s) => s.settings);

	const subjectAverageScore = useMemo(() => {
		const averageScore = subjects.reduce(
			(prevScore, subject) => {
				if (subject.isIgnored || !subject.scores.length) return prevScore;

				const scores = subject.scores.reduce(
					(prevVal, val) => {
						if (val.isIgnored) return prevVal;

						return {
							total: val.value * val.base + prevVal.total,
							count: val.base + prevVal.count,
						};
					},
					{ total: 0, count: 0 }
				);

				if (!scores.count) return prevScore;

				return {
					total: scores.total / scores.count + prevScore.total,
					count: prevScore.count + 1,
				};
			},
			{ total: 0, count: 0 }
		);

		if (!averageScore.count)
			return {
				total: 0,
				count: 0,
			};

		return averageScore;
	}, [subjects]);

	const color = useMemo(() => {
		return !subjectAverageScore.count
			? averageScore.normal
			: averageScore[averageScore.check(subjectAverageScore.total / subjectAverageScore.count)];
	}, [subjectAverageScore]);

	return (
		<div className='flexcentercol font-bold text-[10rem] text-center pb-6'>
			{!subjectAverageScore.count ? (
				''
			) : (
				<>
					<div className='w-full' style={{ color }}>
						{getAverageScoreString(subjectAverageScore, settings.numberFormat)}
					</div>
					<div className='w-full text-[4rem] capitalize' style={{ color }}>
						{averageScore.check(subjectAverageScore.total / subjectAverageScore.count)}
					</div>
				</>
			)}
		</div>
	);
};
