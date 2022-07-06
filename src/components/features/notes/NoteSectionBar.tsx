import { useStore } from 'store';
import { getNoteList } from 'utils';
import { db, NoteListType } from 'shared';
import { useCollectionQuery } from 'hooks';
import { Title } from '../main/sections/Title';
import { NoteAddNew } from './NoteAddNew';
import { NoteSection } from './NoteSection';
import {
	AddIcon,
	ArchiveIcon,
	DoneIcon,
	FlatLoading,
	ListAllIcon,
	ListIcon,
	NoteIcon,
	ProgressIcon,
} from 'components/icons';
import { collection } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { SearchBar } from 'components/shared';

export const NoteSectionBar = () => {
	const currentUser = useStore((s) => s.currentUser);

	const { data, loading, error } = useCollectionQuery(
		'users_notes',
		collection(db, 'users', currentUser?.uid as string, 'notes')
	);

	const inputRef = useRef<HTMLInputElement>(null);

	const [viewMode, setViewMode] = useState('grid');
	const [addNewOpen, setAddNewOpen] = useState(false);
	const [noteList, setNoteList] = useState<NoteListType[]>([]);
	const [idxListState, setIdxListState] = useState<string[]>([]);
	const [filter, setFilter] = useState({
		hasArchived: false,
		hasDone: false,
		hasInProgress: false,
	});

	useEffect(() => {
		if (loading || error || data === null) return;

		const rawData = getNoteList(data);
		if (!rawData) return;

		if (rawData?.idxList) setIdxListState(rawData.idxList as string[]);
		if (rawData?.noteList) setNoteList(rawData.noteList as NoteListType[]);
	}, [data, loading, error]);

	return (
		<div className='w-full my-[2rem] mb-[7rem]'>
			<div className='w-full flexcenter flex-wrap px-4'>
				<Title Icon={NoteIcon} content='Notes' />
				<div className='flexcenter flex-wrap px-6 py-8'>
					<DoneIcon
						className='cursor-pointer mx-5 my-4'
						fill={!filter.hasDone ? 'white' : '#fcd34d'}
						width='40'
						height='40'
						onClick={() => setFilter((f) => ({ ...f, hasDone: !f.hasDone }))}
					/>
					<ProgressIcon
						className='cursor-pointer mx-5 my-4'
						fill={!filter.hasInProgress ? 'white' : '#38bdf8'}
						width='40'
						height='40'
						onClick={() => setFilter((f) => ({ ...f, hasInProgress: !f.hasInProgress }))}
					/>
					<ArchiveIcon
						className='cursor-pointer mx-5 my-4'
						fill={!filter.hasArchived ? 'white' : '#94a3b8'}
						width='40'
						height='40'
						onClick={() => setFilter((f) => ({ ...f, hasArchived: !f.hasArchived }))}
					/>

					<AddIcon
						className='cursor-pointer mx-5 my-4'
						fill={'white'}
						width='40'
						height='40'
						onClick={() => setAddNewOpen(true)}
					/>

					<div className='block tablet:hidden'>
						<ListIcon
							className={`${viewMode === 'list' ? 'block' : 'hidden'} cursor-pointer mx-5 my-4`}
							width='40'
							height='40'
							onClick={() => setViewMode('grid')}
						/>
						<ListAllIcon
							className={`${viewMode === 'grid' ? 'block' : 'hidden'} cursor-pointer mx-5 my-4`}
							width='40'
							height='40'
							onClick={() => setViewMode('list')}
						/>
					</div>
				</div>
			</div>
			{/* <div className='w-full flexcenter px-4'>
				<SearchBar inputRef={inputRef} />
			</div> */}

			{loading && (
				<div className='flexcenter w-full h-[10rem]'>
					<FlatLoading />
				</div>
			)}

			{!loading && noteList !== null && noteList.length !== 0 && (
				<NoteSection viewMode={viewMode} filter={filter} notes={noteList} orderList={idxListState} />
			)}

			{addNewOpen && <NoteAddNew onClickHandle={setAddNewOpen} />}
		</div>
	);
};
