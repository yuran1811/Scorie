export interface AUTH_CONTEXT_DEFAULT_Props {
	readonly email: string;
	readonly password: string;
	readonly name: string;
	readonly type: string;
	readonly isAuth: boolean | null;
	readonly errorMessage: string;
}

export interface SETTINGS_DEFAULT_Props {
	numberFormat: number;
}

export const AUTH_CONTEXT_DEFAULT: AUTH_CONTEXT_DEFAULT_Props = {
	email: '',
	password: '',
	name: '',
	type: 'null',
	isAuth: null,
	errorMessage: '',
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

export const MAX_SCORE_RECENT_LTH = 4;
