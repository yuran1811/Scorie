import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps {
	content?: string;
	before?: boolean;
}

export const Button: FC<ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({
	children,
	className,
	before = true,
	content = 'Button',
	...props
}) => (
	<button
		{...props}
		className={`${
			className || ''
		} flexcenter flex-wrap my-[1.5rem] mx-auto px-[2.5rem] py-[0.6rem] font-semibold text-[4rem] text-center text-ctbg bg-ctcolor border-ctbg border-[0.4rem] rounded-[3rem] hover:bg-ctbg hover:text-white active:bg-ctbg active:text-white transition-all disabled:brightness-50`}
	>
		{before && children}

		<span className='line-clamp-1'>{content}</span>

		{!before && children}
	</button>
);
