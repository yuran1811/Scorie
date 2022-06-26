import { useAuth } from 'contexts';
import { useLocalStore } from 'hooks';
import { createContext, Dispatch, FC, useContext, useEffect } from 'react';
import { fakeScoresProps } from 'services';

export interface ScoresProviderProps {
	scores: fakeScoresProps[];
	setScoresData: Dispatch<fakeScoresProps[]> | null;
}

export const ScoresContext = createContext<ScoresProviderProps>({ scores: [], setScoresData: null });

export const ScoresProvider: FC = ({ children }) => {
	const [localData, setLocalData] = useLocalStore<fakeScoresProps[]>('scores', [], '[]');

	const { auth } = useAuth();

	useEffect(() => {
		if (auth.isAuth) setLocalData([]);
		console.log('Auth change -> Score Provider');
	}, [auth]);

	return (
		<ScoresContext.Provider value={{ scores: localData, setScoresData: setLocalData }}>
			{children}
		</ScoresContext.Provider>
	);
};

export const useScoresData = () => useContext(ScoresContext);
