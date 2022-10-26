import { getRecentPosts } from '@/services';
import { useEffect, useState } from 'react';

export interface PostType {
  title: string;
  url: string;
}

export const useRecentPosts = () => {
  const controller = new AbortController();

  const [data, setData] = useState<PostType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getRecentPosts()
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
  }, []);

  return { loading, error, data, controller };
};
