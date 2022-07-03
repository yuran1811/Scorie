import { Timestamp } from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';

export interface NoteDetailType {
	id: string;
	order: number;
	title: string;
	data: string;
	theme: string;
	isPinned: boolean;
	isArchived: boolean;
	isDone: boolean;
	isInProgress: boolean;
	createdAt?: Timestamp;
	updatedAt?: Timestamp;
}

export interface NoteCardProps {
	note: NoteDetailType;
}

export interface NoteDetailProps {
	note: NoteDetailType;
	setActive: Dispatch<SetStateAction<boolean>>;
}

export interface NoteViewDetailProps {
	id: string;
	isOpened: boolean;
}
