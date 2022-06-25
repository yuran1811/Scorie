import { FC, HTMLProps } from 'react';

interface OverlayProps {
	zIdx?: string;
	background?: string;
}

export const Overlay: FC<OverlayProps & HTMLProps<HTMLDivElement>> = ({ zIdx, background, ...otherProps }) => (
	<div
		{...otherProps}
		className={`${zIdx || 'z-10'} cursor-pointer fixed top-0 left-0 w-[100vw] h-[100vh] ${background || 'bg-slate-700'} opacity-80`}
	></div>
);
