import { FC, HTMLProps } from 'react';

interface AvatarProps {
	imgUrl: string | null;
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
			background: imgUrl
				? `url(${imgUrl})`
				: 'linear-gradient(-45deg, #325d7f, #6d5c7e, #c06c86, #f2727f, #f9b294)',
			backgroundSize: 'conver',
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
			border: '0.2rem solid white',
		}}
	></div>
);
