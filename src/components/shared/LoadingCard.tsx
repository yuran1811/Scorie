import { FC, HTMLProps } from 'react';

export const LoadingCard: FC<HTMLProps<HTMLDivElement>> = ({ className }) => (
	<div
		className={`${
			className || ''
		} cursor-pointer tablet:max-w-[25rem] w-full h-[30rem] p-4 rounded-[2.5rem] bg-slate-400`}
	/>
);
