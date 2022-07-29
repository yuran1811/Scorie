import { updateIdxList } from '@/services';
import { NoteListType, NoteSectionProps } from '@/shared';
import { useStore } from '@/store';
import { filterSectionList } from '@/utils';
import { NoteItem } from './NoteItem';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { useTranslation } from 'react-i18next';

const sortableConfig = {
  animation: 200,
  delay: 300,
  swapThreshold: 0.3,
  sort: true,
  delayOnTouchOnly: true,
  className: 'flex flex-wrap justify-center items-start',
};

export const NoteSection: FC<NoteSectionProps> = (props) => {
  const { viewMode, filter, notes } = props;

  const noteIdxList = useStore((s) => s.noteIdxList);

  const { t } = useTranslation();

  const currentUser = useStore((s) => s.currentUser);

  const [canUpdate, setCanUpdate] = useState(false);
  const [timeoutId, setTimeoutId] = useState<any>();
  const [pinnedList, setPinnedList] = useState<NoteListType[]>([]);
  const [otherList, setOtherList] = useState<NoteListType[]>([]);

  const onMoveHandle = useCallback(() => {
    clearTimeout(timeoutId);
    setCanUpdate(false);
    return true;
  }, [timeoutId]);

  const onEndHandle = useCallback(() => {
    clearTimeout(timeoutId);
    setTimeoutId(
      setTimeout(() => {
        setCanUpdate(true);
      }, 300)
    );
    return true;
  }, [timeoutId]);

  useEffect(() => {
    if (!noteIdxList || !notes) return;
    if (!noteIdxList.list.length) {
      setOtherList([...notes]);
      return;
    }

    const listToUse: NoteListType[] = [];
    noteIdxList.list.forEach((_) => {
      const noteItem = notes.find((item) => item.id === _);
      if (!noteItem) return;

      listToUse.push(noteItem);
    });
    const pinnedList = listToUse.filter((_) => _.note.isPinned);
    const otherList = listToUse.filter((_) => !_.note.isPinned);

    const notesUnorder = notes.filter((note) => !listToUse.find((item) => item.id === note.id));
    const pinnedListUnorder = notesUnorder.filter((_) => _.note.isPinned);
    const otherListUnorder = notesUnorder.filter((_) => !_.note.isPinned);

    setPinnedList([...pinnedList, ...pinnedListUnorder]);
    setOtherList([...otherList, ...otherListUnorder]);
  }, [noteIdxList, notes]);

  useEffect(() => {
    if (!canUpdate || notes === null || !pinnedList || !otherList) return;
    if (!currentUser || !currentUser?.uid) return;

    const idxListToUpdate = [...pinnedList.map((_) => _.id), ...otherList.map((_) => _.id)];
    if (idxListToUpdate.every((_, idx) => _ === noteIdxList.list[idx])) return;

    updateIdxList(
      currentUser.uid,
      [...pinnedList.map((_) => _.id), ...otherList.map((_) => _.id)],
      noteIdxList.id
    );
  }, [pinnedList, otherList, canUpdate]);

  useEffect(() => {
    return () => clearTimeout(timeoutId);
  });

  return (
    <div className="mx-auto my-12 w-full max-w-[100rem] pb-12">
      <div className="mx-auto mb-8 w-[20rem] border-b-[0.2rem] border-indigo-100 text-center text-[3.5rem] font-semibold tablet:text-[4.5rem]">
        {t('pinned')}
      </div>
      <ReactSortable
        {...sortableConfig}
        group="notes-pinned"
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

      <div className="mx-auto mt-[7rem] mb-8 w-[20rem] border-b-[0.2rem] border-indigo-100 text-center text-[3.5rem] font-semibold tablet:text-[4.5rem]">
        {t('others')}
      </div>
      <ReactSortable
        {...sortableConfig}
        group="notes-others"
        list={otherList}
        setList={setOtherList}
        onMove={onMoveHandle}
        onEnd={onEndHandle}
      >
        {filterSectionList(otherList, filter).map((item) => (
          <div key={item.id}>
            <NoteItem viewMode={viewMode} isShow={item.isShow} note={item} />
          </div>
        ))}
      </ReactSortable>
    </div>
  );
};

export default memo(NoteSection);
