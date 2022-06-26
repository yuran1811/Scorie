import { createContext, FC, useContext, useState } from 'react';
import { ScoreDetailProviderProps, ScoreViewDetailProps } from 'shared/types';
import { VIEW_DATA_DEFAULT } from '../constants';

export const ScoreDetailContext_Default = { data: { ...VIEW_DATA_DEFAULT }, isOpened: false };

export const ScoreDetailContext = createContext<ScoreDetailProviderProps>({
	viewDetail: { ...ScoreDetailContext_Default },
	setViewDetail: null,
});

export const ScoreDetailProvider: FC = ({ children }) => {
	const [viewDetail, setViewDetail] = useState<ScoreViewDetailProps>({ ...ScoreDetailContext_Default });

	return <ScoreDetailContext.Provider value={{ viewDetail, setViewDetail }}>{children}</ScoreDetailContext.Provider>;
};

export const useScoreDetail = () => useContext(ScoreDetailContext);
