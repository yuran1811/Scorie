import { FC, PropsWithChildren } from 'react';
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
  centeredSlides: true,
  slideToClickedSlide: true,
  breakpoints: {
    1500: { slidesPerView: 3 },
    750: { slidesPerView: 2 },
    0: { slidesPerView: 1 },
  },
};

export const SectionSwiper: FC<SectionSwiperProps & PropsWithChildren> = ({ children, breakpoints }) => (
  <ReactSwiper {...swiperOptions} breakpoints={breakpoints} className="flex w-full items-center">
    {children}
  </ReactSwiper>
);
