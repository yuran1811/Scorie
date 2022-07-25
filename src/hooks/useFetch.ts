import getAxiosInst from '@shared/axios';
import { useEffect, useState } from 'react';

export const useFetch = <T>(url: string) => {
  const controller = new AbortController();

  const [err, setErr] = useState<any>(null);
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await getAxiosInst().get(url, { signal: controller.signal });
        setData(data);
      } catch (e) {
        setErr(e);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, err, loading, controller };
};
