import { NoteDetailType, SubjectDetailType } from 'shared';

export interface SETTINGS_DEFAULT_Props {
	numberFormat: number;
}

export const SETTINGS_DEFAULT = {
	numberFormat: 2,
};

export const SCORE_VIEW_DATA_DEFAULT: SubjectDetailType = {
	id: '0',
	isIgnored: false,
	isSpecial: false,
	isVital: false,
	name: '',
};

export const NOTE_VIEW_DATA_DEFAULT: NoteDetailType = {
	id: '0',
	isDone: false,
	isInProgress: false,
	title: '',
	data: '',
	createdAt: '',
	updatedAt: '',
};

export const MAX_SCORE_RECENT_LTH = 4;
