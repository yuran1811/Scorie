import { ChangeLogProps } from '@/shared';
import __ from 'lodash';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface StoreType {
  changeLogs: ChangeLogProps[];
  setChangeLogs: (changeLogs: ChangeLogProps[]) => void;

  changeLogsRead: { [version: string]: boolean };
  setChangeLogsRead: (version: string, read: boolean) => void;
}

export const CHANGE_LOG_STORE_NAME = __.kebabCase('Change Log Store');
export const CHANGE_LOG_STORE_VERSION = 0.01;

export const useChangeLogStore = create<StoreType>()(
  devtools(
    persist(
      (set, get) => ({
        changeLogs: [],
        setChangeLogs: (changeLogs) => set({ changeLogs }),

        changeLogsRead: {},
        setChangeLogsRead: (version, read) =>
          set((s) => ({ changeLogsRead: { ...s.changeLogsRead, [version]: read } })),
      }),
      {
        name: CHANGE_LOG_STORE_NAME,
        version: CHANGE_LOG_STORE_VERSION,
      }
    )
  )
);
