import { Dispatch, SetStateAction } from 'react';

export interface ScoreDetailType {
	id: string;
	isIgnored: boolean;
	base: number;
	type: string;
	value: number;
}

export interface SubjectDetailType {
	id: string;
	isIgnored: boolean;
	isVital: boolean;
	isSpecial: boolean;
	name: string;
}

export interface SubjectCardProps {
	subject: SubjectDetailType;
}

export interface ScoreDetailProps {
	id: string;
	setActive: Dispatch<SetStateAction<boolean>>;
}

export interface ScoreViewDetailProps {
	id: string;
	isOpened: boolean;
}

export interface ScoreDetailProviderProps {
	viewDetail: ScoreViewDetailProps;
	setViewDetail: Dispatch<SetStateAction<ScoreViewDetailProps>> | null;
}
