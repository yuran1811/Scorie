import { FC } from 'react';
import { DivProps } from 'shared';

export const FeatureCard: FC<DivProps> = ({ title, className, children, ...otherProps }) => (
	<div {...otherProps} className={`${className || ''} cursor-pointer w-[25rem] h-[25rem] rounded-[2rem] m-6 scrollY`}>
		{title && (
			<div className='sticky top-0 left-0 pt-6 px-6 pb-2 font-bold text-[4.2rem] text-center text-white bg-inherit line-clamp-1'>
				{title}
			</div>
		)}
		<div className='font-bold text-[2.8rem] text-center text-white'>{children}</div>
	</div>
);
