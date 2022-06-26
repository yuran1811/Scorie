export interface fakeNotesProps {
	id: number;
	isDone: boolean;
	isInProgress: boolean;
	title: string;
	data: string;
	createdAt: string;
	updatedAt: string;
}

export const fakeNotes: fakeNotesProps[] = [
	{
		id: 1,
		isDone: false,
		isInProgress: true,
		title: 'First Note',
		data: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto reiciendis at laudantium minima fugiat labore quis expedita doloribus animi quos. Blanditiis adipisci nihil nemo voluptate sed voluptates reprehenderit id ipsum!',
		createdAt: '1/1/2022',
		updatedAt: '1/1/2022',
	},
	{
		id: 2,
		isDone: true,
		isInProgress: false,
		title: 'Second Note',
		data: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto reiciendis at laudantium minima fugiat labore quis expedita doloribus animi quos. Blanditiis adipisci nihil nemo voluptate sed voluptates reprehenderit id ipsum!',
		createdAt: '1/1/2022',
		updatedAt: '1/1/2022',
	},
	{
		id: 3,
		isDone: false,
		isInProgress: false,
		title: 'Third Note',
		data: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto reiciendis at laudantium minima fugiat labore quis expedita doloribus animi quos. Blanditiis adipisci nihil nemo voluptate sed voluptates reprehenderit id ipsum!',
		createdAt: '1/1/2022',
		updatedAt: '1/1/2022',
	},
	{
		id: 4,
		isDone: true,
		isInProgress: false,
		title: 'Fourth Note',
		data: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto reiciendis at laudantium minima fugiat labore quis expedita doloribus animi quos. Blanditiis adipisci nihil nemo voluptate sed voluptates reprehenderit id ipsum!',
		createdAt: '1/1/2022',
		updatedAt: '1/1/2022',
	},
];
