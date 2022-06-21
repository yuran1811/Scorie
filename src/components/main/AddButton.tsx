import { PlusIcon } from 'components/icons';
import { FC, useCallback } from 'react';

export const AddButton: FC = () => {
	const onClickHandle = useCallback(() => {
		console.log('Add new');
	}, []);

	return (
		<div
			className='z-[9] flexcenter fixed right-[5rem] bottom-[5rem] w-[5rem] h-[5rem] rounded-[50%] border-[0.5rem] border-indigo-200'
			onClick={onClickHandle}
		>
			<PlusIcon className='z-[1] relative top-[-0.7rem] right-[-0.5rem] text-white cursor-pointer' width='35' height='35' />
		</div>
	);
};
