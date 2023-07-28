import { FC } from 'react';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperProps } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface SectionSwiperProps {
  list: { _id: string; children: any }[];
  breakpoints?: {
    [width: number]: SwiperOptions;
    [ratio: string]: SwiperOptions;
  };
  Slide: any;
}

const swiperOptions: SwiperProps = {
  modules: [Navigation, Pagination, A11y],

  navigation: true,
  pagination: { clickable: true },

  centeredSlides: true,
  slideToClickedSlide: true,

  breakpoints: {
    1500: { slidesPerView: 3 },
    750: { slidesPerView: 2 },
    0: { slidesPerView: 1 },
  },
};

export const SectionSwiper: FC<SectionSwiperProps> = ({ list, breakpoints, Slide }) => (
  <Swiper
    {...swiperOptions}
    breakpoints={breakpoints}
    className="flex w-full items-center"
    onSwiper={(swiper) => {}}
    onSlideChange={() => {}}
  >
    {list.map(({ _id, children }) => (
      <Slide key={_id}>{children}</Slide>
    ))}
  </Swiper>
);
