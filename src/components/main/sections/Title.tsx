import { FC, HTMLProps, SVGProps } from 'react';

interface TitleProps {
	content: string;
	Icon: FC<SVGProps<SVGSVGElement>>;
}

export const Title: FC<TitleProps & HTMLProps<HTMLDivElement>> = ({ Icon, content }) => {
	return (
		<div className='w-full flex items-center justify-start bg-indigo-400 px-[1rem] rounded-[1.8rem]'>
			<Icon className='text-white cursor-pointer min-w-[3.5rem]' width='35' height='35' />
			<span className='font-bold text-[3.5rem] text-left ml-[1rem] line-clamp-1'>{content}</span>
		</div>
	);
};
