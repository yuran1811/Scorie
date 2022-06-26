import { fakeNotesProps } from 'services';
import { ScoreDetail } from 'shared/types';

export interface AUTH_CONTEXT_DEFAULT_Props {
	name: string;
	isAuth: boolean | null;
	errorMessage: string;
	data: {
		scores: ScoreDetail[];
		notes: fakeNotesProps[];
	};
}

export interface SETTINGS_DEFAULT_Props {
	numberFormat: number;
}

export const AUTH_CONTEXT_DEFAULT: AUTH_CONTEXT_DEFAULT_Props = {
	name: '',
	isAuth: null,
	errorMessage: '',
	data: {
		scores: [],
		notes: [],
	},
};

export const SETTINGS_DEFAULT: SETTINGS_DEFAULT_Props = {
	numberFormat: 2,
};

export const VIEW_DATA_DEFAULT = {
	id: 0,
	isIgnored: false,
	isVital: false,
	isSpecial: false,
	subject: '',
	scores: [],
};

export const NOTE_VIEW_DATA_DEFAULT = {
	id: 0,
	isDone: false,
	isInProgress: false,
	title: '',
	data: '',
	createdAt: '',
	updatedAt: '',
};

export const MAX_SCORE_RECENT_LTH = 4;
