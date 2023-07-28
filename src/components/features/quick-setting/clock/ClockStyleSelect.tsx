import { useStore } from '@/store';
import { ClockStyles } from '@cpns/shared';
import { A11y, FreeMode, Pagination } from 'swiper/modules';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

const swiperOptions: SwiperProps = {
  modules: [A11y, Pagination, FreeMode],

  pagination: {
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 4,
    renderBullet: (idx, className) => `<span class="${className} brightness-150 scale-150 bg-gray-200"></span>`,
  },
  freeMode: {
    enabled: true,
    sticky: true,
    momentumVelocityRatio: 0.4,
  },

  spaceBetween: 50,

  breakpoints: {
    640: { slidesPerView: 4 },
    420: { slidesPerView: 3 },
    0: { slidesPerView: 2 },
  },
};

const time = 36660000;

export const ClockStyleSelect = () => {
  const clockStyle = useStore((s) => s.clockStyle);
  const setClockStyle = useStore((s) => s.setClockStyle);

  return (
    <div className="mt-48">
      <div className="animate-pulse cursor-pointer text-center font-semibold">Click to change</div>
      <div className="h-[16rem]">
        <Swiper
          {...swiperOptions}
          className="typo-sm container mb-8 flex h-full flex-row items-center text-ctcolor medmb:px-24 medtab:max-w-[64rem]"
        >
          {ClockStyles.map(({ type, name, Component }) => (
            <SwiperSlide
              key={type}
              className="typo-4sm flexcentercol cursor-pointer gap-24"
              onClick={() => setClockStyle({ ...clockStyle, type })}
            >
              <div className="relative left-0 top-0 mx-auto h-[2rem] origin-top scale-[1.6]">
                <Component key={type} timestamp={time} />
              </div>
              <div className="mb-10 text-center font-bold">{name}</div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
