import { createContext, FC, useContext, useState } from 'react';
import { ScoreDetailProviderProps, ScoreViewDetailProps } from 'shared/types';

export const ScoreDetailContext = createContext<ScoreDetailProviderProps>({
	viewDetail: { id: '', isOpened: false },
	setViewDetail: null,
});

export const ScoreDetailProvider: FC = ({ children }) => {
	const [viewDetail, setViewDetail] = useState<ScoreViewDetailProps>({ id: '', isOpened: false });
	return <ScoreDetailContext.Provider value={{ viewDetail, setViewDetail }}>{children}</ScoreDetailContext.Provider>;
};

export const useScoreDetail = () => useContext(ScoreDetailContext);
