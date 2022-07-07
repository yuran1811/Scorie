import { Overlay } from './Overlay';
import { DivProps } from 'shared';
import React, { FC } from 'react';
import { createPortal } from 'react-dom';

export const ConfirmBox: FC<DivProps> = ({ children, onClick }) => {
	return createPortal(
		<div className='z-[100] flexcenter fullscreen'>
			<Overlay zIdx='1' background='bg-slate-700' onClick={onClick} />

			<div className='z-[2] absolute top-[12rem] max-w-[80%] text-[5rem] text-white'>
				<div
					className={`${
						'' || ''
					} max-h-[calc(100vh-15rem)] font-bold text-center text-rose-600 bg-indigo-300 scrollY rounded-[3rem]`}
				>
					{children}
				</div>
			</div>
		</div>,
		document.getElementById('modal-container') as HTMLElement
	);
};
