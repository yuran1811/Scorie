import { filterSectionList } from 'utils';
import { NoteItem } from './NoteItem';
import { NoteListFilterType, NoteListType } from './NoteSectionBar';
import { ReactSortable } from 'react-sortablejs';
import { FC, useEffect, useState } from 'react';
import { editNote } from 'services';
import { useStore } from 'store';
import { NoteDetailType } from 'shared';

interface RegularSectionProps {
	title: string;
	group: string;
	filter: NoteListFilterType;
	notes: NoteListType[];
}

export const NoteSection: FC<RegularSectionProps> = ({ filter, title, group, notes }) => {
	const currentUser = useStore((s) => s.currentUser);

	const [list, setList] = useState(notes || []);
	const [canUpdate, setCanUpdate] = useState(false);
	const [timeoutId, setTimeoutId] = useState<any>();
	const [dragNote, setDragNote] = useState<NoteDetailType | null>(null);

	useEffect(() => {
		setList(notes);
	}, [notes]);

	useEffect(() => {
		if (dragNote === null || !currentUser || !currentUser?.uid) return;
		if (notes === null || list === null) return;

		let isSame = true;
		for (let i = 0; i < notes.length; i++)
			if (notes[i].note.id !== list[i].note.id) {
				isSame = false;
				break;
			}

		if (isSame) return;

		if (canUpdate) {
			console.log('Update');

			// editNote(currentUser.uid, dragNote.id, {});
		}
	}, [list, canUpdate, dragNote]);

	useEffect(() => {
		return () => clearTimeout(timeoutId);
	});

	return (
		<div className='max-w-[100rem] w-full mx-auto my-12'>
			<div className='w-[20rem] mx-auto mb-6 font-semibold tablet:text-[5rem] text-[4rem] text-center border-b-[0.2rem] border-indigo-100'>
				{title}
			</div>

			<ReactSortable
				group={`notes-${group || 'dnd'}`}
				className='flex flex-wrap justify-center items-start'
				animation={200}
				list={list}
				setList={setList}
				swapThreshold={0.5}
				sort={Boolean(+!filter.hasDone & +!filter.hasInProgress)}
				onChoose={(e) => {
					if (e.oldIndex) {
						console.log(notes[e.oldIndex]);
						setDragNote(notes[e.oldIndex].note);
					}
				}}
				onMove={() => {
					console.log('Dragging');

					clearTimeout(timeoutId);
					setCanUpdate(false);

					return true;
				}}
				onEnd={() => {
					console.log('Drop');

					setTimeoutId(
						setTimeout(() => {
							setCanUpdate(true);
						}, 5000)
					);

					return true;
				}}
			>
				{filterSectionList(list, filter, group).map((item) => (
					<NoteItem key={item.id} isShow={item.isShow} note={item} list={list} />
				))}
			</ReactSortable>
		</div>
	);
};
