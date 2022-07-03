import { useStore } from 'store';
import { useCollectionQuery } from 'hooks';
import { db, NoteDetailType } from 'shared';
import { filterList, getNoteList } from 'utils';
import { Title } from '../Title';
import { NoteAddNew } from './NoteAddNew';
import { NoteSection } from './NoteSection';
import { AddIcon, ArchiveIcon, DoneIcon, FlatLoading, NoteIcon, ProgressIcon } from 'components/icons';
import { collection, orderBy, query } from 'firebase/firestore';
import { useMemo, useState } from 'react';

export interface NoteListType {
	id: string;
	isShow: boolean;
	note: NoteDetailType;
}

export interface NoteListFilterType {
	hasDone: boolean;
	hasInProgress: boolean;
	hasArchived: boolean;
}

export const NoteSectionBar = () => {
	const currentUser = useStore((s) => s.currentUser);

	const { data, loading, error } = useCollectionQuery(
		'users_notes',
		query(collection(db, 'users', currentUser?.uid as string, 'notes'), orderBy('updatedAt', 'desc'))
	);

	const [addNewOpen, setAddNewOpen] = useState(false);
	const [filter, setFilter] = useState({
		hasDone: false,
		hasInProgress: false,
		hasArchived: false,
	});

	const notes = useMemo(() => {
		if (loading || error || data === null) return [];

		return getNoteList(data);
	}, [data, loading, error]);
	const noteList = useMemo(() => filterList(notes, filter), [filter, notes]);

	return (
		<div className='w-full my-[2rem] mb-[7rem]'>
			<div className='w-full flexcenter flex-wrap px-4'>
				<Title Icon={NoteIcon} content='Notes' />
				<div className='flexcenter flex-wrap px-6 py-8'>
					<DoneIcon
						className='cursor-pointer mx-5'
						fill={!filter.hasDone ? 'white' : '#fcd34d'}
						width='50'
						height='50'
						onClick={() => setFilter((f) => ({ ...f, hasDone: !f.hasDone }))}
					/>
					<ProgressIcon
						className='cursor-pointer mx-5'
						fill={!filter.hasInProgress ? 'white' : '#38bdf8'}
						width='50'
						height='50'
						onClick={() => setFilter((f) => ({ ...f, hasInProgress: !f.hasInProgress }))}
					/>
					<ArchiveIcon
						className='cursor-pointer mx-5'
						fill={!filter.hasArchived ? 'white' : '#38bdf8'}
						width='50'
						height='50'
						onClick={() => setFilter((f) => ({ ...f, hasArchived: !f.hasArchived }))}
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

			{loading ? (
				<div className='flexcenter w-full h-[10rem]'>
					<FlatLoading />
				</div>
			) : (
				<>
					{noteList !== null && noteList.length !== 0 && (
						<NoteSection filter={filter} group='pinned' title='Pinned' notes={noteList} />
					)}
					{noteList !== null && noteList.length !== 0 && (
						<NoteSection filter={filter} group='other' title='Other' notes={noteList} />
					)}
				</>
			)}

			{addNewOpen && <NoteAddNew notes={noteList} onClickHandle={setAddNewOpen} />}
		</div>
	);
};
