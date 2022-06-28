import { NoteDetailType, ScoreDetailType } from 'shared';

export interface SETTINGS_DEFAULT_Props {
	numberFormat: number;
}

export const SETTINGS_DEFAULT = {
	numberFormat: 2,
};

export const SCORE_VIEW_DATA_DEFAULT: ScoreDetailType = {
	id: '0',
	isIgnored: false,
	isSpecial: false,
	isVital: false,
	subject: '',
	scores: [],
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
