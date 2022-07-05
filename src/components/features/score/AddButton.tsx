import { PlusIcon } from 'components/icons';
import { DivProps } from 'shared';
import { FC } from 'react';

export const AddButton: FC<DivProps> = ({ onClick }) => (
	<div
		className='opacity-30 mobile:opacity-100 z-[10] active:opacity-100 hover:opacity-100 cursor-pointer flexcenter fixed desktop:right-[10rem] right-[5rem] desktop:bottom-[7rem] tablet:bottom-[10rem] bottom-[7rem] w-[7rem] h-[7rem] rounded-[50%] border-[0.5rem] border-indigo-200 bg-ctbg'
		onClick={onClick}
	>
		<PlusIcon
			className='z-[1] relative top-[-1.5rem] right-[-0.8rem] text-white cursor-pointer'
			width='55'
			height='55'
		/>
	</div>
);
