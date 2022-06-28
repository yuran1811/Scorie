import { SCORE_VIEW_DATA_DEFAULT } from '../constants';
import { createContext, FC, useContext, useState } from 'react';
import { ScoreDetailProviderProps, ScoreViewDetailProps } from 'shared/types';

export const ScoreDetailContext = createContext<ScoreDetailProviderProps>({
	viewDetail: {
		data: { ...SCORE_VIEW_DATA_DEFAULT },
		isOpened: false,
	},
	setViewDetail: null,
});

export const ScoreDetailProvider: FC = ({ children }) => {
	const [viewDetail, setViewDetail] = useState<ScoreViewDetailProps>({
		data: { ...SCORE_VIEW_DATA_DEFAULT },
		isOpened: false,
	});

	return <ScoreDetailContext.Provider value={{ viewDetail, setViewDetail }}>{children}</ScoreDetailContext.Provider>;
};

export const useScoreDetail = () => useContext(ScoreDetailContext);
