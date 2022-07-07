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
	name: string;
	isSpecial: boolean;
	isVital: boolean;
	isIgnored: boolean;
	scores: ScoreDetailType[];
	createdAt?: Timestamp;
	updatedAt?: Timestamp;
}

export interface SubjectListType {
	isShow: boolean;
	subject: SubjectDetailType;
}

export interface SubjectListFilterType {
	hasVital: boolean;
	hasSpecial: boolean;
	hasIgnored: boolean;
	searchPattern?: string;
}

export interface ScoreDetailProps {
	id: string;
	setActive: Dispatch<SetStateAction<boolean>>;
}
