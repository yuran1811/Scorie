import { IgnoreIcon, ImportantIcon, StarIcon } from 'components/icons';
import { useScoreDetail } from 'contexts';
import { FC, useMemo } from 'react';
import { A11y } from 'swiper';
import { Swiper as ReactSwiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { ScoreCardProps } from 'types';
import { MAX_SCORE_RECENT_LTH } from '../../../../constants';

export const ScoreCard: FC<ScoreCardProps> = ({ data }) => {
	const { isVital, isSpecial, isIgnored, subject, scores } = data;

	const swiperOptions = useMemo<SwiperProps>(
		() => ({
			modules: [A11y],
			centeredSlides: false,
			breakpoints: { 0: { slidesPerView: 3 } },
			onSlideChange: ({ activeIndex }) => {},
		}),
		[]
	);
	const averageScore = useMemo(() => {
		return scores.reduce(
			(prevValue, score) => {
				if (score.isIgnored) return prevValue;
				return { total: prevValue.total + score.base * score.value, count: prevValue.count + score.base };
			},
			{ total: 0, count: 0 }
		);
	}, [scores]);

	const { setViewDetail } = useScoreDetail();

	return (
		<>
			<div
				className='cursor-pointer tablet:max-w-[25rem] w-full p-4 rounded-[2.5rem] font-bold text-center text-rose-700 bg-violet-200'
				onClick={() => setViewDetail && setViewDetail({ data, isOpened: true })}
			>
				<div className='flexcenter p-4'>
					<StarIcon className='mx-4' fill={!isSpecial ? 'white' : '#d97706'} width='40' height='40' />
					<ImportantIcon className='mx-4' fill={!isVital ? 'white' : '#57534e'} width='40' height='40' />
					<IgnoreIcon className='mx-4' fill={!isIgnored ? 'white' : '#0891b2'} width='40' height='40' />
				</div>

				<div className='flexcentercol'>
					<div className='font-bold text-[3.5rem] text-center text-teal-700 w-full line-clamp-1'>{subject}</div>
					<div className='font-bold text-[5rem] text-center text-red-600 w-full line-clamp-1'>
						{(averageScore.total / averageScore.count).toFixed(2)}
					</div>

					<div className='font-bold text-[3.5rem] text-slate-800 text-left w-full px-8 line-clamp-1'>Recents</div>
					<ReactSwiper {...swiperOptions} className='flex items-center w-full text-sky-700'>
						{scores.slice(-MAX_SCORE_RECENT_LTH).map((_) => (
							<SwiperSlide key={_.id}>
								<div className='w-[7rem] h-[6rem] p-3 text-center'>{_.value}</div>
							</SwiperSlide>
						))}
						{scores.length > MAX_SCORE_RECENT_LTH && (
							<SwiperSlide>
								<div className='w-[7rem] h-[6rem] p-3 text-center'>...</div>
							</SwiperSlide>
						)}
					</ReactSwiper>
				</div>
			</div>
		</>
	);
};
