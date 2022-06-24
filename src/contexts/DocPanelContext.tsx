import { createContext, Dispatch, FC, SetStateAction, useContext, useState } from 'react';

interface DocPanelProviderProps {
	active: boolean;
	setActive: Dispatch<SetStateAction<boolean>> | null;
}

export const DocPanelContext = createContext<DocPanelProviderProps>({
	active: false,
	setActive: null,
});

export const DocPanelProvider: FC = ({ children }) => {
	const [active, setActive] = useState(false);

	return <DocPanelContext.Provider value={{ active, setActive }}>{children}</DocPanelContext.Provider>;
};

export const useDocPanel = () => useContext(DocPanelContext);
