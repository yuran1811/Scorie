import { getFirebaseErr } from '@/utils';
import { db } from '@shared/firebase';
import { FirebaseError } from 'firebase/app';
import { doc, getDoc } from 'firebase/firestore';

export * from './feedback';
export * from './notes';
export * from './notification';
export * from './report';
export * from './scores';
export * from './users';

export const getChangeLogs = async () => {
  try {
    const resp = await getDoc(doc(db, 'change_logs'));

    return {
      data: resp,
      errorMessage: '',
    };
  } catch (error) {
    const err = error as FirebaseError;
    return {
      data: null,
      errorMessage: getFirebaseErr(err.message),
    };
  }
};
