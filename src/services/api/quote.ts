import { QuoteType } from '@/hooks';
import { QuoteListType } from '@/shared';
import getAxiosInst from '@shared/axios';
import { AxiosError, AxiosRequestConfig } from 'axios';

const { root, tags, maxLength } = {
  root: 'https://api.quotable.io',
  maxLength: 180,
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
    const data: QuoteType = await getAxiosInst().get(
      `${root}/random?tags=${tags.join('|')}&maxLength=${maxLength}`
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
      `${root}/quotes?tags=${tags.join('|')}&maxLength=${maxLength}&page=${page + 1}`
    );
    return { data, err: '' };
  } catch (error) {
    const err = error as AxiosError;
    return { data: null, err: err.message };
  }
};
