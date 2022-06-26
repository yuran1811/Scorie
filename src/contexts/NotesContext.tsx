import { useAuth } from 'contexts';
import { useLocalStore } from 'hooks';
import { createContext, Dispatch, FC, useContext, useEffect } from 'react';
import { fakeNotesProps } from 'services';

export interface NotesProviderProps {
	notes: fakeNotesProps[];
	setNotesData: Dispatch<fakeNotesProps[]> | null;
}

export const NotesContext = createContext<NotesProviderProps>({ notes: [], setNotesData: null });

export const NotesProvider: FC = ({ children }) => {
	const [localData, setLocalData] = useLocalStore<fakeNotesProps[]>('notes', [], '[]');

	const { auth } = useAuth();

	useEffect(() => {
		if (auth.isAuth) setLocalData([]);
		console.log('Auth change -> Note Provider');
	}, [auth]);

	return (
		<NotesContext.Provider value={{ notes: localData, setNotesData: setLocalData }}>
			{children}
		</NotesContext.Provider>
	);
};

export const useNotesData = () => useContext(NotesContext);
