import { PlusIcon } from 'components/icons';
import { FC, useCallback, useState } from 'react';
import { NewScoreRecord } from './NewScoreRecord';

export const AddButton: FC = () => {
	const [isOpen, setOpen] = useState(false);

	const onClickHandle = useCallback(() => {
		setOpen((isOpen) => !isOpen);
	}, []);

	return (
		<div
			className='z-[9] flexcenter fixed desktop:right-[10rem] desktop:bottom-[7rem] right-[5rem] bottom-[10rem] w-[7rem] h-[7rem] rounded-[50%] border-[0.5rem] border-indigo-200'
			onClick={onClickHandle}
		>
			<div>
				<PlusIcon className='z-[1] relative top-[-1.5rem] right-[-0.8rem] text-white cursor-pointer' width='55' height='55' />
				{isOpen && <NewScoreRecord />}
			</div>
		</div>
	);
};
