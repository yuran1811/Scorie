import { getQuotes } from '@/services';
import { QuoteListType } from '@/shared';
import { useEffect, useState } from 'react';

export const useQuotes = (page: number, isFetch: boolean) => {
  const controller = new AbortController();

  const [data, setData] = useState<QuoteListType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isFetch) return;

    setLoading(true);
    getQuotes(page, { signal: controller.signal })
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
  }, [page, isFetch]);

  return { loading, error, data, controller };
};
