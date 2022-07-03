import { FC } from 'react';
import { ButtonProps } from 'shared';

export const LoadMoreButton: FC<ButtonProps> = ({ children, onClick }) => (
	<button
		className='cursor-pointer relative text-[3.5rem] text-ctbg px-8 py-[0.5rem] m-[2rem] border-none rounded-[1.5rem] bg-ctcolor isAnimated hover:text-ctwhite hover:bg-ctloadmorebg'
		onClick={onClick}
	>
		{children}
	</button>
);
