import { FC, SVGProps } from 'react';
import { DivProps } from 'shared';

interface TitleProps {
	content: string;
	Icon: FC<SVGProps<SVGSVGElement>>;
}

export const Title: FC<TitleProps & DivProps> = ({ Icon, content }) => (
	<div className='tablet:max-w-[22rem] w-full tablet:ml-6 flex items-center justify-center bg-indigo-400 px-[2rem] py-[0.5rem] rounded-[1.8rem] overflow-x-hidden'>
		<Icon className='text-white min-w-[3.5rem]' width='35' height='30' />
		<span className='font-bold text-[3.5rem] text-left ml-[1rem] line-clamp-1'>{content}</span>
	</div>
);
