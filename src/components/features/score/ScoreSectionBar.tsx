import { useCollectionQuery } from '@/hooks';
import { db, SubjectDetailType, SubjectListFilterType } from '@/shared';
import { useStore } from '@/store';
import { filterScoreList, standardizeCollectionData } from '@/utils';
import {
  AddIcon,
  FlatLoading,
  HashtagIcon,
  IgnoreIcon,
  ImportantIcon,
  StarIcon,
} from '@cpns/icons';
import { SearchBar, Tooltip } from '@cpns/shared';
import { Title } from '../main/sections/Title';
import { AddButton } from './AddButton';
import { ScoreSubjectAddNew } from './ScoreSubjectAddNew';
import { SubjectAddNew } from './SubjectAddNew';
import { SubjectAverage } from './SubjectAverage';
import { SubjectCard } from './SubjectCard';
import { collection, orderBy, query } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';

export const ScoreSectionBar = () => {
  const setScores = useStore((s) => s.setScores);
  const currentUser = useStore((s) => s.currentUser);

  const { data, loading } = useCollectionQuery(
    'users_subjects',
    query(
      collection(db, 'users', currentUser?.uid as string, 'subjects'),
      orderBy('updatedAt', 'desc')
    )
  );

  const [addNewSSOpen, setAddNewSSOpen] = useState(false);
  const [addNewOpen, setAddNewOpen] = useState(false);
  const [searchOpts, setSearchOpts] = useState({
    isSearch: false,
    value: '',
  });
  const [filter, setFilter] = useState<SubjectListFilterType>({
    hasVital: false,
    hasSpecial: false,
    hasIgnored: false,
    searchPattern: '',
  });

  const subjects = useMemo(() => {
    const resp = standardizeCollectionData(data) as SubjectDetailType[];
    setScores(resp);

    const subjectsToUse = resp.map((subject) => ({ isShow: true, subject }));

    return subjectsToUse;
  }, [data]);

  useEffect(() => {
    setFilter((s) => ({
      ...s,
      searchPattern: searchOpts.isSearch ? searchOpts.value : '',
    }));
  }, [searchOpts]);

  return (
    <div className="w-full my-[2rem] mb-[7rem]">
      <AddButton onClick={() => setAddNewSSOpen(true)} />

      <SubjectAverage subjects={subjects.map((_) => _.subject)} />

      <div className="w-full flexcenter flex-wrap px-4">
        <Title Icon={HashtagIcon} content="Score" />
        <div className="flexcenter flex-wrap px-6 py-8">
          <Tooltip
            content="Special subject"
            options={{
              delay: 400,
            }}
          >
            <StarIcon
              className="cursor-pointer mx-5 my-4"
              fill={!filter.hasSpecial ? 'white' : '#fcd34d'}
              width="40"
              height="40"
              onClick={() => setFilter((f) => ({ ...f, hasSpecial: !f.hasSpecial }))}
            />
          </Tooltip>

          <Tooltip
            content="Important subject"
            options={{
              delay: 400,
            }}
          >
            <ImportantIcon
              className="cursor-pointer mx-5 my-4"
              fill={!filter.hasVital ? 'white' : '#38bdf8'}
              width="40"
              height="40"
              onClick={() => setFilter((f) => ({ ...f, hasVital: !f.hasVital }))}
            />
          </Tooltip>

          <Tooltip
            content="Ignored subject"
            options={{
              delay: 400,
            }}
          >
            <IgnoreIcon
              className="cursor-pointer mx-5 my-4"
              fill={!filter.hasIgnored ? 'white' : '#0891b2'}
              width="40"
              height="40"
              onClick={() => setFilter((f) => ({ ...f, hasIgnored: !f.hasIgnored }))}
            />
          </Tooltip>

          <Tooltip
            content="Add new subject"
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

      {!loading && subjects !== null && subjects.length === 0 && (
        <div className="w-full p-8 m-4 font-bold text-[5rem] text-center">No subject</div>
      )}

      {loading ? (
        <div className="flexcenter w-full h-[10rem]">
          <FlatLoading />
        </div>
      ) : (
        <div className="mx-auto mt-4 p-4 max-w-[100rem] w-full rounded-[2rem]">
          <div className="flex flex-wrap justify-center items-start w-full">
            {filterScoreList(subjects, filter).map((item) => (
              <SubjectCard key={item.id} isShow={item.isShow} subject={item} />
            ))}
          </div>
        </div>
      )}

      {addNewOpen && (
        <SubjectAddNew subjects={subjects} onClickHandle={() => setAddNewOpen(false)} />
      )}
      {addNewSSOpen && (
        <ScoreSubjectAddNew subjects={subjects} onClick={() => setAddNewSSOpen(false)} />
      )}
    </div>
  );
};
