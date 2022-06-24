import { FC, HTMLProps } from 'react';

interface ErrorMessageProps {
	extraStyle?: string;
	content: string;
}

export const ErrorMessage: FC<ErrorMessageProps & HTMLProps<HTMLDivElement>> = ({ content, extraStyle }) => (
	<div className={`text-rose-700 text-center font-semibold ${extraStyle || ''}`}>{content}</div>
);
