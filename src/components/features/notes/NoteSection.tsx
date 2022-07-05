import { useStore } from 'store';
import { NoteListType, NoteSectionProps } from 'shared';
import { NoteItem } from './NoteItem';
import { FC, useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { updateIdxList } from 'services';
import { filterSectionList } from 'utils';

const SortableConfig = {
	animation: 200,
	swapThreshold: 0.5,
	filter: '.filtered',
};

export const NoteSection: FC<NoteSectionProps> = (props) => {
	const { filter, notes, orderList } = props;

	const currentUser = useStore((s) => s.currentUser);

	const [canUpdate, setCanUpdate] = useState(false);
	const [timeoutId, setTimeoutId] = useState<any>();
	const [pinnedList, setPinnedList] = useState<NoteListType[]>([]);
	const [otherList, setOtherList] = useState<NoteListType[]>([]);

	useEffect(() => {
		if (!orderList || !notes) return;

		const listToUse: NoteListType[] = [];
		orderList.forEach((_) => {
			const noteItem = notes.find((item) => item.id === _);
			if (!noteItem) return;

			listToUse.push(noteItem);
		});
		if (!listToUse.length) return;

		const pinnedList = listToUse.filter((_) => _.note.isPinned);
		const otherList = listToUse.filter((_) => !_.note.isPinned);

		setPinnedList([...pinnedList]);
		setOtherList([...otherList]);
	}, [orderList, notes]);

	useEffect(() => {
		if (!canUpdate || notes === null || !pinnedList || !otherList) return;
		if (!currentUser || !currentUser?.uid) return;

		const idxListToUpdate = [...pinnedList.map((_) => _.id), ...otherList.map((_) => _.id)];
		if (idxListToUpdate.every((_, idx) => _ === orderList[idx])) return;

		updateIdxList(currentUser.uid, [...pinnedList.map((_) => _.id), ...otherList.map((_) => _.id)]);
	}, [pinnedList, otherList, canUpdate]);

	useEffect(() => {
		return () => clearTimeout(timeoutId);
	});

	return (
		<div className='max-w-[100rem] w-full mx-auto my-12'>
			<div className='w-[20rem] mx-auto mb-6 font-semibold tablet:text-[5rem] text-[4rem] text-center border-b-[0.2rem] border-indigo-100'>
				Pinned
			</div>
			<ReactSortable
				{...SortableConfig}
				group='notes-pinned'
				list={pinnedList}
				setList={setPinnedList}
				className='flex flex-wrap justify-center items-start'
				sort={Boolean(+!filter.hasDone & +!filter.hasInProgress)}
				onMove={() => {
					clearTimeout(timeoutId);
					setCanUpdate(false);
					return true;
				}}
				onEnd={() => {
					clearTimeout(timeoutId);
					setTimeoutId(
						setTimeout(() => {
							setCanUpdate(true);
						}, 2200)
					);
					return true;
				}}
			>
				{filterSectionList(pinnedList, filter).map((item) => (
					<NoteItem key={item.id} isShow={item.isShow} note={item} />
				))}
			</ReactSortable>

			<div className='w-[20rem] mx-auto mt-[10rem] mb-6 font-semibold tablet:text-[5rem] text-[4rem] text-center border-b-[0.2rem] border-indigo-100'>
				Other
			</div>
			<ReactSortable
				{...SortableConfig}
				group='notes-other'
				list={otherList}
				setList={setOtherList}
				className='flex flex-wrap justify-center items-start'
				sort={Boolean(+!filter.hasDone & +!filter.hasInProgress)}
				onMove={() => {
					clearTimeout(timeoutId);
					setCanUpdate(false);
					return true;
				}}
				onEnd={() => {
					clearTimeout(timeoutId);
					setTimeoutId(
						setTimeout(() => {
							setCanUpdate(true);
						}, 3000)
					);
					return true;
				}}
			>
				{filterSectionList(otherList, filter).map((item) => (
					<NoteItem key={item.id} isShow={item.isShow} note={item} />
				))}
			</ReactSortable>
		</div>
	);
};
