import { GeoLocationType, WeatherDataType } from '@/shared';
import { formatTimeForWeather } from '@/utils';
import getAxiosInst from '@shared/axios';
import { AxiosError, AxiosRequestConfig } from 'axios';
import queryString from 'query-string';

const { root, apikey, units, timezone, timesteps, fields } = {
  root: 'https://api.tomorrow.io/v4/timelines',
  apikey: import.meta.env.VITE_WEATHER_TOMORROW_API_KEY,
  units: 'metric',
  timezone: 'America/New_York',
  timesteps: [
    '1d',
    '1h',
    'current',
  ],
  fields: [
    'epaIndex',
    'humidity',
    'moonPhase',
    'pressureSurfaceLevel',
    'sunriseTime',
    'sunsetTime',
    'temperature',
    'temperatureApparent',
    'uvIndex',
    'weatherCode',
    'weatherCodeFullDay',
    'windSpeed',
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
