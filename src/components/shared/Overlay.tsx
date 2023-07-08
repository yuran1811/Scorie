import { DivProps } from '@/shared';
import { FC } from 'react';

interface OverlayProps {
  zIdx?: string;
  background?: string;
}

export const Overlay: FC<OverlayProps & DivProps> = ({
  zIdx = 'z-10',
  background = 'bg-zinc-950/80',
  ...otherProps
}) => <div {...otherProps} className={`fullscreen cursor-pointer ${zIdx} ${background}`} />;
