import { Dispatch, SetStateAction } from 'react';

export interface ScoreDetail {
	id: number;
	isIgnored: boolean;
	isVital: boolean;
	isSpecial: boolean;
	subject: string;
	scores: {
		id: number;
		isIgnored: boolean;
		base: number;
		type: string;
		value: number;
	}[];
}

export interface ScoreCardProps {
	data: ScoreDetail;
}

export interface ScoreDetailProps {
	data: ScoreDetail;
	setActive: Dispatch<SetStateAction<boolean>>;
}

export interface ScoreViewDetailProps {
	data: ScoreDetail;
	isOpened: boolean;
}

export interface ScoreDetailProviderProps {
	viewDetail: ScoreViewDetailProps;
	setViewDetail: Dispatch<SetStateAction<ScoreViewDetailProps>> | null;
}
