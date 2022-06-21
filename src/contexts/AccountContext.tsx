import { createContext, Dispatch, FC, SetStateAction, useContext, useState } from 'react';

interface AccountProviderProps {
	active: boolean;
	setActive: Dispatch<SetStateAction<boolean>> | null;
}

export const AccountContext = createContext<AccountProviderProps>({
	active: false,
	setActive: null,
});

export const AccountProvider: FC = ({ children }) => {
	const [active, setActive] = useState(false);

	return <AccountContext.Provider value={{ active, setActive }}>{children}</AccountContext.Provider>;
};

export const useAccount = () => useContext(AccountContext);
