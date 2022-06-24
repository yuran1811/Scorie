import { createContext, Dispatch, FC, SetStateAction, useContext, useState } from 'react';

interface AccountPanelProviderProps {
	active: boolean;
	setActive: Dispatch<SetStateAction<boolean>> | null;
}

export const AccountPanelContext = createContext<AccountPanelProviderProps>({
	active: false,
	setActive: null,
});

export const AccountPanelProvider: FC = ({ children }) => {
	const [active, setActive] = useState(false);

	return <AccountPanelContext.Provider value={{ active, setActive }}>{children}</AccountPanelContext.Provider>;
};

export const useAccountPanel = () => useContext(AccountPanelContext);
