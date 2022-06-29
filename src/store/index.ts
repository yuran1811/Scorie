import { SETTINGS_DEFAULT, SETTINGS_DEFAULT_TYPE } from '../constants';
import { User } from 'firebase/auth';
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreType {
	currentUser: User | null | undefined;
	setCurrentUser: (user: User | null) => void;

	settings: SETTINGS_DEFAULT_TYPE;
	setSettings: (opts: SETTINGS_DEFAULT_TYPE) => void;
}

export const useStore = create<StoreType>()(
	persist(
		(set, get) => ({
			currentUser: undefined,
			setCurrentUser: (user) => set({ currentUser: user }),

			settings: { ...SETTINGS_DEFAULT },
			setSettings: (opts) => set({ settings: { ...opts } }),
		}),
		{ name: 'local_user_data' }
	)
);
