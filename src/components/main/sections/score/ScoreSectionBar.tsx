import { AddIcon, HashtagIcon, IgnoreIcon, ImportantIcon, StarIcon } from 'components/icons';
import { ScoreDetailProvider, useAuthData } from 'contexts';
import { useMemo, useState } from 'react';
import { SectionSwiper } from '../SectionSwiper';
import { Title } from '../Title';
import { ScoreAddNew } from './ScoreAddNew';
import { ScoreCard } from './ScoreCard';
import { ScoreDetail } from './ScoreDetail';

export const ScoreSectionBar = () => {
	const {
		data: { scores },
	} = useAuthData();

	const [filter, setFilter] = useState({
		hasVital: false,
		hasSpecial: false,
		hasIgnored: false,
	});

	const [addNewOpen, setAddNewOpen] = useState(false);

	const scoreList = useMemo(() => {
		if (!filter.hasVital && !filter.hasSpecial) return scores;

		return scores.filter((score) => {
			if (filter.hasSpecial && filter.hasVital) return score.isSpecial && score.isVital;
			if (filter.hasVital) return score.isVital && !score.isSpecial;
			if (filter.hasSpecial) return score.isSpecial;
		});
	}, [filter, scores]);

	return (
		<div className='w-full my-[2rem] mb-[7rem]'>
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
					Slide={ScoreCard}
					slideChilds={scoreList}
					breakpoints={{
						1080: { slidesPerView: 3 },
						640: { slidesPerView: 2 },
						0: { slidesPerView: 1 },
					}}
				/>
				<ScoreDetail />
			</ScoreDetailProvider>

			{addNewOpen && <ScoreAddNew onClickHandle={setAddNewOpen} />}
		</div>
	);
};
