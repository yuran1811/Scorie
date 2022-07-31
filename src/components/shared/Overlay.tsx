import { DivProps } from '@/shared';
import { FC } from 'react';

interface OverlayProps {
  zIdx?: string;
  background?: string;
}

export const Overlay: FC<OverlayProps & DivProps> = ({ zIdx, background, ...otherProps }) => (
  <div
    {...otherProps}
    className={`fullscreen cursor-pointer ${zIdx || 'z-10'} ${background || 'bg-gray-800/90'} `}
  />
);
