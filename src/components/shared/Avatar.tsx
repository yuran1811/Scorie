import { FC, HTMLProps } from 'react';

interface AvatarProps {
	imgUrl: string;
	radius: string;
}

export const Avatar: FC<AvatarProps & HTMLProps<HTMLDivElement>> = (props) => {
	const { imgUrl, radius, ...otherProps } = props;

	return (
		<div
			{...otherProps}
			style={{
				width: radius,
				height: radius,
				borderRadius: '50%',
				background: imgUrl ? `url(${imgUrl})` : '#a5b4fc',
				backgroundSize: 'conver',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				border: '0.4rem solid white',
			}}
		></div>
	);
};
