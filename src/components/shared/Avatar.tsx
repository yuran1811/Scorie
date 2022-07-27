import { DivProps } from '@/shared';
import { FC } from 'react';

interface AvatarProps {
  imgUrl: string | null;
  radius: string;
}

export const Avatar: FC<AvatarProps & DivProps> = ({ imgUrl, radius, ...otherProps }) => (
  <div
    {...otherProps}
    style={{
      width: radius,
      height: radius,
      minWidth: radius,
      minHeight: radius,
      borderRadius: '50%',
      backgroundImage: !!imgUrl
        ? `url(${imgUrl}), linear-gradient(-45deg, #325d7f, #6d5c7e, #c06c86, #f2727f, #f9b294)`
        : 'linear-gradient(-45deg, #325d7f, #6d5c7e, #c06c86, #f2727f, #f9b294)',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      objectFit: 'cover',
      border: '0.2rem solid white',
    }}
  />
);
