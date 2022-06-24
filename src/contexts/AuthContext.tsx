import { useLocalStore } from 'hooks';
import { createContext, Dispatch, FC, useContext, useReducer } from 'react';
import { validateFakeUserData } from 'services';
import { AUTH_CONTEXT_DEFAULT } from '../constants';

export interface UserType {
	email?: string;
	password?: string;
	reset?: boolean;
}

export interface AuthStateType {
	// extends UserType {

	name: string;
	isAuth: boolean | null;
	errorMessage: string;
	// 	type: string;
}

export interface AuthProviderProps {
	auth: AuthStateType;
	setAuth: Dispatch<UserType> | null;
}

export const AuthContext = createContext<AuthProviderProps>({
	auth: { ...AUTH_CONTEXT_DEFAULT },
	setAuth: null,
});

export const AuthProvider: FC = ({ children }) => {
	const [localData, setLocalData] = useLocalStore<AuthStateType>('data', { ...AUTH_CONTEXT_DEFAULT }, '{}');

	const [auth, setAuth] = useReducer((state: AuthStateType, { email, password, reset }: UserType): AuthStateType => {
		if (reset) {
			const resetData = {
				name: '',
				isAuth: null,
				errorMessage: '',
			};

			setLocalData(resetData);
			return resetData;
		}

		const resp = validateFakeUserData({
			email: email ? email.trim().toLowerCase() : '',
			password: password ? password.trim().toLowerCase() : '',
		});

		setLocalData({ ...resp });

		return resp;
	}, localData || { ...AUTH_CONTEXT_DEFAULT });

	// useEffect(() => {
	// 	window.addEventListener('load', async () => {
	// 		console.log((await checkOnlineStatus()) ? 'Online' : 'Offline');
	// 	});
	// }, []);

	return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
