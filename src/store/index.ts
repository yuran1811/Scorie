import {
  ClockStoreType,
  QUOTES_STORED_DEFAULT,
  QuoteStoreType,
  SETTINGS_DEFAULT,
  SettingsType,
  SubjectDetailType,
  TimerStoreType,
  WEATHER_STORED_DEFAULT,
  WeatherStoreType,
} from '@/shared';
import { User } from 'firebase/auth';
import __ from 'lodash';
import { create } from 'zustand';
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

  clockStyle: ClockStoreType;
  setClockStyle: (data: ClockStoreType) => void;

  timers: TimerStoreType[];
  setTimers: (data: TimerStoreType[]) => void;

  weather: WeatherStoreType;
  setWeather: (data: WeatherStoreType) => void;

  scores: SubjectDetailType[];
  setScores: (data: SubjectDetailType[]) => void;

  locale: string;
  setLocale: (data: string) => void;

  FCMToken: string;
  setFCMToken: (token: string) => void;
}

export const GENERAL_STORE_NAME = __.kebabCase('General Store');
export const GENERAL_STORE_VERSION = 0.02;

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

        clockStyle: { type: 'vertical' },
        setClockStyle: (clockStyle) => set({ clockStyle }),

        timers: [],
        setTimers: (timers) => set({ timers }),

        weather: { ...WEATHER_STORED_DEFAULT },
        setWeather: (weather) => set({ weather }),

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
      },
    ),
  ),
);
