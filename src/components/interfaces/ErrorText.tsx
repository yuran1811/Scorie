import { FC } from 'react';
import { DivProps } from 'shared';

interface ErrorTextProps {
	extraStyle: string;
}

export const ErrorText: FC<ErrorTextProps & DivProps> = ({ children, extraStyle }) => (
	<div className={`text-white text-center font-bold ${extraStyle || ''}`}>{children}</div>
);
