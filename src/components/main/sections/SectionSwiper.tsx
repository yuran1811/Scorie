import { FC, useMemo } from 'react';
import { A11y, SwiperOptions } from 'swiper';
import { Swiper as ReactSwiper, SwiperProps, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface SectionSwiperProps {
	Slide: FC<any>;
	slideChilds: any[];
	breakpoints?: {
		[width: number]: SwiperOptions;
		[ratio: string]: SwiperOptions;
	};
}

export const SectionSwiper: FC<SectionSwiperProps> = ({ Slide, breakpoints, slideChilds }) => {
	const swiperOptions = useMemo<SwiperProps>(
		() => ({
			modules: [A11y],
			threshold: 45,
			centeredSlides: true,
			slideToClickedSlide: true,
			breakpoints: breakpoints || {
				1080: { slidesPerView: 3 },
				640: { slidesPerView: 2 },
				0: { slidesPerView: 1 },
			},
			onSlideChange: ({ activeIndex }) => {},
		}),
		[]
	);

	return (
		<>
			{slideChilds.length ? (
				<div className='mx-auto mt-4 p-4 max-w-[100rem] w-full rounded-[2rem]'>
					<ReactSwiper {...swiperOptions} className='flex items-center w-full'>
						{slideChilds.map((_) => (
							<SwiperSlide key={_.id}>
								<Slide data={_} />
							</SwiperSlide>
						))}
					</ReactSwiper>
				</div>
			) : (
				''
			)}
		</>
	);
};
