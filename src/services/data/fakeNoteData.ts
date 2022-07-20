import { NoteDetailType } from '@/shared';

export const fakeNotes: NoteDetailType[] = [
  {
    id: 'note-1',
    isPinned: false,
    isArchived: false,
    isDone: false,
    isInProgress: true,
    title: 'First Note',
    data: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto reiciendis at laudantium minima fugiat labore quis expedita doloribus animi quos. Blanditiis adipisci nihil nemo voluptate sed voluptates reprehenderit id ipsum!',
    theme: 'default',
  },
  {
    id: 'note-2',
    isPinned: false,
    isArchived: false,
    isDone: true,
    isInProgress: false,
    title: 'Second Note',
    data: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto reiciendis at laudantium minima fugiat labore quis expedita doloribus animi quos. Blanditiis adipisci nihil nemo voluptate sed voluptates reprehenderit id ipsum!',
    theme: 'default',
  },
  {
    id: 'note-3',
    isPinned: false,
    isArchived: false,
    isDone: false,
    isInProgress: false,
    title: 'Third Note',
    data: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto reiciendis at laudantium minima fugiat labore quis expedita doloribus animi quos. Blanditiis adipisci nihil nemo voluptate sed voluptates reprehenderit id ipsum!',
    theme: 'default',
  },
  {
    id: 'note-4',
    isPinned: false,
    isArchived: false,
    isDone: true,
    isInProgress: false,
    title: 'Fourth Note',
    data: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto reiciendis at laudantium minima fugiat labore quis expedita doloribus animi quos. Blanditiis adipisci nihil nemo voluptate sed voluptates reprehenderit id ipsum!',
    theme: 'default',
  },
];
