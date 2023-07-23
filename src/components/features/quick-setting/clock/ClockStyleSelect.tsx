import { useStore } from '@/store';
import { ClockStyles } from '@cpns/shared';
import { A11y, Navigation } from 'swiper/modules';
import { Swiper as ReactSwiper, SwiperProps, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

const swiperOptions: SwiperProps = {
  modules: [A11y, Navigation],
  navigation: {
    // nextEl: '.swiper-button-next',
    // prevEl: '.swiper-button-prev',
  },

  centeredSlides: true,
  centeredSlidesBounds: true,
  spaceBetween: 50,

  breakpoints: {
    640: { slidesPerView: 4 },
    420: { slidesPerView: 3 },
    0: { slidesPerView: 2 },
  },

  on: {},
};

const time = 36660000;

export const ClockStyleSelect = () => {
  const clockStyle = useStore((s) => s.clockStyle);
  const setClockStyle = useStore((s) => s.setClockStyle);

  return (
    <div className="mt-48">
      <div className="animate-pulse cursor-pointer text-center font-semibold">Click to change</div>
      <div className="h-[15rem]">
        <ReactSwiper
          {...swiperOptions}
          className="typo-sm container flex h-full flex-row items-center text-ctcolor medmb:px-24 medtab:max-w-[64rem]"
        >
          {ClockStyles.map(({ type, name, Component }) => (
            <SwiperSlide
              key={type}
              className="typo-3sm flexcentercol cursor-pointer gap-24"
              onClick={() => setClockStyle({ ...clockStyle, type })}
            >
              <div className="relative left-0 top-0 mx-auto h-[3rem] origin-top scale-[2]">
                <Component key={type} timestamp={time} />
              </div>
              <div className="text-center font-bold">{name}</div>
            </SwiperSlide>
          ))}
        </ReactSwiper>
      </div>
    </div>
  );
};
