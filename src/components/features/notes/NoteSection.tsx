import { useStore } from 'store';
import { updateIdxList } from 'services';
import { filterSectionList } from 'utils';
import { NoteListType, NoteSectionProps } from 'shared';
import { NoteItem } from './NoteItem';
import { ReactSortable } from 'react-sortablejs';
import { FC, useCallback, useEffect, useState } from 'react';

const sortableConfig = {
	animation: 200,
	delay: 300,
	swapThreshold: 0.3,
	sort: true,
	delayOnTouchOnly: true,
	className: 'flex flex-wrap justify-center items-start',
};

export const NoteSection: FC<NoteSectionProps> = (props) => {
	const { viewMode, filter, notes, orderList } = props;

	const currentUser = useStore((s) => s.currentUser);

	const [canUpdate, setCanUpdate] = useState(false);
	const [timeoutId, setTimeoutId] = useState<any>();
	const [pinnedList, setPinnedList] = useState<NoteListType[]>([]);
	const [otherList, setOtherList] = useState<NoteListType[]>([]);

	const onMoveHandle = useCallback(() => {
		clearTimeout(timeoutId);
		setCanUpdate(false);
		return true;
	}, []);

	const onEndHandle = useCallback(() => {
		clearTimeout(timeoutId);
		setTimeoutId(
			setTimeout(() => {
				setCanUpdate(true);
			}, 2200)
		);
		return true;
	}, []);

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
			<div className='w-[20rem] mx-auto mb-8 font-semibold tablet:text-[5rem] text-[4rem] text-center border-b-[0.2rem] border-indigo-100'>
				Pinned
			</div>
			<ReactSortable
				{...sortableConfig}
				group='notes-pinned'
				list={pinnedList}
				setList={setPinnedList}
				onMove={onMoveHandle}
				onEnd={onEndHandle}
			>
				{filterSectionList(pinnedList, filter).map((item) => (
					<div key={item.id}>
						<NoteItem viewMode={viewMode} isShow={item.isShow} note={item} />
					</div>
				))}
			</ReactSortable>

			<div className='w-[20rem] mx-auto mt-[7rem] mb-8 font-semibold tablet:text-[5rem] text-[4rem] text-center border-b-[0.2rem] border-indigo-100'>
				Others
			</div>
			<ReactSortable
				{...sortableConfig}
				group='notes-others'
				list={otherList}
				setList={setOtherList}
				onMove={onMoveHandle}
				onEnd={onEndHandle}
			>
				{filterSectionList(otherList, filter).map((item) => (
					<div key={item.id}>
						<NoteItem viewMode={viewMode} key={item.id} isShow={item.isShow} note={item} />
					</div>
				))}
			</ReactSortable>
		</div>
	);
};
