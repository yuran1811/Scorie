import { WeatherTimelineType } from '@/shared';
import { FC } from 'react';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { WeatherCard, WeatherPanelSettingsType } from '.';

import 'swiper/css';

interface DayWeatherProps {
  data?: WeatherTimelineType;
  settings?: WeatherPanelSettingsType;
}

const swiperOptions: SwiperProps = {
  centeredSlides: true,
  centeredSlidesBounds: false,
  spaceBetween: 12,
  breakpoints: {
    540: { slidesPerView: 3 },
    380: { slidesPerView: 2 },
    0: { slidesPerView: 1 },
  },
};

export const DayWeather: FC<DayWeatherProps> = ({ data, settings = { showIcon: true, showMoreInfo: true } }) => {
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
            <WeatherCard type="daily" idx={idx} settings={settings} data={{ values, startTime }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
