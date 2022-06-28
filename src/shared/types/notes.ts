import { Dispatch, SetStateAction } from 'react';

export interface NoteDetailType {
	id: string;
	isDone: boolean;
	isInProgress: boolean;
	title: string;
	data: string;
	createdAt: string;
	updatedAt: string;
}

export interface NoteCardProps {
	data: NoteDetailType;
}

export interface NoteDetailProps {
	data: NoteDetailType;
	setActive: Dispatch<SetStateAction<boolean>>;
}

export interface NoteViewDetailProps {
	data: NoteDetailType;
	isOpened: boolean;
}

export interface NoteDetailProviderProps {
	viewDetail: NoteViewDetailProps;
	setViewDetail: Dispatch<SetStateAction<NoteViewDetailProps>> | null;
}
