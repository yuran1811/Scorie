import { AUTH_CONTEXT_DEFAULT } from '../constants';
import { createContext, Dispatch, FC, useContext, useReducer } from 'react';
import { useLocalStore } from 'hooks';

interface UserType {
	email: string;
	password: string;
}

interface AuthStateType extends UserType {
	name: string;
	type: string;
	isAuth: boolean;
}

interface AuthProviderProps {
	auth: AuthStateType;
	setAuth: Dispatch<UserType> | null;
}

export const AuthContext = createContext<AuthProviderProps>({
	auth: { ...AUTH_CONTEXT_DEFAULT },
	setAuth: null,
});

export const AuthProvider: FC = ({ children }) => {
	const [localData, setLocalData] = useLocalStore<AuthStateType>('data', { ...AUTH_CONTEXT_DEFAULT }, '{}');

	const [auth, setAuth] = useReducer((state: AuthStateType, { email, password }: UserType): AuthStateType => {
		console.log(email, password, state);

		if (email === 'a@gmail.com' && password === 'aaaaaa') {
			setLocalData({ email, password: 'aaaaaa', name: email, type: 'ADMIN', isAuth: true });
			return { email, password: 'aaaaaa', name: email, type: 'ADMIN', isAuth: true };
		}

		setLocalData({ ...AUTH_CONTEXT_DEFAULT });
		return { ...AUTH_CONTEXT_DEFAULT };
	}, localData || { ...AUTH_CONTEXT_DEFAULT });

	return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
