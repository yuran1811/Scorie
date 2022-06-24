import { HashtagIcon, ImportantIcon, StarIcon } from 'components/icons';
import { ScoreDetailProvider } from 'contexts/ScoreDetailContext';
import { useCallback, useMemo, useState } from 'react';
import { fakeUser } from 'services';
import { SectionSwiper } from '../SectionSwiper';
import { Title } from '../Title';
import { ScoreCard } from './ScoreCard';
import { ScoreDetail } from './ScoreDetail';

export const ScoreSectionBar = () => {
	const { scores } = fakeUser[0];

	const [filter, setFilter] = useState({
		hasVital: false,
		hasSpecial: false,
	});

	const scoreList = useMemo(() => {
		if (!filter.hasVital && !filter.hasSpecial) return scores;

		return scores.filter((score) => {
			if (filter.hasSpecial && filter.hasVital) return score.isSpecial && score.isVital;
			if (filter.hasVital) return score.isVital && !score.isSpecial;
			if (filter.hasSpecial) return score.isSpecial;
		});
	}, [filter]);

	return (
		<div className='w-full my-[2rem] mb-[7rem]'>
			<div className='w-full flexcenter !justify-between'>
				<Title Icon={HashtagIcon} content='Score' />
				<div className='flexcenter'>
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
				</div>
			</div>

			<div className='font-semibold text-[3rem] text-white text-center italic p-4 mt-4'>{scoreList.length} records found</div>

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
		</div>
	);
};
