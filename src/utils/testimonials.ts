import { TestimonialProps } from '@/shared';
import { standardizeCollectionData } from './standardize';

export const getTestimonials = (data: any) => {
  if (data === null) return [];

  const resp = standardizeCollectionData(data) as TestimonialProps[];
  if (!resp.length) return [];

  return resp;
};
