import { FC } from 'react';
import { BlockQuote } from '../quotes/BlockQuote';

export const WelcomBanner: FC = ({ children }) => (
	<div className='flexcentercol w-full pt-8'>
		<div className='w-full font-bold text-[4.5rem] tablet:text-[5rem] text-center tablet:px-2'>
			Welcome, {children}!
		</div>

		<div className='w-full my-8'>
			<BlockQuote />
		</div>
	</div>
);
