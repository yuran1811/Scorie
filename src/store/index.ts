import {
  QuoteStoreType,
  QUOTES_STORED_DEFAULT,
  SettingsType,
  SETTINGS_DEFAULT,
  SubjectDetailType,
} from '@/shared';
import { User } from 'firebase/auth';
import __ from 'lodash';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export * from './changeLogStore';
export * from './noteStore';
export * from './tourStore';

interface StoreType {
  currentUser: User | null | undefined;
  setCurrentUser: (user: User | null) => void;

  settings: SettingsType;
  setSettings: (opts: SettingsType) => void;

  quotes: QuoteStoreType;
  setQuotes: (data: QuoteStoreType) => void;

  scores: SubjectDetailType[];
  setScores: (data: SubjectDetailType[]) => void;

  locale: string;
  setLocale: (data: string) => void;

  FCMToken: string;
  setFCMToken: (token: string) => void;
}

export const GENERAL_STORE_NAME = __.kebabCase('General Store');
export const GENERAL_STORE_VERSION = 0.01;

export const useStore = create<StoreType>()(
  devtools(
    persist(
      (set, get) => ({
        currentUser: undefined,
        setCurrentUser: (user) => set({ currentUser: user }),

        settings: { ...SETTINGS_DEFAULT },
        setSettings: (settings) => set({ settings: { ...settings } }),

        quotes: { ...QUOTES_STORED_DEFAULT },
        setQuotes: (quotes) => set({ quotes }),

        scores: [],
        setScores: (scores) => set({ scores: [...scores] }),

        locale: 'vi',
        setLocale: (locale) => set({ locale }),

        FCMToken: '',
        setFCMToken: (FCMToken) => set({ FCMToken }),
      }),
      {
        name: GENERAL_STORE_NAME,
        version: GENERAL_STORE_VERSION,
      }
    )
  )
);
