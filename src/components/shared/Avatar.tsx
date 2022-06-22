import { FC, HTMLProps } from 'react';

interface AvatarProps {
	imgUrl: string;
	radius: string;
}

export const Avatar: FC<AvatarProps & HTMLProps<HTMLDivElement>> = ({ imgUrl, radius, ...otherProps }) => (
	<div
		{...otherProps}
		style={{
			width: radius,
			height: radius,
			minWidth: radius,
			minHeight: radius,
			borderRadius: '50%',
			background: imgUrl ? `url(${imgUrl})` : '#a5b4fc',
			backgroundSize: 'conver',
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
			border: '0.4rem solid white',
		}}
	></div>
);
