import { db, ScoreDetailType, SubjectDetailType } from '@/shared';
import { getFirebaseErr } from '@/utils';
import { FirebaseError } from 'firebase/app';
import { addDoc, collection, deleteDoc, doc, getDoc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';

export const validateSubjectOption = (opt: { isIgnored: boolean; isSpecial: boolean; isVital: boolean }) =>
  opt.isIgnored && (opt.isSpecial || opt.isVital);

export const addNewScore = async (userId: string, subjectId: string, data: ScoreDetailType) => {
  try {
    const subjectRaw = await getDoc(doc(db, 'users', userId, 'subjects', subjectId));
    const subjectData = subjectRaw?.data() as SubjectDetailType;

    if (!subjectData)
      return {
        data: null,
        errorMessage: 'No subject',
      };

    const scoreToAdd: ScoreDetailType = {
      ...data,
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
    };

    const resp = await editSubject(userId, subjectId, {
      scores: [...subjectData.scores, scoreToAdd],
    });

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

export const addNewSubject = async (userId: string, data: any) => {
  try {
    const resp = await addDoc(collection(db, 'users', userId, 'subjects'), {
      ...data,
      createdAt: serverTimestamp() || new Date(),
      updatedAt: serverTimestamp() || new Date(),
    });

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

export const editScore = async (userId: string, subjectId: string, data: ScoreDetailType) => {
  try {
    const subjectRaw = await getDoc(doc(db, 'users', userId, 'subjects', subjectId));
    if (!subjectRaw || !subjectRaw?.data()) return '';

    const subjectData = { ...subjectRaw?.data() } as SubjectDetailType;
    if (!subjectData || !subjectData?.scores) return '';

    const scoreIndex = subjectData.scores.findIndex((_) => _.id === data.id);

    if (scoreIndex > -1) subjectData.scores.splice(scoreIndex, 1);

    const scoreToEdit = { ...data, updatedAt: Timestamp.fromDate(new Date()) };

    await editSubject(userId, subjectId, {
      scores: [...subjectData.scores, scoreToEdit],
    });

    return '';
  } catch (error) {
    const err = error as FirebaseError;
    return getFirebaseErr(err.message);
  }
};

export const editSubject = async (userId: string, subjectId: string, data: any) => {
  try {
    await updateDoc(doc(db, 'users', userId, 'subjects', subjectId), {
      ...data,
      updatedAt: serverTimestamp() || new Date(),
    });
    return '';
  } catch (error) {
    const err = error as FirebaseError;
    return getFirebaseErr(err.message);
  }
};

export const deleteSubject = async (userId: string, subjectId: string) => {
  try {
    await deleteDoc(doc(db, 'users', userId, 'subjects', subjectId));
    return '';
  } catch (error) {
    const err = error as FirebaseError;
    return getFirebaseErr(err.message);
  }
};
