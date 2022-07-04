import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	serverTimestamp,
	setDoc,
	Timestamp,
	updateDoc,
} from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { db, NoteDetailType } from 'shared';
import { getFirebaseErr } from 'utils';

export const noteIndexListRef = (userId: string) => doc(db, 'users', userId, 'notes', 'note_index_list');

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

export const updateIdxList = async (userId: string, data: string[]) => {
	try {
		await updateDoc(noteIndexListRef(userId), {
			idxList: [...data],
			updatedAt: Timestamp.fromDate(new Date()),
		});
		return '';
	} catch (error) {
		const err = error as FirebaseError;
		return getFirebaseErr(err.message);
	}
};

export const addNewNote = async (userId: string, data: NoteDetailType) => {
	try {
		const resp = await addDoc(collection(db, 'users', userId, 'notes'), {
			...data,
			createdAt: Timestamp.fromDate(new Date()),
			updatedAt: Timestamp.fromDate(new Date()),
		});

		if (resp && resp?.id) {
			const ref = noteIndexListRef(userId);
			if (!resp.id || !ref) return '';

			const listData = await getDoc(ref);
			const list = listData?.data() as NoteDetailType;

			if (list && list?.idxList) await updateIdxList(userId, [resp.id, ...list.idxList]);
			else await setDoc(ref, { idxList: [resp.id], updatedAt: serverTimestamp() });
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
