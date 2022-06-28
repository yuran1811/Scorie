import { Dispatch, SetStateAction } from 'react';

export interface ScoreItemDetailType {
	id: string;
	isIgnored: boolean;
	base: number;
	type: string;
	value: number;
}

export interface ScoreDetailType {
	id: string;
	isIgnored: boolean;
	isVital: boolean;
	isSpecial: boolean;
	subject: string;
	scores: ScoreItemDetailType[];
}

export interface ScoreCardProps {
	data: ScoreDetailType;
}

export interface ScoreDetailProps {
	data: ScoreDetailType;
	setActive: Dispatch<SetStateAction<boolean>>;
}

export interface ScoreViewDetailProps {
	data: ScoreDetailType;
	isOpened: boolean;
}

export interface ScoreDetailProviderProps {
	viewDetail: ScoreViewDetailProps;
	setViewDetail: Dispatch<SetStateAction<ScoreViewDetailProps>> | null;
}
