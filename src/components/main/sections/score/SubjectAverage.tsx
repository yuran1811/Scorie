import { SubjectDetailType } from 'shared';
import { averageScore, getAverageScoreString } from 'utils';
import { FC, HTMLProps, useMemo } from 'react';

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

export const SubjectAverage: FC<SubjectAverageProps & HTMLProps<HTMLDivElement>> = ({ subjects }) => {
	const subjectAverageScore = useMemo(() => {
		const averageScore = subjects.reduce(
			(prevScore, subject) => {
				if (!subject.scores.length) return prevScore;

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
						{getAverageScoreString(subjectAverageScore, 2)}
					</div>
					<div className='w-full text-[4rem] capitalize' style={{ color }}>
						{averageScore.check(subjectAverageScore.total / subjectAverageScore.count)}
					</div>
				</>
			)}
		</div>
	);
};
