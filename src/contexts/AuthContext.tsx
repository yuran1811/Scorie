import { NotesProvider, ScoresProvider } from 'contexts';
import { createContext, Dispatch, FC, useContext, useReducer } from 'react';
import { fakeNotesProps, fakeScoresProps, validateFakeUserData } from 'services';
import { AUTH_CONTEXT_DEFAULT } from '../constants';
import { useNotesData, useScoresData } from './index';

export interface UserType {
	email?: string;
	password?: string;
	reset?: boolean;
}

export interface AuthStateType {
	name: string;
	isAuth: boolean | null;
	errorMessage: string;
}

export interface AuthDataContextType {
	data: {
		scores: fakeScoresProps[];
		notes: fakeNotesProps[];
	};
}

export interface AuthProviderProps {
	auth: AuthStateType;
	setAuth: Dispatch<UserType> | null;
}

export const AuthContext = createContext<AuthProviderProps>({
	auth: { ...AUTH_CONTEXT_DEFAULT },
	setAuth: null,
});

export const AuthDataContext = createContext<AuthDataContextType>({
	data: {
		notes: [],
		scores: [],
	},
});

export const AuthDataProvider: FC = ({ children }) => {
	const { notes } = useNotesData();
	const { scores } = useScoresData();

	return <AuthDataContext.Provider value={{ data: { notes, scores } }}>{children}</AuthDataContext.Provider>;
};

export const AuthProvider: FC = ({ children }) => {
	// const [localData, setLocalData] = useLocalStore<AuthStateType>('data', { ...AUTH_CONTEXT_DEFAULT }, '{}');

	const { setNotesData } = useNotesData();
	const { setScoresData } = useScoresData();

	const [auth, setAuth] = useReducer(
		(state: AuthStateType, { email, password, reset }: UserType): AuthStateType => {
			if (reset) {
				const resetData: AuthStateType = {
					name: '',
					isAuth: null,
					errorMessage: '',
				};

				setNotesData && setNotesData([]);
				setScoresData && setScoresData([]);

				return resetData;
			}

			const {
				data: { scores, notes },
				...resp
			} = validateFakeUserData({
				email: email ? email.trim().toLowerCase() : '',
				password: password ? password.trim().toLowerCase() : '',
			});

			setNotesData && setNotesData(notes);
			setScoresData && setScoresData(scores);

			return resp;
		},
		{ ...AUTH_CONTEXT_DEFAULT }
		// { ...AUTH_CONTEXT_DEFAULT, ...localData }
	);

	return (
		<ScoresProvider>
			<NotesProvider>
				<AuthContext.Provider value={{ auth, setAuth }}>
					<AuthDataProvider>{children}</AuthDataProvider>
				</AuthContext.Provider>
			</NotesProvider>
		</ScoresProvider>
	);
};

export const useAuth = () => useContext(AuthContext);

export const useAuthData = () => useContext(AuthDataContext);
