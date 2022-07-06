import { FC } from 'react';
import { DivProps } from 'shared';

export const ClickAway: FC<DivProps> = ({ className, onClick }) => (
	<div
		className={`isAnimated fullscreen cursor-default bg-slate-800 opacity-80 ${className || 'z-[100]'}`}
		onClick={onClick}
	/>
);
