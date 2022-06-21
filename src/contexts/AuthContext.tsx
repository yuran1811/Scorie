import { AUTH_CONTEXT_DEFAULT } from '../constants';
import { createContext, Dispatch, FC, useContext, useReducer } from 'react';

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
	const [auth, setAuth] = useReducer(
		(state: AuthStateType, { email, password }: UserType): AuthStateType => {
			console.log(email, password, state);

			if (email === 'a@gmail.com' && password === 'aaaaaa')
				return { email, password: 'aaaaaa', name: email, type: 'ADMIN', isAuth: true };
			return { ...AUTH_CONTEXT_DEFAULT };
		},
		{ ...AUTH_CONTEXT_DEFAULT }
	);

	return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
