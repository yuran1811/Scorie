import { AuthDataContextType, useAuth } from 'contexts';
import { useLocalStore } from 'hooks';
import { createContext, Dispatch, FC, useContext, useEffect } from 'react';

export const LOCALDATA_DEFAULT = { data: { notes: [], scores: [] } };

export interface LocalDataProviderProps {
	localData: AuthDataContextType;
	setLocalDataData: Dispatch<AuthDataContextType> | null;
}

export const LocalDataContext = createContext<LocalDataProviderProps>({
	localData: { ...LOCALDATA_DEFAULT },
	setLocalDataData: null,
});

export const LocalDataProvider: FC = ({ children }) => {
	const [localData, setLocalData] = useLocalStore<AuthDataContextType>('localData', { ...LOCALDATA_DEFAULT }, '{}');

	const { auth } = useAuth();

	useEffect(() => {
		if (auth.isAuth) setLocalData({ ...LOCALDATA_DEFAULT });
		console.log('Auth change -> Local data Provider');
	}, [auth]);

	return (
		<LocalDataContext.Provider value={{ localData: localData, setLocalDataData: setLocalData }}>
			{children}
		</LocalDataContext.Provider>
	);
};

export const useLocalDataData = () => useContext(LocalDataContext);
