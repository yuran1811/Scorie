import { db } from '@shared/firebase';
import { FirebaseError } from 'firebase/app';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export const addNewReport = async (userId: string, data: { title: string; content: string }) => {
  try {
    await addDoc(collection(db, 'reports', userId), { ...data, createdAt: serverTimestamp() });
    return '';
  } catch (error) {
    return (error as FirebaseError).message;
  }
};
