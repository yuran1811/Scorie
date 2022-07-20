import { db, NoteDetailType } from '@/shared';
import { getFirebaseErr } from '@/utils';
import { FirebaseError } from 'firebase/app';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

export const noteIndexListRef = (userId: string) =>
  doc(db, 'users', userId, 'notes', 'note_index_list');

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

export const updateIdxList = async (userId: string, data: string[]) => {
  try {
    await setDoc(noteIndexListRef(userId), {
      idxList: [...data],
      updatedAt: serverTimestamp(),
    });
    return '';
  } catch (error) {
    const err = error as FirebaseError;
    return getFirebaseErr(err.message);
  }
};

export const addNewNote = async (userId: string, data: NoteDetailType) => {
  try {
    const { id, ...dataToAdd } = data;

    const resp = await addDoc(collection(db, 'users', userId, 'notes'), {
      ...dataToAdd,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    if (resp && resp?.id && resp.id) {
      const ref = noteIndexListRef(userId);

      const listData = await getDoc(ref);
      const list = listData?.data() as NoteDetailType;
      const lastList = list && list?.idxList ? list.idxList : [];

      await updateIdxList(userId, [resp.id, ...lastList]);

      // if (list && list?.idxList) await updateIdxList(userId, [resp.id, ...list.idxList]);
      // else await setDoc(ref, { idxList: [resp.id], updatedAt: serverTimestamp() });
    }

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

export const editNote = async (userId: string, noteId: string, data: any) => {
  try {
    await setDoc(
      doc(db, 'users', userId, 'notes', noteId),
      {
        ...data,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    return '';
  } catch (error) {
    const err = error as FirebaseError;
    return getFirebaseErr(err.message);
  }
};

export const deleteNote = async (userId: string, noteId: string) => {
  try {
    await deleteDoc(doc(db, 'users', userId, 'notes', noteId));
    return '';
  } catch (error) {
    const err = error as FirebaseError;
    return getFirebaseErr(err.message);
  }
};
