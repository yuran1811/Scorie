import { useStore } from 'store';
import { useCollectionQuery } from 'hooks';
import { filterScoreList, standardizeCollectionData } from 'utils';
import { db, SubjectDetailType, SubjectListFilterType } from 'shared';
import { AddButton } from './AddButton';
import { SubjectCard } from './SubjectCard';
import { Title } from '../main/sections/Title';
import { SubjectAddNew } from './SubjectAddNew';
import { SubjectAverage } from './SubjectAverage';
import { ScoreSubjectAddNew } from './ScoreSubjectAddNew';
import { SearchBar } from 'components/shared';
import { AddIcon, FlatLoading, HashtagIcon, IgnoreIcon, ImportantIcon, StarIcon } from 'components/icons';
import { collection, orderBy, query } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';

export const ScoreSectionBar = () => {
	const setScores = useStore((s) => s.setScores);
	const currentUser = useStore((s) => s.currentUser);

	const { data, loading } = useCollectionQuery(
		'users_subjects',
		query(collection(db, 'users', currentUser?.uid as string, 'subjects'), orderBy('updatedAt', 'desc'))
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
		<div className='w-full my-[2rem] mb-[7rem]'>
			<AddButton onClick={() => setAddNewSSOpen(true)} />

			<SubjectAverage subjects={subjects.map((_) => _.subject)} />

			<div className='w-full flexcenter flex-wrap px-4'>
				<Title Icon={HashtagIcon} content='Score' />
				<div className='flexcenter flex-wrap px-6 py-8'>
					<StarIcon
						className='cursor-pointer mx-5 my-4'
						fill={!filter.hasSpecial ? 'white' : '#fcd34d'}
						width='40'
						height='40'
						onClick={() => setFilter((f) => ({ ...f, hasSpecial: !f.hasSpecial }))}
					/>
					<ImportantIcon
						className='cursor-pointer mx-5 my-4'
						fill={!filter.hasVital ? 'white' : '#38bdf8'}
						width='40'
						height='40'
						onClick={() => setFilter((f) => ({ ...f, hasVital: !f.hasVital }))}
					/>
					<IgnoreIcon
						className='cursor-pointer mx-5 my-4'
						fill={!filter.hasIgnored ? 'white' : '#0891b2'}
						width='40'
						height='40'
						onClick={() => setFilter((f) => ({ ...f, hasIgnored: !f.hasIgnored }))}
					/>

					<AddIcon
						className='cursor-pointer mx-5 my-4'
						fill={'white'}
						width='40'
						height='40'
						onClick={() => setAddNewOpen(true)}
					/>
				</div>
			</div>
			<div className='w-full flexcenter px-4'>
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

			{loading ? (
				<div className='flexcenter w-full h-[10rem]'>
					<FlatLoading />
				</div>
			) : (
				<div className='mx-auto mt-4 p-4 max-w-[100rem] w-full rounded-[2rem]'>
					<div className='flex flex-wrap justify-center items-start w-full'>
						{filterScoreList(subjects, filter).map((item) => (
							<SubjectCard key={item.id} isShow={item.isShow} subject={item} />
						))}
					</div>
				</div>
			)}

			{addNewOpen && <SubjectAddNew subjects={subjects} onClickHandle={() => setAddNewOpen(false)} />}
			{addNewSSOpen && <ScoreSubjectAddNew subjects={subjects} onClick={() => setAddNewSSOpen(false)} />}
		</div>
	);
};
