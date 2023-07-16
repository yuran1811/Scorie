import { updateIdxList } from '@/services';
import { NoteListType, NoteSectionProps } from '@/shared';
import { useNoteStore, useStore } from '@/store';
import { filterSectionList } from '@/utils';
import { GradientUnderline } from '@cpns/interfaces';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactSortable } from 'react-sortablejs';
import { NoteItem } from './NoteItem';

const sortableConfig = {
  animation: 200,
  delay: 300,
  swapThreshold: 0.3,
  sort: true,
  delayOnTouchOnly: true,
  className: 'flex flex-wrap justify-center items-start gap-2 lgmb:gap-4',
};

export const NoteSection: FC<NoteSectionProps> = (props) => {
  const { viewMode, filter, notes } = props;

  const currentUser = useStore((s) => s.currentUser);
  const noteIdxList = useNoteStore((s) => s.noteIdxList);

  const { t } = useTranslation();

  const [canUpdate, setCanUpdate] = useState(false);
  const [timeoutId, setTimeoutId] = useState<any>();
  const [pinnedList, setPinnedList] = useState<NoteListType[]>([]);
  const [otherList, setOtherList] = useState<NoteListType[]>([]);

  const filterPinnedList = filterSectionList(pinnedList, filter);
  const filterOtherList = filterSectionList(otherList, filter);

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

    updateIdxList(currentUser.uid, [...pinnedList.map((_) => _.id), ...otherList.map((_) => _.id)], noteIdxList.id);
  }, [pinnedList, otherList, canUpdate]);

  useEffect(() => {
    return () => clearTimeout(timeoutId);
  });

  return (
    <div className="mx-auto my-16 max-w-[100rem] pb-12 lgmb:w-[calc(100%-4rem)]">
      {!filterPinnedList.length && !filterOtherList.length && (
        <div className="typo m-4 w-full p-8 text-center font-bold">{t('no note')}</div>
      )}

      {!!filterPinnedList.length && (
        <div className="typo mx-auto mb-8 w-max text-center font-semibold">
          {t('pinned')}
          <GradientUnderline />
        </div>
      )}
      <ReactSortable
        {...sortableConfig}
        group="notes-pinned"
        list={pinnedList}
        setList={setPinnedList}
        onMove={onMoveHandle}
        onEnd={onEndHandle}
      >
        {!!filterPinnedList.length &&
          filterPinnedList.map((item) => (
            <div key={item.id}>
              <NoteItem viewMode={viewMode} isShow={item.isShow} note={item} />
            </div>
          ))}
      </ReactSortable>

      {!!filterOtherList.length && (
        <div className="typo mx-auto mb-8 mt-[3rem] w-max text-center font-semibold">
          {t('others')}
          <GradientUnderline />
        </div>
      )}
      <ReactSortable
        {...sortableConfig}
        group="notes-others"
        list={otherList}
        setList={setOtherList}
        onMove={onMoveHandle}
        onEnd={onEndHandle}
      >
        {!!filterOtherList.length &&
          filterOtherList.map((item) => (
            <div key={item.id}>
              <NoteItem viewMode={viewMode} isShow={item.isShow} note={item} />
            </div>
          ))}
      </ReactSortable>
    </div>
  );
};

export default memo(NoteSection);
