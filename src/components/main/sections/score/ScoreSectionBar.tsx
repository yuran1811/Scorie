import { Title } from '../Title';
import { SubjectCard } from './SubjectCard';
import { SubjectAddNew } from './SubjectAddNew';
import { SubjectAverage } from './SubjectAverage';
import { ScoreSubjectAddNew } from './ScoreSubjectAddNew';
import { AddButton } from 'components/main/sections/score/AddButton';
import { AddIcon, FlatLoading, HashtagIcon, IgnoreIcon, ImportantIcon, StarIcon } from 'components/icons';
import { useStore } from 'store';
import { useCollectionQuery } from 'hooks';
import { db, SubjectDetailType } from 'shared';
import { standardizeCollectionData } from 'utils';
import { collection, orderBy, query } from 'firebase/firestore';
import { useMemo, useState } from 'react';

export const ScoreSectionBar = () => {
	const currentUser = useStore((s) => s.currentUser);

	const { data, loading } = useCollectionQuery(
		'users_subjects',
		query(collection(db, 'users', currentUser?.uid as string, 'subjects'), orderBy('updatedAt', 'desc'))
	);

	const [addNewSSOpen, setAddNewSSOpen] = useState(false);
	const [addNewOpen, setAddNewOpen] = useState(false);
	const [filter, setFilter] = useState({
		hasVital: false,
		hasSpecial: false,
		hasIgnored: false,
	});

	const subjects = useMemo(() => {
		const resp = standardizeCollectionData(data) as SubjectDetailType[];
		return resp.map((subject) => ({ isShow: true, subject }));
	}, [data]);

	const subjectList = useMemo(() => {
		if (!filter.hasVital && !filter.hasSpecial && !filter.hasIgnored) {
			subjects.forEach((_) => (_.isShow = true));
			return subjects;
		}

		const list = subjects.filter((item) => {
			if (
				(filter.hasIgnored && item.subject.isIgnored) ||
				(filter.hasSpecial && item.subject.isSpecial) ||
				(filter.hasVital && item.subject.isVital)
			) {
				item.isShow = true;
			} else item.isShow = false;

			return item.isShow;
		});

		return list;
	}, [filter, subjects]);

	return (
		<div className='w-full my-[2rem] mb-[7rem]'>
			<AddButton onClick={() => setAddNewSSOpen(true)} />

			<SubjectAverage subjects={subjects.map((_) => _.subject)} />

			<div className='w-full flexcenter flex-wrap px-4'>
				<Title Icon={HashtagIcon} content='Score' />
				<div className='flexcenter flex-wrap px-6 py-8'>
					<StarIcon
						className='cursor-pointer m-4'
						fill={!filter.hasSpecial ? 'white' : '#fcd34d'}
						width='50'
						height='50'
						onClick={() => setFilter((f) => ({ ...f, hasSpecial: !f.hasSpecial }))}
					/>
					<ImportantIcon
						className='cursor-pointer m-4'
						fill={!filter.hasVital ? 'white' : '#38bdf8'}
						width='50'
						height='50'
						onClick={() => setFilter((f) => ({ ...f, hasVital: !f.hasVital }))}
					/>
					<IgnoreIcon
						className='cursor-pointer m-4'
						fill={!filter.hasIgnored ? 'white' : '#0891b2'}
						width='50'
						height='50'
						onClick={() => setFilter((f) => ({ ...f, hasIgnored: !f.hasIgnored }))}
					/>

					<AddIcon
						className='cursor-pointer m-4'
						fill={'white'}
						width='50'
						height='50'
						onClick={() => setAddNewOpen(true)}
					/>
				</div>
			</div>

			{loading ? (
				<div className='flexcenter w-full h-[10rem]'>
					<FlatLoading />
				</div>
			) : (
				<>
					<div className='font-semibold text-[3rem] text-white text-center italic p-4 mt-4'>
						{subjectList.length} record{subjectList.length > 2 ? 's' : ''} found
					</div>

					<div className='mx-auto mt-4 p-4 max-w-[100rem] w-full rounded-[2rem]'>
						<div className='flex flex-wrap justify-center items-start w-full'>
							{subjects.map((item) => (
								<SubjectCard key={item.subject.id} isShow={item.isShow} subject={item.subject} />
							))}
						</div>
					</div>
				</>
			)}

			{addNewOpen && (
				<SubjectAddNew subjects={subjects.map((_) => _.subject)} onClickHandle={() => setAddNewOpen(false)} />
			)}
			{addNewSSOpen && (
				<ScoreSubjectAddNew subjects={subjects.map((_) => _.subject)} onClick={() => setAddNewSSOpen(false)} />
			)}
		</div>
	);
};
