import { ScoreDetailType, SubjectDetailType } from 'shared';
import { ScoreDetail } from './ScoreDetail';
import { FC } from 'react';

interface ScoreContainerProps {
	viewMode: string;
	typeList: string[];
	scores: ScoreDetailType[];
	subject: SubjectDetailType | undefined;
}

export const ScoreContainer: FC<ScoreContainerProps> = ({ viewMode, subject, typeList, scores }) => (
	<>
		{viewMode === 'all' && (
			<>
				{subject &&
					subject.scores.map((score) => (
						<div key={score.id} className='bg-indigo-900 rounded-[2rem] m-6'>
							<ScoreDetail score={score} subject={subject} scores={scores} />
						</div>
					))}
			</>
		)}

		{viewMode === 'group' && (
			<>
				{typeList.map((_) => (
					<div key={_} className='w-full mt-6 mb-16'>
						<div className='w-full ml-6 text-left text-[4rem] indent-[3rem] border-l-[1rem] border-current'>
							{_}
						</div>
						<div className='w-full ml-6 flexcenter !justify-start flex-wrap'>
							{subject &&
								subject.scores
									.filter((score) => score.type === _)
									.map((score) => (
										<div key={score.id} className='bg-indigo-900 rounded-[2rem] m-6'>
											<ScoreDetail score={score} subject={subject} scores={scores} />
										</div>
									))}
						</div>
					</div>
				))}
			</>
		)}
	</>
);
