import { NoteListFilterType, NoteListType } from 'components/main/sections/notes/NoteSectionBar';
import { NoteDetailType } from 'shared';
import { standardizeCollectionData } from './standardize';

export const filterSectionList = (list: NoteListType[] | null, filter: NoteListFilterType | null, group?: string) => {
	if (list === null || filter === null) return [];

	return list
		.map((_) => ({ ..._.note, isShow: _.isShow }))
		.filter((_) => {
			if (!group) return true;

			return (_.isPinned && group === 'pinned') || (!_.isPinned && group === 'other');
		})
		.filter((_) => {
			if (!filter.hasDone && !filter.hasInProgress && !filter.hasArchived) return true;

			if (filter.hasDone && _.isDone) return true;
			if (filter.hasArchived && _.isArchived) return true;
			if (filter.hasInProgress && _.isInProgress) return true;

			return false;
		});
};

export const filterList = (notes: NoteListType[] | null, filter: NoteListFilterType | null) => {
	if (notes === null || filter === null) return [];

	if (!filter.hasDone && !filter.hasInProgress && !filter.hasArchived) return notes;

	return notes.filter((item) => {
		if (
			(filter.hasDone && item.note.isDone) ||
			(filter.hasArchived && item.note.isArchived) ||
			(filter.hasInProgress && item.note.isInProgress)
		) {
			item.isShow = true;
		} else item.isShow = false;

		return item.isShow;
	});
};

export const getNoteList = (data: any) => {
	if (data === null) return [];

	const resp = standardizeCollectionData(data) as NoteDetailType[];

	return resp.map((note) => ({ note: { ...note }, isShow: true, id: note.id }));
};
