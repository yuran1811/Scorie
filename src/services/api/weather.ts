import { GeoLocationType, WeatherDataType } from '@/shared';
import { formatTimeForWeather } from '@/utils';
import getAxiosInst from '@shared/axios';
import { AxiosError, AxiosRequestConfig } from 'axios';
import queryString from 'query-string';

const {
  root: r2,
  key,
  lang,
  units: u2,
  include,
} = {
  root: 'https://api.weatherbit.io/v2.0/current',
  key: import.meta.env.VITE_WEATHER_WEATHERBIT_API_KEY,
  lang: 'en',
  units: '',
  include: [''],
};

const { root, apikey, units, timezone, timesteps, fields } = {
  root: 'https://api.tomorrow.io/v4/timelines',
  apikey: import.meta.env.VITE_WEATHER_TOMORROW_API_KEY,
  units: 'metric',
  timezone: 'America/New_York',
  timesteps: ['current', '1h', '1d'],
  fields: [
    'temperature',
    'temperatureApparent',
    'weatherCode',
    'weatherCodeFullDay',
    'windSpeed',
    // 'cloudBase',
    // 'cloudCeiling',
    // 'cloudCover',
    // 'precipitationIntensity',
    // 'precipitationType',
    // 'windDirection',
    // 'windGust',
  ],
};

export const getWeather = async ({ lat, lon }: GeoLocationType, config: AxiosRequestConfig = {}) => {
  try {
    const { data } = await getAxiosInst().get<any, { data: WeatherDataType }>(
      `${root}?${queryString.stringify(
        {
          location: [lat, lon],
          apikey,
          units,
          fields,
          timesteps,
          timezone,
          ...formatTimeForWeather(),
        },
        { arrayFormat: 'comma' }
      )}`
    );

    return { data, err: '' };
  } catch (error) {
    const err = error as AxiosError;
    return { data: null, err: err.message };
  }
};
