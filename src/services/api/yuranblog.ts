import { YURAN_BLOG_URL } from '@/shared';
import getAxiosInst from '@shared/axios';
import { AxiosError } from 'axios';

export const getRecentPosts = async () => {
  try {
    const data: any = await getAxiosInst().get(`${YURAN_BLOG_URL}/api/recent-posts`);
    return data;
  } catch (error) {
    const err = error as AxiosError;
    console.error(err.message);
    return {};
  }
};
