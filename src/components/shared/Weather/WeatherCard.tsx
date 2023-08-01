import { WeatherIntervalType } from '@/shared';
import {
  classnames,
  formatWeekDay,
  getPrettyPrintWeatherCode,
  getSunTime,
  getUVInfo,
  getWeatherIcon,
  uvStyle,
} from '@/utils';
import { FC } from 'react';
import { WeatherPanelSettingsType } from '.';

interface WeatherCardProps {
  type: 'hourly' | 'daily' | 'current';
  idx: number;
  settings: WeatherPanelSettingsType;
  data: WeatherIntervalType;
}

export const WeatherCard: FC<WeatherCardProps> = ({
  type,
  idx,
  settings: { showMoreInfo, showIcon },
  data: {
    startTime,
    values: {
      epaIndex,
      humidity,
      moonPhase,
      pressureSurfaceLevel,
      sunriseTime,
      sunsetTime,
      temperature,
      temperatureApparent,
      uvIndex,
      weatherCode,
      windSpeed,
    },
  },
}) => {
  const time = !idx ? 'Now' : new Date(startTime).getHours() + ':00';
  const day = !idx ? 'Today' : formatWeekDay(startTime);

  // const moonSrc = getMoonIcon(moonPhase);
  const humiditySrc = getWeatherIcon('humidity');
  const pressureSrc = getWeatherIcon('pressure');
  const uvindexSrc = getWeatherIcon('uvindex');
  const weatherSrc = getWeatherIcon(weatherCode.toString());
  const windSrc = getWeatherIcon('wind');
  const prettyCode = getPrettyPrintWeatherCode(weatherCode.toString());

  return (
    <>
      {type !== 'current' && (
        <div className="typo-3sm pb-2 text-center font-bold capitalize">{type === 'daily' ? day : time}</div>
      )}

      {showIcon && (
        <img
          className={classnames('mx-auto block aspect-square', type !== 'current' ? 'w-20' : 'w-44')}
          src={weatherSrc}
          alt={prettyCode}
        />
      )}
      <div className={classnames('text-center font-bold', type !== 'current' ? 'typo-4sm' : 'typo')}>{prettyCode}</div>

      {type !== 'current' ? (
        <div className="flexcenter !justify-evenly py-2 font-bold">
          <span className="text-gray-500">{temperature}º</span>
          <span className="text-gray-900">{temperatureApparent}º</span>
        </div>
      ) : (
        <div className="flexcenter !justify-evenly py-2 font-bold">
          <div className="flexcentercol">
            <span className="font-semibold">Temp</span>
            <span className="text-gray-500">{temperature}º</span>
          </div>
          <div className="flexcentercol">
            <span className="font-semibold">Feel likes</span>
            <span className="text-gray-900">{temperatureApparent}º</span>
          </div>
        </div>
      )}

      {type !== 'hourly' && (
        <div className="my-2 flex items-center justify-around border-y-2 px-3 py-2 font-semibold">
          <div className="flexcentercol">
            <img className="aspect-square w-10" src={getWeatherIcon('sunrise')} alt="sunrise_icon" />
            <span className="text-gray-900">{getSunTime(sunriseTime)}</span>
          </div>
          <div className="flexcentercol">
            <img className="aspect-square w-10" src={getWeatherIcon('sunset')} alt="sunset_icon" />
            <span className="text-gray-900">{getSunTime(sunsetTime)}</span>
          </div>
        </div>
      )}

      {showMoreInfo && (
        <div className={classnames('w-full', type === 'current' && 'grid grid-cols-2 grid-rows-2')}>
          {/* <div className="flex items-center justify-start py-1">
            <img className="mr-2 aspect-square w-9" src={moonSrc} alt="moonphase" />
          </div> */}
          <div className="flex items-center justify-start truncate text-clip py-1">
            <img className="mr-2 aspect-square w-9" src={uvindexSrc} alt="uvindex" />
            <span>{uvIndex}</span>
            <span className="mx-2">&middot;</span>
            <span className="typo-5sm h-full rounded-xl px-2 py-1 font-semibold" style={uvStyle[getUVInfo(uvIndex)]}>
              {getUVInfo(uvIndex)}
            </span>
          </div>
          <div className="flex items-center justify-start py-1">
            <img className="mr-2 aspect-square w-9" src={windSrc} alt="wind-speed" />
            <p>
              <span>{windSpeed}</span>
              <span className="typo-5sm mx-1">m/s</span>
            </p>
          </div>
          <div className="flex items-center justify-start py-1">
            <img className="mr-2 aspect-square w-9" src={humiditySrc} alt="humidity" />
            <p>
              <span>{humidity}</span>
              <span className="typo-5sm mx-1">%</span>
            </p>
          </div>
          <div className="flex items-center justify-start py-1">
            <img className="mr-2 aspect-square w-9" src={pressureSrc} alt="air_pressure" />
            <p>
              <span>{pressureSurfaceLevel}</span>
              <span className="typo-5sm mx-1">hPa</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};
