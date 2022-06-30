import { FC, HTMLProps, useMemo, useState } from 'react';
import { averageScore, getAverageScoreString } from 'utils';

export interface SubjectAverageType {
	averageScore: number;
	isLoaded: boolean;
}

export interface SubjectAverageProps {
	subjectAverages: {
		[key: string]: SubjectAverageType;
	};
}

export const SubjectAverage: FC<SubjectAverageProps & HTMLProps<HTMLDivElement>> = ({ subjectAverages }) => {
	const subjectAverageScore = useMemo(() => {
		return Object.values(subjectAverages).reduce(
			(subjectTotal, subject) => {
				return {
					total: subjectTotal.total + subject.averageScore,
					count: subjectTotal.count + 1,
				};
			},
			{
				total: 0,
				count: 0,
			}
		);
	}, [subjectAverages]);

	const color = useMemo(() => {
		return !subjectAverageScore.count
			? averageScore.normal
			: averageScore[averageScore.check(subjectAverageScore.total / subjectAverageScore.count)];
	}, [subjectAverageScore]);

	return (
		<div className='flexcentercol font-bold text-[10rem] text-center pb-6'>
			<div className='w-full' style={{ color }}>
				{getAverageScoreString(subjectAverageScore, 2)}
			</div>
			<div className='w-full text-[4rem] capitalize' style={{ color }}>
				{averageScore.check(subjectAverageScore.total / subjectAverageScore.count)}
			</div>
		</div>
	);
};
