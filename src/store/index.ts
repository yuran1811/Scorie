import { SETTINGS_DEFAULT, SETTINGS_DEFAULT_TYPE } from '../constants';
import { User } from 'firebase/auth';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { NoteDetailType } from 'shared';

interface StoreType {
	currentUser: User | null | undefined;
	setCurrentUser: (user: User | null) => void;

	settings: SETTINGS_DEFAULT_TYPE;
	setSettings: (opts: SETTINGS_DEFAULT_TYPE) => void;

	notes: NoteDetailType[];
	setNotes: (notes: NoteDetailType[]) => void;
}

export const useStore = create<StoreType>()(
	persist(
		(set, get) => ({
			currentUser: undefined,
			setCurrentUser: (user) => set({ currentUser: user }),

			settings: { ...SETTINGS_DEFAULT },
			setSettings: (opts) => set({ settings: { ...opts } }),

			notes: [],
			setNotes: (data) => set({ notes: [...data] }),
		}),
		{ name: 'local_user_data' }
	)
);
