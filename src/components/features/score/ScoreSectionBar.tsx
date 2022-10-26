import { useCollectionQuery } from '@/hooks';
import { db, SubjectDetailType, SubjectListFilterType } from '@/shared';
import { useStore } from '@/store';
import { filterScoreList, standardizeCollectionData } from '@/utils';
import {
  AddIcon,
  BackIcon,
  FlatLoading,
  HashtagIcon,
  IgnoreIcon,
  ImportantIcon,
  StarIcon,
} from '@cpns/icons';
import { SearchBar, Tooltip } from '@cpns/shared';
import { collection } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Title } from '../main/sections/Title';
import { AddButton } from './AddButton';
import { ScoreSubjectAddNew } from './ScoreSubjectAddNew';
import { SubjectAddNew } from './SubjectAddNew';
import { SubjectAverage } from './SubjectAverage';
import { SubjectCard } from './SubjectCard';

export const ScoreSectionBar = () => {
  const setScores = useStore((s) => s.setScores);
  const currentUser = useStore((s) => s.currentUser);

  const navigate = useNavigate();

  const { t } = useTranslation();

  const { data, loading } = useCollectionQuery(
    'users_subjects',
    collection(db, 'users', currentUser?.uid as string, 'subjects')
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
    <div className="my-[2rem] mb-[7rem] w-full">
      <AddButton onClick={() => setAddNewSSOpen(true)} />

      <SubjectAverage subjects={subjects.map((_) => _.subject)} />

      <div className="flexcenter w-full flex-wrap gap-4 px-4">
        <BackIcon className="text-white" onClick={() => navigate(-1)} />
        <Title Icon={HashtagIcon} content="Score" />
        <div className="flexcenter flex-wrap px-6 py-8">
          <Tooltip
            content="Special subject"
            options={{
              delay: 400,
            }}
          >
            <StarIcon
              className="mx-5 my-4 cursor-pointer"
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
              className="mx-5 my-4 cursor-pointer"
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
              className="mx-5 my-4 cursor-pointer"
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
              className="mx-5 my-4 cursor-pointer"
              fill={'white'}
              width="40"
              height="40"
              onClick={() => setAddNewOpen(true)}
            />
          </Tooltip>
        </div>
      </div>
      <div className="flexcenter w-full px-4">
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
        <div className="m-4 w-full p-8 text-center text-[5rem] font-bold">{t('no subject')}</div>
      )}

      {loading ? (
        <div className="flexcenter h-[10rem] w-full">
          <FlatLoading />
        </div>
      ) : (
        <div className="mx-auto mt-4 w-full max-w-[100rem] rounded-[2rem] p-4">
          <div className="flex w-full flex-wrap items-start justify-center">
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
