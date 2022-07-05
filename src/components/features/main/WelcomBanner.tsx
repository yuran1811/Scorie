import { FC } from 'react';

export const WelcomBanner: FC = ({ children }) => (
	<div className='flexcentercol tablet:flex-row w-full pt-8'>
		<div className='w-full font-bold text-[4.5rem] tablet:text-[5rem] text-center tablet:text-right tablet:px-2 line-clamp-1'>
			Welcome,
		</div>
		<div className='w-full font-bold text-[6rem] tablet:text-[5rem] text-center tablet:text-left tablet:px-2 line-clamp-1'>
			{children}!
		</div>
	</div>
);
