import { WeatherTimelineType } from '@/shared';
import { FC } from 'react';
import { Swiper as ReactSwiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { WeatherCard, WeatherPanelSettingsType } from '.';

import 'swiper/css';

interface DayWeatherProps {
  data?: WeatherTimelineType;
  settings?: WeatherPanelSettingsType;
}

const swiperOptions: SwiperProps = {
  centeredSlides: true,
  spaceBetween: 15,
  breakpoints: {
    0: { slidesPerView: 3 },
  },
};

export const DayWeather: FC<DayWeatherProps> = ({ data, settings = { showIcon: true, showMoreInfo: true } }) => {
  if (!data) return <></>;

  const { intervals } = data;

  return (
    <div className="w-full">
      <ReactSwiper
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
      </ReactSwiper>
    </div>
  );
};
