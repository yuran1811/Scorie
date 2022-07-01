import { SubjectDetailType } from 'shared';

export const fakeScores: SubjectDetailType[] = [
	{
		id: 'score-1',
		name: 'Maths',
		isSpecial: true,
		isVital: true,
		isIgnored: false,
		scores: [],
	},
	{
		id: 'score-2',
		name: 'Physics',
		isSpecial: false,
		isVital: true,
		isIgnored: false,
		scores: [],
	},
	{
		id: 'score-3',
		name: 'Chemistry',
		isSpecial: false,
		isVital: true,
		isIgnored: false,
		scores: [],
	},
	{
		id: 'score-4',
		name: 'Civic Education',
		isSpecial: false,
		isVital: false,
		isIgnored: false,
		scores: [],
	},
];
