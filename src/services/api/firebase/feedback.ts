import { db } from '@shared/firebase';
import { TestimonialProps } from '@shared/types';
import { FirebaseError } from 'firebase/app';
import { arrayRemove, arrayUnion, deleteDoc, doc, increment, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';

export const addNewFeedback = async (userId: string, data: TestimonialProps) => {
  try {
    if (!data.content.length && !data.job.length && !data.name.length) await deleteDoc(doc(db, 'testimonials', userId));
    else
      await setDoc(doc(db, 'testimonials', userId), {
        ...data,
        voteCount: 0,
        updatedAt: serverTimestamp() || new Date(),
      });
    return '';
  } catch (error) {
    return (error as FirebaseError).message;
  }
};

export const upvoteFeedback = async (feedbackId: string, userId: string, isVoted: boolean) => {
  try {
    await updateDoc(doc(db, 'testimonials', feedbackId), {
      votes: isVoted ? arrayUnion(userId) : arrayRemove(userId),
      voteCount: increment(isVoted ? 1 : -1),
      updatedAt: serverTimestamp() || new Date(),
    });
    return '';
  } catch (error) {
    return (error as FirebaseError).message;
  }
};

export const deleteFeedback = async (userId: string) => {
  try {
    await deleteDoc(doc(db, 'testimonials', userId));
    return '';
  } catch (error) {
    return (error as FirebaseError).message;
  }
};
