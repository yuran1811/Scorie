import { createContext, Dispatch, FC, SetStateAction, useContext, useState } from 'react';

interface AppStatusType {
  type: string;
  message: string;
  openModal: boolean;
  badges: {
    changeLog: number;
  };
  Content?: any;
}

interface AppStatusProviderProps {
  status: AppStatusType;
  setStatus: Dispatch<SetStateAction<AppStatusType>> | null;
}

const DEFAULT_STATUS: AppStatusType = {
  type: '',
  message: '',
  openModal: false,
  badges: {
    changeLog: 0,
  },
};

export const AppStatusContext = createContext<AppStatusProviderProps>({
  status: { ...DEFAULT_STATUS },
  setStatus: null,
});

export const AppStatusProvider: FC = ({ children }) => {
  const [status, setStatus] = useState({ ...DEFAULT_STATUS });

  return (
    <AppStatusContext.Provider value={{ status, setStatus }}>{children}</AppStatusContext.Provider>
  );
};

export const useAppStatus = () => useContext(AppStatusContext);
