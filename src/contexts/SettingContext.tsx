import { createContext, Dispatch, FC, SetStateAction, useContext, useState } from 'react';

interface SettingProviderProps {
	active: boolean;
	setActive: Dispatch<SetStateAction<boolean>> | null;
}

export const SettingContext = createContext<SettingProviderProps>({
	active: false,
	setActive: null,
});

export const SettingProvider: FC = ({ children }) => {
	const [active, setActive] = useState(false);

	return <SettingContext.Provider value={{ active, setActive }}>{children}</SettingContext.Provider>;
};

export const useSetting = () => useContext(SettingContext);
