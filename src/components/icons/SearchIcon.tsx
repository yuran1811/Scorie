import { FC } from 'react';
import { DivProps } from 'shared';

export const SearchIcon: FC<DivProps> = ({ className }) => (
	<div className={`${className || ''} w-[5rem] h-[5rem] text-white border-current border-[0.6rem] rounded-[50%]`} />
);
