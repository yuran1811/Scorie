import { NoteDetailType } from '@/shared';
import __ from 'lodash';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface StoreType {
  notes: NoteDetailType[];
  setNotes: (data: NoteDetailType[]) => void;

  noteIdxList: { id: string; list: string[] };
  setNoteIdxList: (noteIdxList: { id: string; list: string[] }) => void;
}

export const NOTE_STORE_NAME = __.kebabCase('Note Store');
export const NOTE_STORE_VERSION = 0.01;

export const useNoteStore = create<StoreType>()(
  devtools(
    persist(
      (set, get) => ({
        notes: [],
        setNotes: (notes) => set({ notes: [...notes] }),

        noteIdxList: { id: '', list: [] },
        setNoteIdxList: (noteIdxList) => set({ noteIdxList }),
      }),
      {
        name: NOTE_STORE_NAME,
        version: NOTE_STORE_VERSION,
      }
    )
  )
);
