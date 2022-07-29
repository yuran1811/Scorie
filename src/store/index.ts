import {
  ChangeLogProps,
  NoteDetailType,
  QuoteStoreType,
  QUOTES_STORED_DEFAULT,
  SettingsType,
  SETTINGS_DEFAULT,
  STORE_NAME,
  SubjectDetailType,
} from '@/shared';
import { User } from 'firebase/auth';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface StoreType {
  currentUser: User | null | undefined;
  setCurrentUser: (user: User | null) => void;

  settings: SettingsType;
  setSettings: (opts: SettingsType) => void;

  quotes: QuoteStoreType;
  setQuotes: (data: QuoteStoreType) => void;

  scores: SubjectDetailType[];
  setScores: (data: SubjectDetailType[]) => void;

  notes: NoteDetailType[];
  setNotes: (data: NoteDetailType[]) => void;

  noteIdxList: { id: string; list: string[] };
  setNoteIdxList: (noteIdxList: { id: string; list: string[] }) => void;

  locale: string;
  setLocale: (data: string) => void;

  FCMToken: string;
  setFCMToken: (token: string) => void;

  changeLogs: ChangeLogProps[];
  setChangeLogs: (changeLogs: ChangeLogProps[]) => void;

  changeLogsRead: { [version: string]: boolean };
  setChangeLogsRead: (version: string, read: boolean) => void;
}

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

        notes: [],
        setNotes: (notes) => set({ notes: [...notes] }),

        noteIdxList: { id: '', list: [] },
        setNoteIdxList: (noteIdxList) => set({ noteIdxList }),

        locale: 'vi',
        setLocale: (locale) => set({ locale }),

        FCMToken: '',
        setFCMToken: (FCMToken) => set({ FCMToken }),

        changeLogs: [],
        setChangeLogs: (changeLogs) => set({ changeLogs }),

        changeLogsRead: {},
        setChangeLogsRead: (version, read) =>
          set((s) => ({ changeLogsRead: { ...s.changeLogsRead, [version]: read } })),
      }),
      { name: STORE_NAME }
    )
  )
);
