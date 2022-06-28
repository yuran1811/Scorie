import { User } from 'firebase/auth';
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreType {
	currentUser: undefined | null | User;
	setCurrentUser: (user: User | null) => void;
}

export const useStore = create<StoreType>()(
	persist((set, get) => ({
		currentUser: undefined,
		setCurrentUser: (user) => set({ currentUser: user }),
	}))
);
