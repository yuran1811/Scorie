import { FC } from 'react';
import { DivProps } from 'shared';
import { Overlay } from './Overlay';

export const ModalBox: FC<DivProps> = ({ onClick, children }) => (
	<div className='z-[11] flexcenter fullscreen'>
		<Overlay zIdx='1' background='bg-slate-700' onClick={onClick} />

		<div className='z-[2] absolute top-[12rem] max-w-[80%] text-[5rem] text-white'>
			<div className='max-h-[calc(100vh-15rem)] font-bold text-center text-rose-600 bg-violet-200 scrollY rounded-[3rem]'>
				{children}
			</div>
		</div>
	</div>
);
