import { Dispatch, SetStateAction } from 'react';

export interface NoteDetail {
	id: number;
	isDone: boolean;
	isInProgress: boolean;
	title: string;
	data: string;
	createdAt: string;
	updatedAt: string;
}

export interface NoteCardProps {
	data: NoteDetail;
}

export interface NoteDetailProps {
	data: NoteDetail;
	setActive: Dispatch<SetStateAction<boolean>>;
}

export interface NoteViewDetailProps {
	data: NoteDetail;
	isOpened: boolean;
}

export interface NoteDetailProviderProps {
	viewDetail: NoteViewDetailProps;
	setViewDetail: Dispatch<SetStateAction<NoteViewDetailProps>> | null;
}
