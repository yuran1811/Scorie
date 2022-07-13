import { QuoteStoreType, QUOTES_STORED_DEFAULT, SettingsType, SETTINGS_DEFAULT, SubjectDetailType } from 'shared';
import { devtools, persist } from 'zustand/middleware';
import { User } from 'firebase/auth';
import create from 'zustand';

interface StoreType {
	currentUser: User | null | undefined;
	setCurrentUser: (user: User | null) => void;

	settings: SettingsType;
	setSettings: (opts: SettingsType) => void;

	quotes: QuoteStoreType;
	setQuotes: (data: QuoteStoreType) => void;

	scores: SubjectDetailType[];
	setScores: (data: SubjectDetailType[]) => void;
}

export const useStore = create<StoreType>()(
	devtools(
		persist(
			(set, get) => ({
				currentUser: undefined,
				setCurrentUser: (user) => set({ currentUser: user }),

				settings: { ...SETTINGS_DEFAULT },
				setSettings: (opts) => set({ settings: { ...opts } }),

				quotes: { ...QUOTES_STORED_DEFAULT },
				setQuotes: (data) => set({ quotes: data }),

				scores: [],
				setScores: (data) => set({ scores: [...data] }),
			}),
			{ name: 'local_user_data' }
		)
	)
);
