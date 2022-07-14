import { createContext, Dispatch, FC, SetStateAction, useContext, useState } from 'react';

interface ErrorModalProviderProps {
	error: string;
	setError: Dispatch<SetStateAction<string>> | null;
}

export const ErrorModalContext = createContext<ErrorModalProviderProps>({
	error: '',
	setError: null,
});

export const ErrorModalProvider: FC = ({ children }) => {
	const [error, setError] = useState('');

	return <ErrorModalContext.Provider value={{ error, setError }}>{children}</ErrorModalContext.Provider>;
};

export const useErrorModal = () => useContext(ErrorModalContext);
