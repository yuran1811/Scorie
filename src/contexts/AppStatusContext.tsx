import { createContext, Dispatch, FC, SetStateAction, useContext, useState } from 'react';

interface AppStatusType {
	type: string;
	message: string;
	Content?: any;
	openModal: boolean;
}

interface AppStatusProviderProps {
	status: AppStatusType;
	setStatus: Dispatch<SetStateAction<AppStatusType>> | null;
}

export const AppStatusContext = createContext<AppStatusProviderProps>({
	status: { type: '', message: '', openModal: false },
	setStatus: null,
});

export const AppStatusProvider: FC = ({ children }) => {
	const [status, setStatus] = useState({ type: '', message: '', openModal: false });

	return <AppStatusContext.Provider value={{ status, setStatus }}>{children}</AppStatusContext.Provider>;
};

export const useAppStatus = () => useContext(AppStatusContext);
