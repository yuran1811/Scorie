import { FC } from 'react';
import { A11y, SwiperOptions } from 'swiper';
import { Swiper as ReactSwiper, SwiperProps } from 'swiper/react';
import 'swiper/css';

interface SectionSwiperProps {
	breakpoints?: {
		[width: number]: SwiperOptions;
		[ratio: string]: SwiperOptions;
	};
}

const swiperOptions: SwiperProps = {
	modules: [A11y],
	threshold: 45,
	centeredSlides: true,
	slideToClickedSlide: true,
	breakpoints: {
		1500: { slidesPerView: 3 },
		750: { slidesPerView: 2 },
		0: { slidesPerView: 1 },
	},
	onSlideChange: ({ activeIndex }) => console.log(activeIndex),
};

export const SectionSwiper: FC<SectionSwiperProps> = ({ children, breakpoints }) => (
	<ReactSwiper {...swiperOptions} breakpoints={breakpoints} className='flex items-center w-full'>
		{children}
	</ReactSwiper>
);
