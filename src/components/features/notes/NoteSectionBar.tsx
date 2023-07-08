import { useCollectionQuery } from '@/hooks';
import { db, NoteListFilterType, NoteListType } from '@/shared';
import { useNoteStore, useStore } from '@/store';
import { getNoteList } from '@/utils';
import {
  AddIcon,
  ArchiveIcon,
  BackIcon,
  DoneIcon,
  FlatLoading,
  ImportIcon,
  ListAllIcon,
  ListIcon,
  NoteIcon,
  ProgressIcon,
} from '@cpns/icons';
import { SearchBar, Tooltip } from '@cpns/shared';
import { collection } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Title } from '../main/sections/Title';
import { NoteAddNew } from './NoteAddNew';
import NoteImport from './NoteImport';
import NoteSection from './NoteSection';

export const NoteSectionBar = () => {
  const currentUser = useStore((s) => s.currentUser);
  const setNotes = useNoteStore((s) => s.setNotes);
  const setNoteIdxList = useNoteStore((s) => s.setNoteIdxList);

  const navigate = useNavigate();

  const { t } = useTranslation();

  const { data, loading, error } = useCollectionQuery(
    'users_notes',
    collection(db, 'users', currentUser?.uid as string, 'notes')
  );

  const [viewMode, setViewMode] = useState('grid');
  const [showImport, setShowImport] = useState(false);
  const [addNewOpen, setAddNewOpen] = useState(false);
  const [noteList, setNoteList] = useState<NoteListType[]>([]);
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

    if (rawData?.idxList) setNoteIdxList(rawData.idxList);
    if (rawData?.noteList) setNoteList(rawData.noteList as NoteListType[]);
  }, [data, loading, error]);

  useEffect(() => {
    setFilter((s) => ({ ...s, searchPattern: searchOpts.isSearch ? searchOpts.value : '' }));
  }, [searchOpts]);

  useEffect(() => {
    setNotes(noteList.map((_) => ({ ..._.note })));
  }, [noteList]);

  return (
    <div className="my-[2rem] mb-[7rem] w-full">
      <div className="flexcenter w-full flex-wrap gap-4 px-4">
        <BackIcon className="text-white" onClick={() => navigate(-1)} />
        <Title Icon={NoteIcon} content="Note" />
        <div className="flexcenter flex-wrap px-6 py-8">
          <Tooltip
            content="Filter done note"
            options={{
              delay: 400,
            }}
          >
            <DoneIcon
              className="mx-5 my-4 cursor-pointer"
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
              className="mx-5 my-4 cursor-pointer"
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
              className="mx-5 my-4 cursor-pointer"
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
              className="mx-5 my-4 cursor-pointer"
              fill={'white'}
              width="40"
              height="40"
              onClick={() => setAddNewOpen(true)}
            />
          </Tooltip>

          <div className="relative">
            {showImport && <NoteImport setShowImport={setShowImport} />}
            <div onClick={() => setShowImport(true)}>
              <Tooltip
                content="Import note"
                options={{
                  delay: 400,
                }}
              >
                <ImportIcon className="mx-5 my-4 cursor-pointer" fill={'white'} width="40" height="40" />
              </Tooltip>
            </div>
          </div>

          <div className="block medtab:hidden">
            <ListIcon
              className={`${viewMode === 'list' ? 'block' : 'hidden'} mx-5 my-4 cursor-pointer`}
              width="40"
              height="40"
              onClick={() => setViewMode('grid')}
            />
            <ListAllIcon
              className={`${viewMode === 'grid' ? 'block' : 'hidden'} mx-5 my-4 cursor-pointer`}
              width="40"
              height="40"
              onClick={() => setViewMode('list')}
            />
          </div>
        </div>
      </div>

      <div className="flexcenter w-full px-4">
        <SearchBar
          isHide={!noteList.length}
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
        <div className="flexcenter h-[10rem] w-full">
          <FlatLoading />
        </div>
      )}

      {!loading && !!noteList && !noteList.length && (
        <div className="m-4 w-full p-8 text-center text-2xl font-bold">{t('no note')}</div>
      )}

      {!loading && !!noteList && !!noteList.length && <NoteSection viewMode={viewMode} filter={filter} notes={noteList} />}

      {addNewOpen && <NoteAddNew onClickHandle={setAddNewOpen} />}
    </div>
  );
};
