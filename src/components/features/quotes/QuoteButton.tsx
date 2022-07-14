import { ButtonProps } from 'shared';
import { AddIcon, ArrowLeftIcon, ArrowRightIcon } from 'components/icons';
import { FC } from 'react';

export const PrevQuoteButton: FC<ButtonProps> = ({ onClick }) => (
	<button className='right-[10rem] group' onClick={onClick}>
		<ArrowLeftIcon className='isAnimated group-hover:translate-x-[-0.6rem]' width='40' height='40' />
	</button>
);

export const NextQuoteButton: FC<ButtonProps> = ({ onClick }) => (
	<button className='right-[5rem] group' onClick={onClick}>
		<ArrowRightIcon className='isAnimated group-hover:translate-x-[0.6rem]' width='40' height='40' />
	</button>
);

export const FetchQuoteButton: FC<ButtonProps> = ({ onClick }) => (
	<button className='right-[5rem] group' onClick={onClick}>
		<AddIcon className='isAnimated group-hover:translate-x-[0.6rem]' width='40' height='40' />
	</button>
);
