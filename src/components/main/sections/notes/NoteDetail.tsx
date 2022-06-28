import { CloseIcon, DoneIcon, ProgressIcon } from 'components/icons';
import { useNoteDetail } from 'contexts';
import { FC, useEffect, useState } from 'react';
import { fakeNotes } from 'services';

export const NoteDetail: FC = () => {
	const {
		viewDetail: { id: noteId, isOpened },
		setViewDetail,
	} = useNoteDetail();

	const noteData = { ...fakeNotes[0] };
	const { id, isDone, isInProgress, title, data, createdAt, updatedAt } = noteData;

	const [noteOptions, setNoteOptions] = useState({ isDone, isInProgress });

	useEffect(() => {
		setNoteOptions(noteData);
	}, [data]);

	return (
		<>
			{isOpened && (
				<div className='z-20 !fixed top-0 left-0 w-[100vw] h-[100vh] text-center bg-sky-100 text-slate-900 overflow-x-hidden overflow-y-auto'>
					<div className='sticky top-0 left-0 right-0 flex items-center justify-between p-8 bg-sky-100'>
						<div className='flexcenter flex-wrap w-full mobile:pl-24'>
							<DoneIcon
								className='cursor-pointer mx-5'
								fill={!noteOptions.isDone ? 'white' : '#d97706'}
								width='50'
								height='50'
								onClick={() => setNoteOptions((s) => ({ ...s, isDone: !s.isDone }))}
							/>
							<ProgressIcon
								className='cursor-pointer mx-5'
								fill={!noteOptions.isInProgress ? 'white' : '#57534e'}
								width='50'
								height='50'
								onClick={() => setNoteOptions((s) => ({ ...s, isInProgress: !s.isInProgress }))}
							/>
						</div>

						<CloseIcon
							className='cursor-pointer mx-4 text-rose-600'
							width='50'
							height='50'
							onClick={() =>
								setViewDetail &&
								setViewDetail({
									id: noteId,
									isOpened: false,
								})
							}
						/>
					</div>

					<div className='flexcentercol px-8 py-8'>
						<div className='font-bold text-[6rem] text-sky-800 text-center w-full line-clamp-1'>
							{title}
						</div>
						<div className='font-bold text-[4rem] text-left italic w-full px-12 mb-8 line-clamp-1'>
							{createdAt}
						</div>
						<div className='text-[3.6rem] text-left w-full px-6'>{data}</div>
					</div>
				</div>
			)}
		</>
	);
};
