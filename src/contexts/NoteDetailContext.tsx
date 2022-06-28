import { createContext, FC, useContext, useState } from 'react';
import { NoteDetailProviderProps, NoteViewDetailProps } from 'shared/types';

export const NoteDetailContext = createContext<NoteDetailProviderProps>({
	viewDetail: { id: '', isOpened: false },
	setViewDetail: null,
});

export const NoteDetailProvider: FC = ({ children }) => {
	const [viewDetail, setViewDetail] = useState<NoteViewDetailProps>({ id: '', isOpened: false });
	return <NoteDetailContext.Provider value={{ viewDetail, setViewDetail }}>{children}</NoteDetailContext.Provider>;
};

export const useNoteDetail = () => useContext(NoteDetailContext);
