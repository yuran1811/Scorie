import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { NoteDetailType, ScoreDetailType, SubjectDetailType } from '@/shared';

type standardizeFuncType = SubjectDetailType | ScoreDetailType | NoteDetailType;

export const standardizeCollectionData = (data: QuerySnapshot<DocumentData> | null) => {
  if (data === null || !data?.docs) return [] as standardizeFuncType[];

  return data.docs.map((doc) => ({ id: doc.id as string, ...doc.data() } as standardizeFuncType));
};
