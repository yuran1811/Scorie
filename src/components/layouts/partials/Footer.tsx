import { GH_LINK } from '../../../constants';
import { HighlightLink } from 'components/interfaces';
import { FC } from 'react';

export const Footer: FC = () => (
	<footer className='relative w-full font-semibold text-[3rem] text-center px-[1rem] pt-[0.7rem] pb-[2rem]'>
		Made by <HighlightLink url={GH_LINK}>yuran1811</HighlightLink>
	</footer>
);
