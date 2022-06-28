import { FC } from 'react';
import { Link } from 'react-router-dom';
import { A11y, SwiperOptions } from 'swiper';
import { Swiper as ReactSwiper, SwiperProps, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface SectionSwiperProps {
	type?: string;
	Slide: FC<any>;
	slideChilds: any[];
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
		1080: { slidesPerView: 3 },
		640: { slidesPerView: 2 },
		0: { slidesPerView: 1 },
	},
	onSlideChange: ({ activeIndex }) => {},
};

export const SectionSwiper: FC<SectionSwiperProps> = ({ Slide, slideChilds, type }) => (
	<>
		{slideChilds.length ? (
			<div className='mx-auto mt-4 p-4 max-w-[100rem] w-full rounded-[2rem]'>
				<ReactSwiper {...swiperOptions} className='flex items-center w-full'>
					{slideChilds.map((_) => (
						<SwiperSlide key={_.id}>
							<Link to={`${type || ''}/${_.id}`}>
								<Slide data={_} />
							</Link>
						</SwiperSlide>
					))}
				</ReactSwiper>
			</div>
		) : (
			''
		)}
	</>
);
