import { getWeather } from '@/services';
import { GeoLocationType, WeatherDataType } from '@/shared';
import { useEffect, useState } from 'react';

export const useWeather = (isFetch: boolean, { lat, lon }: GeoLocationType) => {
  const controller = new AbortController();

  const [data, setData] = useState<WeatherDataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isFetch || !lat.length || !lon.length) return;

    setLoading(true);
    getWeather({ lon, lat }, { signal: controller.signal })
      .then((resp) => {
        const { data, err } = resp;

        if (err || !data) {
          setData(data || null);
          setError(!!err);
          return;
        }

        setData(data);
        setError(false);
      })
      .catch((err) => {
        console.log(err);
        setData(null);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => controller.abort();
  }, [lon, lat, isFetch]);

  return { loading, error, data, controller };
};
