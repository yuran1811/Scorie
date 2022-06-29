import { FC } from 'react';
import { ScoreDetailType, SubjectDetailType } from 'shared';
import { ScoreDetail } from './ScoreDetail';

interface ScoreContainerProps {
	viewMode: string;
	scores: ScoreDetailType[];
	subject: SubjectDetailType | undefined;
	typeList: string[];
}

export const ScoreContainer: FC<ScoreContainerProps> = ({ viewMode, scores, subject, typeList }) => (
	<>
		{viewMode === 'all' && (
			<>
				{scores.map((score) => (
					<div key={score.id} className='bg-indigo-900 rounded-[2rem] m-6'>
						<ScoreDetail score={score} subject={subject} />
					</div>
				))}
			</>
		)}

		{viewMode === 'group' && (
			<>
				{typeList.map((_) => (
					<div key={_} className='w-full mt-6 mb-16'>
						<div className='w-full text-left text-[4rem] indent-[3rem] border-l-[1rem] border-current'>
							{_}
						</div>
						<div className='w-full flexcenter !justify-start flex-wrap'>
							{scores
								.filter((score) => score.type === _)
								.map((score) => (
									<div key={score.id} className='bg-indigo-900 rounded-[2rem] m-6'>
										<ScoreDetail score={score} subject={subject} />
									</div>
								))}
						</div>
					</div>
				))}
			</>
		)}
	</>
);
