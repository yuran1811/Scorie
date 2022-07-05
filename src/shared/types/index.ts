import { HTMLProps } from 'react';

export * from './docs';
export * from './notes';
export * from './scores';

export type DivProps = HTMLProps<HTMLDivElement>;
export type InputProps = HTMLProps<HTMLInputElement>;
export type ButtonProps = HTMLProps<HTMLButtonElement>;
export type AnchorProps = HTMLProps<HTMLAnchorElement>;

export type FeatureRoutesType = {
	path: string;
	color: string;
	title: string;
	content: string;
}[];

export type RoutesType = {
	path: string;
	component: any;
}[];
