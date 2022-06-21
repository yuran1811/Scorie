import { FC, HTMLProps, SVGProps } from 'react';

interface TitleProps {
	content: string;
	Icon: FC<SVGProps<SVGSVGElement>>;
}

export const Title: FC<TitleProps & HTMLProps<HTMLDivElement>> = ({ Icon, content }) => {
	return (
		<div className='max-w-[30rem] w-full m-auto flex items-center justify-center bg-indigo-400 px-[2rem] py-[0.5rem] rounded-[1.8rem]'>
			<Icon className='text-white cursor-pointer min-w-[3.5rem]' width='35' height='35' />
			<span className='font-bold text-[3.5rem] text-left ml-[1rem] line-clamp-1'>{content}</span>
		</div>
	);
};
