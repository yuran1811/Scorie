import { FC } from 'react';
import { DivProps } from 'shared';
import { Overlay } from 'components/shared';

export const ModalBox: FC<DivProps> = ({ className,onClick, children }) => (
	<div className='z-[100] flexcenter fullscreen'>
		<Overlay zIdx='1' background='bg-slate-700' onClick={onClick} />

		<div className='z-[2] absolute top-[12rem] max-w-[80%] text-[5rem] text-white'>
			<div className={`${className || ''} max-h-[calc(100vh-15rem)] font-bold text-center text-rose-600 bg-indigo-300 scrollY rounded-[3rem]`}>
				{children}
			</div>
		</div>
	</div>
);
