import { FC } from 'react';
import { ButtonProps } from 'shared';

interface LogInButtonProps {
	extraStyle?: string;
}

export const LogInButton: FC<LogInButtonProps & ButtonProps> = ({ children, disabled, extraStyle, onClick }) => (
	<button
		disabled={disabled}
		onClick={onClick}
		className={`${
			extraStyle || 'bg-white text-black'
		} cursor-pointer text-[3rem] flex items-center gap-3 min-w-[25rem] my-2 px-6 py-3 rounded-[2rem] transition duration-300 hover:brightness-90 disabled:!cursor-default disabled:!brightness-75`}
	>
		{children}
	</button>
);
