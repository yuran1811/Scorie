import { FC, HTMLProps } from 'react';

interface ErrorTextProps {
	extraStyle: string;
}

export const ErrorText: FC<ErrorTextProps & HTMLProps<HTMLDivElement>> = ({ children, extraStyle }) => (
	<div className={`text-white text-center font-bold ${extraStyle || ''}`}>{children}</div>
);
