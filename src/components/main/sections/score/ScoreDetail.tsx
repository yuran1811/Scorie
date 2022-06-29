import { FC, HTMLProps, useState } from 'react';
import { ScoreDetailType, SubjectDetailType } from 'shared';
import { ScoreDetailEdit } from './ScoreDetailEdit';

interface ScoreDetailProps {
	subject: SubjectDetailType | undefined;
	score: ScoreDetailType;
}

export const ScoreDetail: FC<ScoreDetailProps & HTMLProps<HTMLDivElement>> = ({ subject, score }) => {
	const [isEdited, setEdited] = useState(false);

	return (
		<>
			<div
				key={score.id}
				className={`${
					score.isIgnored ? 'bg-slate-400' : 'bg-indigo-900'
				} cursor-pointer rounded-[2rem] px-10 py-4`}
				onClick={() => setEdited(true)}
			>
				<div className='w-full text-[3.5rem] text-white'>{score.type}</div>
				<div className='w-full text-[4.5rem] text-sky-200'>{score.value}</div>
			</div>

			{isEdited && <ScoreDetailEdit score={score} subject={subject} onClick={() => setEdited(false)} />}
		</>
	);
};
