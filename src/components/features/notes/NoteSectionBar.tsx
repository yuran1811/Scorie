import { useCollectionQuery } from '@/hooks';
import { db, NoteListFilterType, NoteListType } from '@/shared';
import { useStore } from '@/store';
import { getNoteList } from '@/utils';
import {
  AddIcon,
  ArchiveIcon,
  DoneIcon,
  FlatLoading,
  ImportIcon,
  ListAllIcon,
  ListIcon,
  NoteIcon,
  ProgressIcon,
} from '@cpns/icons';
import { SearchBar, Tooltip } from '@cpns/shared';
import { Title } from '../main/sections/Title';
import { NoteAddNew } from './NoteAddNew';
import NoteImport from './NoteImport';
import NoteSection from './NoteSection';
import Tippy from '@tippyjs/react';
import { collection } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const NoteSectionBar = () => {
  const setNotes = useStore((s) => s.setNotes);
  const currentUser = useStore((s) => s.currentUser);

  const { data, loading, error } = useCollectionQuery(
    'users_notes',
    collection(db, 'users', currentUser?.uid as string, 'notes')
  );

  const [viewMode, setViewMode] = useState('grid');
  const [showImport, setShowImport] = useState(false);
  const [addNewOpen, setAddNewOpen] = useState(false);
  const [noteList, setNoteList] = useState<NoteListType[]>([]);
  const [idxListState, setIdxListState] = useState<string[]>([]);
  const [searchOpts, setSearchOpts] = useState({
    isSearch: false,
    value: '',
  });
  const [filter, setFilter] = useState<NoteListFilterType>({
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

  useEffect(() => {
    setFilter((s) => ({
      ...s,
      searchPattern: searchOpts.isSearch ? searchOpts.value : '',
    }));
  }, [searchOpts]);

  useEffect(() => {
    setNotes &&
      setNotes(
        noteList.map((_) => ({
          ..._.note,
        }))
      );
  }, [noteList, setNotes]);

  return (
    <div className="w-full my-[2rem] mb-[7rem]">
      <div className="w-full flexcenter flex-wrap px-4">
        <Title Icon={NoteIcon} content="Notes" />
        <div className="flexcenter flex-wrap px-6 py-8">
          <Tooltip
            content="Filter done note"
            options={{
              delay: 400,
            }}
          >
            <DoneIcon
              className="cursor-pointer mx-5 my-4"
              fill={!filter.hasDone ? 'white' : '#fcd34d'}
              width="40"
              height="40"
              onClick={() => setFilter((f) => ({ ...f, hasDone: !f.hasDone }))}
            />
          </Tooltip>

          <Tooltip
            content="Filter in progress note"
            options={{
              delay: 400,
            }}
          >
            <ProgressIcon
              className="cursor-pointer mx-5 my-4"
              fill={!filter.hasInProgress ? 'white' : '#38bdf8'}
              width="40"
              height="40"
              onClick={() => setFilter((f) => ({ ...f, hasInProgress: !f.hasInProgress }))}
            />
          </Tooltip>

          <Tooltip
            content="Archived note"
            options={{
              delay: 400,
            }}
          >
            <ArchiveIcon
              className="cursor-pointer mx-5 my-4"
              fill={!filter.hasArchived ? 'white' : '#94a3b8'}
              width="40"
              height="40"
              onClick={() => setFilter((f) => ({ ...f, hasArchived: !f.hasArchived }))}
            />
          </Tooltip>

          <Tooltip
            content="Add note manually"
            options={{
              delay: 400,
            }}
          >
            <AddIcon
              className="cursor-pointer mx-5 my-4"
              fill={'white'}
              width="40"
              height="40"
              onClick={() => setAddNewOpen(true)}
            />
          </Tooltip>

          <div className="relative">
            <Tippy
              interactive
              visible={showImport}
              placement="bottom-end"
              onClickOutside={() => setShowImport(false)}
              render={(attrs) => (
                <NoteImport {...attrs} showImport={showImport} setShowImport={setShowImport} />
              )}
            >
              <div onClick={() => setShowImport(true)}>
                <Tooltip
                  content="Import note"
                  options={{
                    delay: 400,
                  }}
                >
                  <ImportIcon
                    className="cursor-pointer mx-5 my-4"
                    fill={'white'}
                    width="40"
                    height="40"
                  />
                </Tooltip>
              </div>
            </Tippy>
          </div>

          <div className="block tablet:hidden">
            <ListIcon
              className={`${viewMode === 'list' ? 'block' : 'hidden'} cursor-pointer mx-5 my-4`}
              width="40"
              height="40"
              onClick={() => setViewMode('grid')}
            />
            <ListAllIcon
              className={`${viewMode === 'grid' ? 'block' : 'hidden'} cursor-pointer mx-5 my-4`}
              width="40"
              height="40"
              onClick={() => setViewMode('list')}
            />
          </div>
        </div>
      </div>
      <div className="w-full flexcenter px-4">
        <SearchBar
          setSearchOpts={setSearchOpts}
          onChange={(e) => {
            const searchValue = e.currentTarget.value.trim();

            if (searchValue.length === 0)
              setSearchOpts({
                isSearch: false,
                value: '',
              });
            else
              setSearchOpts({
                isSearch: true,
                value: searchValue,
              });
          }}
        />
      </div>

      {loading && (
        <div className="flexcenter w-full h-[10rem]">
          <FlatLoading />
        </div>
      )}

      {!loading && noteList !== null && noteList.length === 0 && (
        <div className="w-full p-8 m-4 font-bold text-[5rem] text-center">No note</div>
      )}

      {!loading && noteList !== null && noteList.length !== 0 && (
        <NoteSection
          viewMode={viewMode}
          filter={filter}
          notes={noteList}
          orderList={idxListState}
        />
      )}

      {addNewOpen && <NoteAddNew onClickHandle={setAddNewOpen} />}
    </div>
  );
};
