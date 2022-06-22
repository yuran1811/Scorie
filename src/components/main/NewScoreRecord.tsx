import { Button } from 'components/shared';
import React from 'react';

export const NewScoreRecord = () => {
	return (
		<div className='z-8 flexcenter fixed top-0 left-0 w-[100vw] h-[100vh]'>
			<div className='w-full h-full bg-slate-700 opacity-80'></div>
			<div className='absolute flexcentercol !justify-start top-0 mt-[8rem] p-6 w-[50] h-[70%] text-[5rem] text-white'>
				<div className='font-bold text-[4rem] text-center w-full line-clamp-1'>New score</div>
				<Button content='Add' onClick={(e) => e.stopPropagation()} />
			</div>
		</div>
	);
};
