import { Timestamp } from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';

export interface NoteDetailType {
	id: string;
	title: string;
	data: string;
	theme: string;
	isPinned: boolean;
	isArchived: boolean;
	isDone: boolean;
	isInProgress: boolean;
	idxList?: string[];
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

export interface NoteListType {
	id: string;
	isShow: boolean;
	note: NoteDetailType;
}

export interface NoteListFilterType {
	hasArchived: boolean;
	hasDone: boolean;
	hasInProgress: boolean;
}

export interface NoteSectionProps {
	viewMode: string;
	filter: NoteListFilterType;
	notes: NoteListType[];
	orderList: string[];
}

export interface NoteItemProps {
	viewMode: string;
	isShow: boolean;
	note: NoteDetailType;
}
