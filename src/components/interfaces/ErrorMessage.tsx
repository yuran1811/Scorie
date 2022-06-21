import { FC, HTMLProps } from 'react';

interface ErrorMessageProps {
	extraStyle?: string;
	content: string;
}

export const ErrorMessage: FC<ErrorMessageProps & HTMLProps<HTMLDivElement>> = ({ content, extraStyle }) => (
	<div className={`text-red-500 text-center font-medium ${extraStyle || ''}`}>{content}</div>
);
