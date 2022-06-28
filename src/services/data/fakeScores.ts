import { ScoreDetailType } from 'shared';

export const fakeScores: ScoreDetailType[] = [
	{
		id: 'score-1',
		isIgnored: false,
		isVital: true,
		isSpecial: true,
		subject: 'Maths',
		scores: [
			{
				id: 'score-1',
				isIgnored: false,
				base: 1,
				type: '15mins',
				value: 10,
			},
			{
				id: 'score-2',
				isIgnored: false,
				base: 1,
				type: '15mins',
				value: 9.75,
			},
			{
				id: 'score-3',
				isIgnored: false,
				base: 2,
				type: '45mins',
				value: 10,
			},
			{
				id: 'score-4',
				isIgnored: false,
				base: 2,
				type: '45mins',
				value: 9.8,
			},
			{
				id: 'score-5',
				isIgnored: false,
				base: 3,
				type: '60mins',
				value: 9.6,
			},
		],
	},
	{
		id: 'score-2',
		isIgnored: false,
		isVital: true,
		isSpecial: false,
		subject: 'Physics',
		scores: [
			{
				id: 'score-1',
				isIgnored: false,
				base: 1,
				type: '15mins',
				value: 10,
			},
			{
				id: 'score-2',
				isIgnored: false,
				base: 1,
				type: '15mins',
				value: 10,
			},
			{
				id: 'score-3',
				isIgnored: false,
				base: 2,
				type: '45mins',
				value: 9.8,
			},
			{
				id: 'score-4',
				isIgnored: false,
				base: 2,
				type: '45mins',
				value: 9.2,
			},
			{
				id: 'score-5',
				isIgnored: false,
				base: 3,
				type: '60mins',
				value: 10,
			},
		],
	},
	{
		id: 'score-3',
		isIgnored: false,
		isVital: true,
		isSpecial: false,
		subject: 'Chemistry',
		scores: [
			{
				id: 'score-1',
				isIgnored: false,
				base: 1,
				type: '15mins',
				value: 9,
			},
			{
				id: 'score-2',
				isIgnored: false,
				base: 1,
				type: '15mins',
				value: 9.6,
			},
			{
				id: 'score-3',
				isIgnored: false,
				base: 2,
				type: '45mins',
				value: 9.8,
			},
			{
				id: 'score-4',
				isIgnored: false,
				base: 2,
				type: '45mins',
				value: 10,
			},
			{
				id: 'score-5',
				isIgnored: false,
				base: 3,
				type: '60mins',
				value: 9,
			},
		],
	},
	{
		id: 'score-4',
		isIgnored: false,
		isVital: false,
		isSpecial: false,
		subject: 'Civic Education',
		scores: [
			{
				id: 'score-1',
				isIgnored: false,
				base: 1,
				type: '15mins',
				value: 9,
			},
			{
				id: 'score-2',
				isIgnored: false,
				base: 1,
				type: '15mins',
				value: 9.6,
			},
			{
				id: 'score-3',
				isIgnored: false,
				base: 2,
				type: '45mins',
				value: 9.8,
			},
			{
				id: 'score-4',
				isIgnored: false,
				base: 2,
				type: '45mins',
				value: 10,
			},
			{
				id: 'score-5',
				isIgnored: false,
				base: 3,
				type: '60mins',
				value: 9,
			},
		],
	},
];