import { FC, HTMLProps } from 'react';

const dotStyle = `w-[1.6rem] h-[1.6rem] rounded-[50%] bg-red-400 animate-threeDots`;

export const ThreeDotsFade: FC<HTMLProps<HTMLDivElement>> = ({ className }) => (
	<div className={`${className || ''} w-[6rem] flex flex-row flex-nowrap items-center justify-between`}>
		<div className={dotStyle} style={{ animationDelay: '-0.4s' }}></div>
		<div className={dotStyle} style={{ animationDelay: '-0.2s' }}></div>
		<div className={dotStyle} style={{ animationDelay: '0' }}></div>
	</div>
);
