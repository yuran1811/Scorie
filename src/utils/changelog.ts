import { ChangeLogProps } from '@/shared';
import { standardizeCollectionData } from './standardize';

export const getChangeLogs = (data: any) => {
  if (data === null) return [];

  const resp = standardizeCollectionData(data) as ChangeLogProps[];
  if (!resp.length) return [];

  return resp;
};
