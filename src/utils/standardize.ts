import {
  ChangeLogProps,
  NoteDetailType,
  ScoreDetailType,
  SubjectDetailType,
  TestimonialProps,
} from '@/shared';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';

type standardizeFuncType =
  | SubjectDetailType
  | ScoreDetailType
  | NoteDetailType
  | TestimonialProps
  | ChangeLogProps;

export const standardizeCollectionData = (data: QuerySnapshot<DocumentData> | null) => {
  if (data === null || !data?.docs) return [] as standardizeFuncType[];

  return data.docs.map((doc) => ({ id: doc.id as string, ...doc.data() } as standardizeFuncType));
};
