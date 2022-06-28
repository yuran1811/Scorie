import { AddIcon, DoneIcon, NoteIcon, ProgressIcon } from 'components/icons';
import { NoteDetailProvider } from 'contexts';
import { useMemo, useState } from 'react';
import { NoteDetailType } from 'shared';
import { SectionSwiper } from '../SectionSwiper';
import { Title } from '../Title';
import { NoteAddNew } from './NoteAddNew';
import { NoteDetail } from './NoteDetail';
import { NoteItem } from './NoteItem';

export const NoteSectionBar = () => {
	const [filter, setFilter] = useState({
		hasDone: false,
		hasProgress: false,
	});

	const [addNewOpen, setAddNewOpen] = useState(false);

	const notes: NoteDetailType[] = [];

	const noteList = useMemo(() => {
		if (!filter.hasDone && !filter.hasProgress) return notes;

		return notes.filter((note) => {
			if (filter.hasDone && filter.hasProgress) return note;

			if (filter.hasDone) return note.isDone && !note.isInProgress;
			if (filter.hasProgress) return note.isInProgress && !note.isDone;
		});
	}, [filter, notes]);

	return (
		<div className='w-full my-[2rem] mb-[7rem]'>
			<div className='w-full flexcenter flex-wrap'>
				<Title Icon={NoteIcon} content='Notes' />
				<div className='flexcenter px-6 py-8'>
					<DoneIcon
						className='cursor-pointer mx-5'
						fill={!filter.hasDone ? 'white' : '#fcd34d'}
						width='50'
						height='50'
						onClick={() => setFilter((f) => ({ ...f, hasDone: !f.hasDone }))}
					/>
					<ProgressIcon
						className='cursor-pointer mx-5'
						fill={!filter.hasProgress ? 'white' : '#38bdf8'}
						width='50'
						height='50'
						onClick={() => setFilter((f) => ({ ...f, hasProgress: !f.hasProgress }))}
					/>

					<AddIcon
						className='cursor-pointer mx-5'
						fill={'white'}
						width='50'
						height='50'
						onClick={() => setAddNewOpen(true)}
					/>
				</div>
			</div>
			<div className='font-semibold text-[3rem] text-white text-center italic p-4 mt-4'>
				{noteList.length} notes found
			</div>
			<NoteDetailProvider>
				<SectionSwiper
					Slide={NoteItem}
					slideChilds={noteList}
					breakpoints={{
						1080: { slidesPerView: 3 },
						640: { slidesPerView: 2 },
						0: { slidesPerView: 1 },
					}}
				/>
				<NoteDetail />
			</NoteDetailProvider>

			{addNewOpen && <NoteAddNew onClickHandle={setAddNewOpen} />}
		</div>
	);
};
