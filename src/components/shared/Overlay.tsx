import { FC, HTMLProps } from 'react';

interface OverlayProps {
	zIdx?: string;
}

export const Overlay: FC<OverlayProps & HTMLProps<HTMLDivElement>> = ({ zIdx, ...otherProps }) => (
	<div
		className={`${zIdx || 'z-10'} cursor-pointer fixed top-0 left-0 w-[100vw] h-[100vh] bg-slate-700 opacity-80`}
		{...otherProps}
	></div>
);
