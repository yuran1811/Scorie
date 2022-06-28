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

export interface NoteDetailProviderProps {
	viewDetail: NoteViewDetailProps;
	setViewDetail: Dispatch<SetStateAction<NoteViewDetailProps>> | null;
}
