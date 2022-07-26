import { DivProps } from '@/shared';
import { FC } from 'react';

interface OverlayProps {
  zIdx?: string;
  background?: string;
}

export const Overlay: FC<OverlayProps & DivProps> = ({ zIdx, background, ...otherProps }) => (
  <div
    {...otherProps}
    className={`${zIdx || 'z-10'} cursor-pointer fullscreen ${background || 'bg-gray-800/90'} `}
  />
);
