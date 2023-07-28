import { db, NoteDetailType } from '@/shared';
import { getFirebaseErr } from '@/utils';
import { FirebaseError } from 'firebase/app';
import {
  addDoc,
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc
} from 'firebase/firestore';

export const validateNoteOption = (opt: {
  [key: string]: boolean;
  isDone: boolean;
  isInProgress: boolean;
  isArchived: boolean;
}) => {
  if (opt.isDone && opt.isInProgress)
    return {
      type: 'errors',
      message: 'Note cannot be both done and in progress',
    };

  return {
    type: 'ok',
    message: 'Alright',
  };
};

export const updateIdxList = async (userId: string, data: string[], idxListId: string) => {
  try {
    const noteIdxRef = doc(db, 'users', userId, 'notes', 'note_index_list');
    const resp = await setDoc(
      noteIdxRef,
      {
        idxList: [...data],
        updatedAt: serverTimestamp() || new Date(),
      },
      { merge: true }
    );
    return { resp, err: '' };
  } catch (error) {
    const err = error as FirebaseError;
    return { resp: null, err: getFirebaseErr(err.message) };
  }
};

export const addNewNote = async (userId: string, data: NoteDetailType) => {
  try {
    const { id, ...dataToAdd } = data;

    const resp = await addDoc(collection(db, 'users', userId, 'notes'), {
      ...dataToAdd,
      createdAt: serverTimestamp() || new Date(),
      updatedAt: serverTimestamp() || new Date(),
    });

    return {
      data: resp,
      errorMessage: '',
    };
  } catch (error) {
    return {
      data: null,
      errorMessage: getFirebaseErr((error as FirebaseError).message),
    };
  }
};

export const editNote = async (userId: string, noteId: string, data: any) => {
  try {
    await updateDoc(doc(db, 'users', userId, 'notes', noteId), {
      ...data,
      updatedAt: serverTimestamp() || new Date(),
    });
    return '';
  } catch (error) {
    const err = error as FirebaseError;
    return getFirebaseErr(err.message);
  }
};

export const deleteNote = async (userId: string, noteId: string, idxListId: string) => {
  try {
    await deleteDoc(doc(db, 'users', userId, 'notes', noteId));
    await setDoc(
      doc(db, 'users', userId, 'notes', 'note_index_list'),
      {
        idxList: arrayRemove(noteId),
        updatedAt: serverTimestamp() || new Date(),
      },
      { merge: true }
    );
    return '';
  } catch (error) {
    const err = error as FirebaseError;
    return getFirebaseErr(err.message);
  }
};
