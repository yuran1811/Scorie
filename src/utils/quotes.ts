import { QuoteListType, QuoteStoreType } from '@/shared';
import __ from 'lodash';

export const mergeQuoteData = (oldData: QuoteStoreType, newData: QuoteListType | null) => {
  if (!newData || !newData?.results) return { canUpdate: false, mergeData: oldData };

  const idSet = __.uniq(__.flattenDeep([__.map(oldData.data, '_id'), __.map(newData.results, '_id')]));

  const dataToMerge = oldData.numPage !== newData.page ? [...oldData.data, ...newData.results] : oldData.data;

  return {
    canUpdate: idSet.length !== oldData.data.length,
    mergeData: {
      data: dataToMerge,
      isFetch: false,
      loading: oldData.loading,
      numPage: idSet.length / 20,
      quoteIdx: oldData.quoteIdx,
    },
  };
};
