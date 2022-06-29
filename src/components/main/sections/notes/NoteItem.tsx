import { DoneIcon, ProgressIcon } from 'components/icons';
import { FC } from 'react';
import { NoteDetailType } from 'shared';

interface NoteItemProps {
	note: NoteDetailType;
}

export const NoteItem: FC<NoteItemProps> = ({ note }) => {
	const { id, title, data, isDone, isInProgress, createdAt, updatedAt } = note;

	return (
		<div className='cursor-pointer flexcentercol tablet:max-w-[30rem] w-full px-8 py-6 bg-sky-100 text-slate-900 border-sky-500 border-[0.5rem] rounded-[2rem]'>
			<div className='flexcenter'>
				<DoneIcon className='mx-4' width='40' height='40' fill={isDone ? '#eab308' : 'white'} />
				<ProgressIcon className='mx-4' width='40' height='40' fill={isInProgress ? '#64748b' : 'white'} />
			</div>
			<div className='font-bold text-center text-[4rem] w-full line-clamp-1 pt-4 px-4'>{title}</div>
			<div className='font-semibold text-left text-[2.8rem] italic w-full px-4 pb-4'>{createdAt}</div>
			<div className='font-semibold text-left text-[2.8rem] italic w-full px-4 pb-4'>{updatedAt}</div>
			<div className='text-[2.6rem] line-clamp-5 px-4'>{data}</div>
		</div>
	);
};
