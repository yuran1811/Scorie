import { useStore } from 'store';
import { addNewNote } from 'services';
import { NoteDetailType } from 'shared';
import { Input } from 'components/shared';
import { AddIcon } from 'components/icons';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

interface NoteImportProps {
	showImport: boolean;
	setShowImport: Dispatch<SetStateAction<boolean>>;
}

function isNoteData(obj: any): obj is NoteDetailType {
	return (
		'title' in obj &&
		'data' in obj &&
		'theme' in obj &&
		'isPinned' in obj &&
		'isArchived' in obj &&
		'isDone' in obj &&
		'isInProgress' in obj
	);
}

const NoteImport: FC<NoteImportProps> = ({ showImport, setShowImport }) => {
	const currentUser = useStore((s) => s.currentUser);
	const [isError, setError] = useState(false);
	const [inputValue, setInputValue] = useState('');

	const onClickHandle = async () => {
		try {
			if (!currentUser || !currentUser?.uid) return;

			const { id, ...data } = JSON.parse(inputValue);

			if (isNoteData(data)) {
				setError(false);
				await addNewNote(currentUser.uid, { ...data });
			} else {
				setError(true);
			}

			setShowImport(false);
		} catch (error) {
			console.log(error);
			setError(true);
		}
	};

	useEffect(() => {
		setError(false);
	}, [inputValue]);

	return (
		<div
			className={`${!showImport ? '!hidden' : 'z-10'} ${
				isError ? 'bg-rose-400' : 'bg-indigo-200'
			} flexcenter flex-wrap absolute bottom-[-9rem] right-0 p-2 pr-4 min-w-[10rem] w-[70vw] max-w-[40rem] rounded-[3rem]`}
		>
			<div className='flex-1'>
				<Input
					className='focus:!border-indigo-400 mx-2'
					onChange={(e) => setInputValue(e.currentTarget.value)}
				/>
			</div>
			<div className='cursor-pointer' onClick={onClickHandle}>
				<AddIcon width='50' height='50' fill='#4338ca' />
			</div>
		</div>
	);
};

export default NoteImport;
