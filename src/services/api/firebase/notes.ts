import { getFirebaseErr } from 'utils';
import { db, NoteDetailType } from 'shared';
import { FirebaseError } from 'firebase/app';
import { addDoc, collection, deleteDoc, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';

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

	if (opt.isArchived && opt.isPinned)
		return {
			type: 'errors',
			message: 'Note cannot be both pinned and archived',
		};

	return {
		type: 'ok',
		message: 'Alright',
	};
};

export const addRootNode = async (userId: string, isRootNode: number) => {
	try {
		const rootNode = {
			title: '',
			data: '',
			theme: '',
			isPinned: false,
			isArchived: false,
			isDone: false,
			isInProgress: false,
			isRootNode: isRootNode,
			nextNode: '',
			prevNode: '',
			createdAt: Timestamp.fromDate(new Date()),
			updatedAt: Timestamp.fromDate(new Date()),
		};

		const resp = await addDoc(collection(db, 'users', userId, 'notes'), { ...rootNode });

		return { data: resp, errorMessage: '' };
	} catch (error) {
		const err = error as FirebaseError;
		return { data: null, errorMessage: getFirebaseErr(err.message) };
	}
};

export const addNewNote = async (userId: string, data: NoteDetailType) => {
	try {
		const noteToAdd: NoteDetailType = {
			...data,
			createdAt: Timestamp.fromDate(new Date()),
			updatedAt: Timestamp.fromDate(new Date()),
		};

		const resp = await addDoc(collection(db, 'users', userId, 'notes'), noteToAdd);

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
		await updateDoc(doc(db, 'users', userId, 'notes', noteId), {
			...data,
			updatedAt: serverTimestamp(),
		});
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
