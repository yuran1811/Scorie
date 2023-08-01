import { WeatherTimelineType } from '@/shared';
import { FC } from 'react';
import { A11y, FreeMode, Pagination } from 'swiper/modules';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { WeatherCard, WeatherPanelSettingsType } from '.';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

interface HourWeatherProps {
  data?: WeatherTimelineType;
  settings?: WeatherPanelSettingsType;
}

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
    momentumVelocityRatio: 0.4,
  },

  spaceBetween: 10,

  breakpoints: {
    640: { slidesPerView: 4 },
    480: { slidesPerView: 3 },
    300: { slidesPerView: 2 },
    0: { slidesPerView: 1 },
  },
};

export const HourWeather: FC<HourWeatherProps> = ({ data, settings = { showIcon: true, showMoreInfo: true } }) => {
  if (!data) return <></>;

  const { intervals } = data;

  return (
    <div className="w-full">
      <Swiper
        {...swiperOptions}
        className="typo-4sm flex h-full w-full flex-row items-center text-ctcolor medtab:max-w-[64rem]"
      >
        {intervals.map(({ startTime, values }, idx) => (
          <SwiperSlide
            key={'' + idx + values.temperature}
            className="mb-12 w-[15rem] rounded-3xl bg-white px-5 py-3 text-gray-700"
          >
            <WeatherCard type="hourly" idx={idx} settings={settings} data={{ values, startTime }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
