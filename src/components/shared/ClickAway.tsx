import { FC } from 'react';
import { DivProps } from 'shared';

export const ClickAway: FC<DivProps> = ({ className, onClick }) => (
	<div className={`fullscreen cursor-default ${className || 'z-[100]'}`} onClick={onClick} />
);
