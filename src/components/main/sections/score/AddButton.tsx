import { PlusIcon } from 'components/icons';
import { FC, HTMLProps } from 'react';

export const AddButton: FC<HTMLProps<HTMLDivElement>> = ({ onClick }) => (
	<div
		className='z-[10] cursor-pointer flexcenter fixed desktop:right-[10rem] right-[5rem] desktop:bottom-[7rem] tablet:bottom-[10rem] bottom-[7rem] w-[7rem] h-[7rem] rounded-[50%] border-[0.5rem] border-indigo-200 bg-ctbg'
		onClick={onClick}
	>
		<PlusIcon
			className='z-[1] relative top-[-1.5rem] right-[-0.8rem] text-white cursor-pointer'
			width='55'
			height='55'
		/>
	</div>
);
