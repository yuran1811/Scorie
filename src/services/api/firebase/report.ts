import { db } from '@/shared';
import { FirebaseError } from 'firebase/app';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export const addNewReport = async (userId: string, data: { title: string; content: string }) => {
  try {
    await addDoc(collection(db, 'reports'), {
      ...data,
      userId,
      createdAt: serverTimestamp() || new Date(),
    });
    return '';
  } catch (error) {
    return (error as FirebaseError).message;
  }
};
