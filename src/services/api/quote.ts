import { QuoteListType, QuoteType } from '@/shared';
import getAxiosInst from '@shared/axios';
import { AxiosError, AxiosRequestConfig } from 'axios';
import queryString from 'query-string';

const { root, tags, maxLength } = {
  root: 'https://api.quotable.io',
  maxLength: 190,
  tags: [
    'education',
    'courage',
    'faith',
    'famous-quotes',
    'freedom',
    'friendship',
    'future',
    'happiness',
    'inspirational',
    'life',
    'motivational',
    'power-quotes',
    'success',
    'time',
  ],
};

export const getRandomQuote = async (config: AxiosRequestConfig = {}) => {
  try {
    const data: Pick<QuoteType, 'author' | 'content'> = await getAxiosInst().get(
      `${root}/random?${queryString.stringify(
        {
          maxLength,
          tags,
        },
        { arrayFormat: 'separator', arrayFormatSeparator: '|' }
      )}`
    );
    return data;
  } catch (error) {
    const err = error as AxiosError;
    console.error(err.message);
    return {};
  }
};

export const getQuotes = async (page: number, config: AxiosRequestConfig = {}) => {
  try {
    const data = await getAxiosInst().get<any, QuoteListType>(
      `${root}/quotes?${queryString.stringify(
        {
          maxLength,
          tags,
          page: page + 1,
        },
        { arrayFormat: 'separator', arrayFormatSeparator: '|' }
      )}`
    );
    return { data, err: '' };
  } catch (error) {
    const err = error as AxiosError;
    return { data: null, err: err.message };
  }
};
