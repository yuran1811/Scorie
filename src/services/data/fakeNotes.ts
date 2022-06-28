import { NoteDetailType } from 'shared';

export const fakeNotes: NoteDetailType[] = [
	{
		id: 'note-1',
		isDone: false,
		isInProgress: true,
		title: 'First Note',
		data: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto reiciendis at laudantium minima fugiat labore quis expedita doloribus animi quos. Blanditiis adipisci nihil nemo voluptate sed voluptates reprehenderit id ipsum!',
		createdAt: '1/1/2022',
		updatedAt: '1/1/2022',
	},
	{
		id: 'note-2',
		isDone: true,
		isInProgress: false,
		title: 'Second Note',
		data: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto reiciendis at laudantium minima fugiat labore quis expedita doloribus animi quos. Blanditiis adipisci nihil nemo voluptate sed voluptates reprehenderit id ipsum!',
		createdAt: '1/1/2022',
		updatedAt: '1/1/2022',
	},
	{
		id: 'note-3',
		isDone: false,
		isInProgress: false,
		title: 'Third Note',
		data: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto reiciendis at laudantium minima fugiat labore quis expedita doloribus animi quos. Blanditiis adipisci nihil nemo voluptate sed voluptates reprehenderit id ipsum!',
		createdAt: '1/1/2022',
		updatedAt: '1/1/2022',
	},
	{
		id: 'note-4',
		isDone: true,
		isInProgress: false,
		title: 'Fourth Note',
		data: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto reiciendis at laudantium minima fugiat labore quis expedita doloribus animi quos. Blanditiis adipisci nihil nemo voluptate sed voluptates reprehenderit id ipsum!',
		createdAt: '1/1/2022',
		updatedAt: '1/1/2022',
	},
];
