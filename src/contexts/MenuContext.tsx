import { createContext, Dispatch, FC, SetStateAction, useContext, useState } from 'react';

interface MenuProviderProps {
	active: boolean;
	setActive: Dispatch<SetStateAction<boolean>> | null;
}

export const MenuContext = createContext<MenuProviderProps>({
	active: false,
	setActive: null,
});

export const MenuProvider: FC = ({ children }) => {
	const [active, setActive] = useState(false);

	return <MenuContext.Provider value={{ active, setActive }}>{children}</MenuContext.Provider>;
};

export const useMenu = () => useContext(MenuContext);
