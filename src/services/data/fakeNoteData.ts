import { NoteDetailType } from '@/shared';

export const getFakeNotes = (size?: number) => {
  const arrayLength = size || 10;
  const array = Array(arrayLength);

  return array.map((_, idx) => {
    const pinned = Math.random() - 0.5 > 0;
    const done = Math.random() - 0.5 > 0;
    const archived = Math.random() - 0.5 > 0;

    return {
      id: `note-${idx}`,

      isPinned: pinned,
      isArchived: archived,
      isDone: done,
      isInProgress: !done,

      theme: 'default',
      title: `Note #${idx}`,
      data: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto reiciendis at laudantium minima fugiat labore quis expedita doloribus animi quos. Blanditiis adipisci nihil nemo voluptate sed voluptates reprehenderit id ipsum!',
    } as NoteDetailType;
  });
};
