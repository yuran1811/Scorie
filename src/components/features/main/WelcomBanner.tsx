import { FC } from 'react';

export const WelcomBanner: FC = ({ children }) => (
	<div className='flexcentercol tablet:flex-row w-full pt-8'>
		<div className='w-full font-bold text-[4.5rem] tablet:text-[5rem] text-center tablet:px-2'>
			Welcome, {children}!
		</div>
	</div>
);
