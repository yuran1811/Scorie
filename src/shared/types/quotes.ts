export interface QuoteType {
  _id: string;
  author: string;
  authorSlug: string;
  content: string;
  length: number;
  tags: string[];
}

export interface QuoteListType {
  count: number;
  lastItemIndex: number;
  page: number;
  totalCount: number;
  totalPages: number;
  results: QuoteType[];
}

export interface QuoteStoreType {
  data: QuoteType[];
  isFetch: boolean;
  loading: boolean;
  numPage: number;
  quoteIdx: number;
}
