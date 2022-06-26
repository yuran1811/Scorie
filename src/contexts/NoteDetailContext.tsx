import { createContext, FC, useContext, useState } from 'react';
import { NoteDetailProviderProps, NoteViewDetailProps } from 'shared/types';
import { NOTE_VIEW_DATA_DEFAULT } from '../constants';

export const NoteDetailContext_Default = { data: { ...NOTE_VIEW_DATA_DEFAULT }, isOpened: false };

export const NoteDetailContext = createContext<NoteDetailProviderProps>({
	viewDetail: { ...NoteDetailContext_Default },
	setViewDetail: null,
});

export const NoteDetailProvider: FC = ({ children }) => {
	const [viewDetail, setViewDetail] = useState<NoteViewDetailProps>({ ...NoteDetailContext_Default });

	return <NoteDetailContext.Provider value={{ viewDetail, setViewDetail }}>{children}</NoteDetailContext.Provider>;
};

export const useNoteDetail = () => useContext(NoteDetailContext);
