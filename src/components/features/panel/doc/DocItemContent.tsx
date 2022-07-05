import { FC } from 'react';

export const DocItemContent: FC = ({ children }) => (
	<div className='text-[3rem] top-[7rem] left-0 w-full mobile:w-[calc(100%-3rem)] p-6 mb-16 border-[0.5rem] border-ctbg rounded-[2rem]'>
		{children}
	</div>
);