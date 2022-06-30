import { FC } from 'react';

export const FullScreenLoading: FC = () => (
	<div className='z-40 fullscreen bg-slate-900'>
		<div className='absolute top-0 left-0 text-[7rem] text-center w-full h-full p-6'>Loading . . .</div>
	</div>
);
