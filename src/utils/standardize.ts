import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { NoteDetailType, ScoreDetailType } from 'shared';

export const standardizeScores = (data: QuerySnapshot<DocumentData> | null) => {
	if (data === null || !data?.docs) return [] as ScoreDetailType[];

	return data.docs.map((doc) => ({ id: doc.id as string, ...doc.data() } as ScoreDetailType));
};

export const standardizeNotes = (data: QuerySnapshot<DocumentData> | null) => {
	if (data === null || !data?.docs) return [] as NoteDetailType[];

	return data.docs.map((doc) => ({ id: doc.id as string, ...doc.data() } as NoteDetailType));
};
