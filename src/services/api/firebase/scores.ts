import { FirebaseError } from 'firebase/app';
import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from 'shared';
import { getFirebaseErr } from 'utils';

export const validateSubjectOption = (opt: { isIgnored: boolean; isSpecial: boolean; isVital: boolean }) =>
	opt.isIgnored && (opt.isSpecial || opt.isVital);

export const addNewScore = async (userId: string, subjectId: string, data: any) => {
	try {
		const resp = await addDoc(collection(db, 'users', userId, 'subjects', subjectId, 'scores'), {
			...data,
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
		});
		return {
			data: resp,
			errorMessage: '',
		};
	} catch (error) {
		const err = error as FirebaseError;
		return {
			data: getFirebaseErr(err.message),
			errorMessage: '',
		};
	}
};

export const addNewSubject = async (userId: string, data: any) => {
	try {
		const resp = await addDoc(collection(db, 'users', userId, 'subjects'), {
			...data,
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
		});
		return {
			data: resp,
			errorMessage: '',
		};
	} catch (error) {
		const err = error as FirebaseError;
		return {
			data: getFirebaseErr(err.message),
			errorMessage: '',
		};
	}
};

export const editScore = async (userId: string, subjectId: string, scoreId: string, data: any) => {
	try {
		await updateDoc(doc(db, 'users', userId, 'subjects', subjectId, 'scores', scoreId), {
			...data,
			updatedAt: serverTimestamp(),
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
			updatedAt: serverTimestamp(),
		});
		return '';
	} catch (error) {
		const err = error as FirebaseError;
		return getFirebaseErr(err.message);
	}
};

export const deleteScore = async (userId: string, subjectId: string, scoreId: string) => {
	try {
		await deleteDoc(doc(db, 'users', userId, 'subjects', subjectId, 'scores', scoreId));
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
