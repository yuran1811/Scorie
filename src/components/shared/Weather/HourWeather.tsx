import { getPrettyPrintWeatherCode, getWeatherIcon } from '@/utils';
import { WeatherTimelineType } from '@shared/types';
import { FC } from 'react';
import { A11y, Pagination } from 'swiper/modules';
import { Swiper as ReactSwiper, SwiperProps, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

interface HourWeatherProps {
  data?: WeatherTimelineType;
  showIcons?: boolean;
  showDetail?: boolean;
}

const swiperOptions: SwiperProps = {
  modules: [A11y, Pagination],
  pagination: {
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 4,

    renderBullet: (idx, className) => `<span class="${className} brightness-150 scale-150 bg-gray-200"></span>`,
  },

  freeMode: true,
  spaceBetween: 10,

  breakpoints: {
    // 985: { slidesPerView: 5 },
    640: { slidesPerView: 4 },
    420: { slidesPerView: 3 },
    0: { slidesPerView: 2 },
  },

  on: {},
};

export const HourWeather: FC<HourWeatherProps> = ({ data, showIcons = true, showDetail = true }) => {
  if (!data) return <></>;

  const { intervals } = data;

  return (
    <div className="w-full">
      <ReactSwiper
        {...swiperOptions}
        className="typo-3sm flex h-full w-full flex-row items-center text-ctcolor medtab:max-w-[64rem]"
      >
        {intervals.map(({ startTime, values: { temperature, temperatureApparent, weatherCode, windSpeed } }, idx) => (
          <SwiperSlide key={'' + idx + temperature} className="mb-12 w-[15rem] rounded-xl bg-white px-5 py-3 text-gray-700">
            <div className="typo-2sm pb-2 text-center font-bold">
              {!idx ? 'Now' : new Date(startTime).getHours() + ':00'}
            </div>

            {showIcons && (
              <img
                className="mx-auto block aspect-square w-20"
                src={getWeatherIcon(weatherCode.toString())}
                alt={getPrettyPrintWeatherCode(weatherCode.toString())}
              />
            )}
            <div className="typo-4sm text-center font-semibold">{getPrettyPrintWeatherCode(weatherCode.toString())}</div>

            <div className="flexcenter !justify-between py-2 font-semibold">
              <span className="text-gray-500">{temperature}º</span>
              <span className="text-gray-900">{temperatureApparent}º</span>
            </div>

            {showDetail && (
              <>
                <div className="flex items-center justify-start py-1">
                  <img className="aspect-square w-10" src={getWeatherIcon('wind-speed')} alt="wind-speed" />
                  <span>{windSpeed}</span>
                  <span className="typo-5sm mx-1">m/s</span>
                </div>
              </>
            )}
          </SwiperSlide>
        ))}
      </ReactSwiper>
    </div>
  );
};
