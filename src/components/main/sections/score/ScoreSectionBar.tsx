import { AddIcon, HashtagIcon, IgnoreIcon, ImportantIcon, StarIcon } from 'components/icons';
import { AddButton } from 'components/main/sections/score/AddButton';
import { ScoreDetailProvider } from 'contexts';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCollectionQuery } from 'hooks';
import { useMemo, useState } from 'react';
import { db } from 'shared';
import { useStore } from 'store';
import { standardizeScores } from 'utils';
import { SectionSwiper } from '../SectionSwiper';
import { Title } from '../Title';
import { ScoreAddNew } from './ScoreAddNew';
import { ScoreCard } from './ScoreCard';

export const ScoreSectionBar = () => {
	const currentUser = useStore((s) => s.currentUser);

	const [addNewOpen, setAddNewOpen] = useState(false);
	const [filter, setFilter] = useState({
		hasVital: false,
		hasSpecial: false,
		hasIgnored: false,
	});

	const { data } = useCollectionQuery(
		'scores_tmp',
		query(collection(db, 'users', currentUser?.uid as string, 'scores'), orderBy('createdAt'))
	);

	const scores = useMemo(() => standardizeScores(data), [data]);
	const scoreList = useMemo(() => {
		if (!filter.hasVital && !filter.hasSpecial) return scores;

		return scores.filter((score) => {
			if (filter.hasSpecial && filter.hasVital) return score.isSpecial && score.isVital;
			if (filter.hasVital) return score.isVital && !score.isSpecial;
			if (filter.hasSpecial) return score.isSpecial;
		});
	}, [filter, data]);

	return (
		<div className='w-full my-[2rem] mb-[7rem]'>
			<AddButton />

			<div className='w-full flexcenter flex-wrap'>
				<Title Icon={HashtagIcon} content='Score' />
				<div className='flexcenter px-6 py-8'>
					<StarIcon
						className='cursor-pointer mx-5'
						fill={!filter.hasSpecial ? 'white' : '#fcd34d'}
						width='50'
						height='50'
						onClick={() => setFilter((f) => ({ ...f, hasSpecial: !f.hasSpecial }))}
					/>
					<ImportantIcon
						className='cursor-pointer mx-5'
						fill={!filter.hasVital ? 'white' : '#38bdf8'}
						width='50'
						height='50'
						onClick={() => setFilter((f) => ({ ...f, hasVital: !f.hasVital }))}
					/>
					<IgnoreIcon
						className='cursor-pointer mx-5'
						fill={!filter.hasIgnored ? 'white' : '#0891b2'}
						width='50'
						height='50'
						onClick={() => setFilter((f) => ({ ...f, hasIgnored: !f.hasIgnored }))}
					/>

					<AddIcon
						className='cursor-pointer mx-5'
						fill={'white'}
						width='50'
						height='50'
						onClick={() => setAddNewOpen(true)}
					/>
				</div>
			</div>

			<div className='font-semibold text-[3rem] text-white text-center italic p-4 mt-4'>
				{scoreList.length} records found
			</div>

			<ScoreDetailProvider>
				<SectionSwiper
					type='/scores'
					Slide={ScoreCard}
					slideChilds={scoreList}
					breakpoints={{
						1080: { slidesPerView: 3 },
						640: { slidesPerView: 2 },
						0: { slidesPerView: 1 },
					}}
				/>
			</ScoreDetailProvider>

			{addNewOpen && <ScoreAddNew onClickHandle={setAddNewOpen} scores={scores} />}
		</div>
	);
};
