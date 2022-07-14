import { FC } from 'react';
import { DivProps } from 'shared';

export const ErrorText: FC<DivProps> = ({ children, className }) => (
	<div className={`text-white text-center font-bold ${className || ''}`}>{children}</div>
);
