import { FC, HTMLProps } from 'react';

export const FeatureCard: FC<HTMLProps<HTMLDivElement>> = ({ title, className, children, ...otherProps }) => (
	<div {...otherProps} className={`${className || ''} cursor-pointer w-[25rem] h-[25rem] rounded-[2rem] p-8 m-6`}>
		{title ? <div className='font-bold text-[4.2rem] text-center text-white line-clamp-1'>{title}</div> : ''}
		<div className='font-bold text-[2.8rem] text-center text-white line-clamp-3'>{children}</div>
	</div>
);
