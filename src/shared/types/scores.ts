import { SubjectAverageType } from 'components/main/sections/score/SubjectAverage';
import { Timestamp } from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';

export interface ScoreDetailType {
	id: string;
	isIgnored: boolean;
	base: number;
	type: string;
	value: number;
	createdAt?: Timestamp;
	updatedAt?: Timestamp;
}

export interface SubjectDetailType {
	id: string;
	isIgnored: boolean;
	isVital: boolean;
	isSpecial: boolean;
	name: string;
	createdAt?: Timestamp;
	updatedAt?: Timestamp;
}

export interface SubjectCardProps {
	subject: SubjectDetailType;
	setSubjectAverages: Dispatch<
		SetStateAction<{
			[key: string]: SubjectAverageType;
		}>
	>;
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
