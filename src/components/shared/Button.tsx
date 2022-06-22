import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps {
	content?: string;
}

export const Button: FC<ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({ content = 'Button', ...props }) => (
	<button
		{...props}
		className='mt-[1rem] mx-auto px-[2.5rem] py-[0.6rem] font-semibold text-[3rem] text-center text-ctbg bg-ctcolor border-ctbg border-[0.4rem] rounded-[3rem] hover:bg-ctbg hover:text-white active:bg-ctbg active:text-white transition-all'
	>
		{content}
	</button>
);
