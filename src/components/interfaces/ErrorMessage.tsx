import { FC } from 'react';
import { DivProps } from 'shared';

interface ErrorMessageProps {
	extraStyle?: string;
	content: string;
}

export const ErrorMessage: FC<ErrorMessageProps & DivProps> = ({ content, extraStyle }) => (
	<div className={`text-rose-700 text-center font-semibold ${extraStyle || ''}`}>{content}</div>
);
