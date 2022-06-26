export interface fakeScoresProps {
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

export const fakeScores: fakeScoresProps[] = [
	{
		id: 1,
		isIgnored: false,
		isVital: true,
		isSpecial: true,
		subject: 'Maths',
		scores: [
			{
				id: 1,
				isIgnored: false,
				base: 1,
				type: '15mins',
				value: 10,
			},
			{
				id: 2,
				isIgnored: false,
				base: 1,
				type: '15mins',
				value: 9.75,
			},
			{
				id: 3,
				isIgnored: false,
				base: 2,
				type: '45mins',
				value: 10,
			},
			{
				id: 4,
				isIgnored: false,
				base: 2,
				type: '45mins',
				value: 9.8,
			},
			{
				id: 5,
				isIgnored: false,
				base: 3,
				type: '60mins',
				value: 9.6,
			},
		],
	},
	{
		id: 2,
		isIgnored: false,
		isVital: true,
		isSpecial: false,
		subject: 'Physics',
		scores: [
			{
				id: 1,
				isIgnored: false,
				base: 1,
				type: '15mins',
				value: 10,
			},
			{
				id: 2,
				isIgnored: false,
				base: 1,
				type: '15mins',
				value: 10,
			},
			{
				id: 3,
				isIgnored: false,
				base: 2,
				type: '45mins',
				value: 9.8,
			},
			{
				id: 4,
				isIgnored: false,
				base: 2,
				type: '45mins',
				value: 9.2,
			},
			{
				id: 5,
				isIgnored: false,
				base: 3,
				type: '60mins',
				value: 10,
			},
		],
	},
	{
		id: 3,
		isIgnored: false,
		isVital: true,
		isSpecial: false,
		subject: 'Chemistry',
		scores: [
			{
				id: 1,
				isIgnored: false,
				base: 1,
				type: '15mins',
				value: 9,
			},
			{
				id: 2,
				isIgnored: false,
				base: 1,
				type: '15mins',
				value: 9.6,
			},
			{
				id: 3,
				isIgnored: false,
				base: 2,
				type: '45mins',
				value: 9.8,
			},
			{
				id: 4,
				isIgnored: false,
				base: 2,
				type: '45mins',
				value: 10,
			},
			{
				id: 5,
				isIgnored: false,
				base: 3,
				type: '60mins',
				value: 9,
			},
		],
	},
	{
		id: 4,
		isIgnored: false,
		isVital: false,
		isSpecial: false,
		subject: 'Civic Education',
		scores: [
			{
				id: 1,
				isIgnored: false,
				base: 1,
				type: '15mins',
				value: 9,
			},
			{
				id: 2,
				isIgnored: false,
				base: 1,
				type: '15mins',
				value: 9.6,
			},
			{
				id: 3,
				isIgnored: false,
				base: 2,
				type: '45mins',
				value: 9.8,
			},
			{
				id: 4,
				isIgnored: false,
				base: 2,
				type: '45mins',
				value: 10,
			},
			{
				id: 5,
				isIgnored: false,
				base: 3,
				type: '60mins',
				value: 9,
			},
		],
	},
];
