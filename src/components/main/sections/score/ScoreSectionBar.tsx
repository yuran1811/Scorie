import { AddIcon, FlatLoading, HashtagIcon, IgnoreIcon, ImportantIcon, StarIcon } from 'components/icons';
import { AddButton } from 'components/main/sections/score/AddButton';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCollectionQuery } from 'hooks';
import { useMemo, useState } from 'react';
import { db, SubjectDetailType } from 'shared';
import { useStore } from 'store';
import { SwiperSlide } from 'swiper/react';
import { standardizeCollectionData } from 'utils';
import { SectionSwiper } from '../SectionSwiper';
import { Title } from '../Title';
import { ScoreSubjectAddNew } from './ScoreSubjectAddNew';
import { SubjectAddNew } from './SubjectAddNew';
import { SubjectAverage, SubjectAverageType } from './SubjectAverage';
import { SubjectCard } from './SubjectCard';

export const ScoreSectionBar = () => {
	const currentUser = useStore((s) => s.currentUser);

	const [subjectAverages, setSubjectAverages] = useState<{ [key: string]: SubjectAverageType }>({});
	const [addNewOpen, setAddNewOpen] = useState(false);
	const [addNewSSOpen, setAddNewSSOpen] = useState(false);
	const [filter, setFilter] = useState({
		hasVital: false,
		hasSpecial: false,
		hasIgnored: false,
	});

	const { data, loading } = useCollectionQuery(
		'users_subjects',
		query(collection(db, 'users', currentUser?.uid as string, 'subjects'), orderBy('createdAt', 'desc'))
	);

	const subjects = useMemo(() => standardizeCollectionData(data) as SubjectDetailType[], [data]);
	const subjectList = useMemo(() => {
		if (!filter.hasVital && !filter.hasSpecial) return subjects;

		return subjects.filter((score) => {
			if (filter.hasIgnored) return score.isIgnored && !score.isSpecial && !score.isVital;
			if (filter.hasSpecial && filter.hasVital) return score.isSpecial && score.isVital;
			if (filter.hasVital) return score.isVital && !score.isSpecial;
			if (filter.hasSpecial) return score.isSpecial;
		});
	}, [filter, data]);

	return (
		<div className='w-full my-[2rem] mb-[7rem]'>
			<AddButton onClick={() => setAddNewSSOpen(true)} />

			{/* <SubjectAverage subjectAverages={subjectAverages} /> */}

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
						{subjectList.length} records found
					</div>

					<div className='mx-auto mt-4 p-4 max-w-[100rem] w-full rounded-[2rem]'>
						<SectionSwiper
							breakpoints={{
								1080: { slidesPerView: 3 },
								640: { slidesPerView: 2 },
								0: { slidesPerView: 1 },
							}}
						>
							{subjectList.map((subject) => (
								<SwiperSlide key={subject.id}>
									<SubjectCard subject={subject} setSubjectAverages={setSubjectAverages} />
								</SwiperSlide>
							))}
						</SectionSwiper>
					</div>
				</>
			)}

			{addNewOpen && <SubjectAddNew subjects={subjects} onClickHandle={() => setAddNewOpen(false)} />}
			{addNewSSOpen && <ScoreSubjectAddNew subjects={subjects} onClick={() => setAddNewSSOpen(false)} />}
		</div>
	);
};
