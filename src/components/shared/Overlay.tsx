import { FC, HTMLProps } from 'react';

interface OverlayProps {
	zIdx?: string;
	background?: string;
}

export const Overlay: FC<OverlayProps & HTMLProps<HTMLDivElement>> = ({ zIdx, background, ...otherProps }) => (
	<div
		{...otherProps}
		className={`${zIdx || 'z-10'} cursor-pointer fullscreen ${background || 'bg-slate-700'} opacity-80`}
	/>
);
