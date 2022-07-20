import { NoteDetailType, NoteListFilterType, NoteListType } from '@/shared';
import { standardizeCollectionData } from './standardize';
import { appThemes } from './styles';

export const filterSectionList = (
  list: NoteListType[] | null,
  filter: NoteListFilterType | null,
  group?: string
): any[] => {
  if (list === null || filter === null) return [];

  return [...list]
    .map((_) => ({ ..._.note, isShow: _.isShow }))
    .filter((_) => {
      if (!group) return true;
      return (_.isPinned && group === 'pinned') || (!_.isPinned && group === 'other');
    })
    .filter((_) => {
      if (!filter?.searchPattern || !filter.searchPattern.length) return true;
      return (
        _.title.toLowerCase().includes(filter.searchPattern.toLowerCase()) ||
        _.data.toLowerCase().includes(filter.searchPattern.toLowerCase())
      );
    })
    .filter((_) => {
      if (!filter.hasDone && !filter.hasInProgress && !filter.hasArchived) return !_.isArchived;
      if (filter.hasDone && _.isDone) return true;
      if (filter.hasArchived && _.isArchived) return true;
      if (filter.hasInProgress && _.isInProgress) return true;
      return false;
    });
};

export const getNoteList = (data: any) => {
  if (data === null) return { idxList: [], noteList: [] };

  const resp = standardizeCollectionData(data) as NoteDetailType[];
  if (!resp.length) return { idxList: [], noteList: [] };

  const noteList = [...resp.map((note) => ({ note: { ...note }, isShow: true, id: note.id }))];
  const idxListIndex = resp.findIndex((_) => _?.idxList);

  const idxList = resp[idxListIndex];
  noteList.splice(idxListIndex, 1);

  return { idxList: idxList?.idxList ? idxList.idxList : [], noteList };
};
