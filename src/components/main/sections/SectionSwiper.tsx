import { FC, useMemo } from 'react';
import { A11y } from 'swiper';
import { Swiper as ReactSwiper, SwiperProps, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ScoreCard } from './score/ScoreCard';

export const SectionSwiper: FC = () => {
	const swiperOptions = useMemo<SwiperProps>(
		() => ({
			modules: [A11y],
			centeredSlides: true,
			slideToClickedSlide: true,
			breakpoints: {
				1224: { slidesPerView: 4 },
				780: { slidesPerView: 3 },
				550: { slidesPerView: 2 },
				0: { slidesPerView: 1 },
			},
			onSlideChange: ({ activeIndex }) => console.log(activeIndex),
		}),
		[]
	);

	return (
		<div className='mt-4 p-4 w-full h-[15rem] rounded-[2rem]'>
			<ReactSwiper {...swiperOptions} className='flex items-center w-full h-full'>
				<SwiperSlide>
					<ScoreCard />
				</SwiperSlide>

				<SwiperSlide>
					<ScoreCard />
				</SwiperSlide>

				<SwiperSlide>
					<ScoreCard />
				</SwiperSlide>

				<SwiperSlide>
					<ScoreCard />
				</SwiperSlide>

				<SwiperSlide>
					<ScoreCard />
				</SwiperSlide>

				<SwiperSlide>
					<ScoreCard />
				</SwiperSlide>

				<SwiperSlide>
					<ScoreCard />
				</SwiperSlide>
			</ReactSwiper>
		</div>
	);
};
