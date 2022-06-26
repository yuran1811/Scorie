import { createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react';
import { checkOnlineStatus } from 'utils';

interface NetworkProviderProps {
	active: boolean;
	setActive: Dispatch<SetStateAction<boolean>> | null;
}

export const NetworkContext = createContext<NetworkProviderProps>({
	active: false,
	setActive: null,
});

export const NetworkProvider: FC = ({ children }) => {
	const [active, setActive] = useState(false);

	useEffect(() => {
		window.addEventListener('load', async () => {
			const status = await checkOnlineStatus();
			setActive(status);
			console.log(status ? 'Online' : 'Offline');
		});
	}, []);

	return <NetworkContext.Provider value={{ active, setActive }}>{children}</NetworkContext.Provider>;
};

export const useNetwork = () => useContext(NetworkContext);
