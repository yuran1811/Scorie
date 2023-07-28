import { DivProps } from '@/shared';
import { classnames, zIdxOrder } from '@/utils';
import { FC } from 'react';

interface OverlayProps {
  zIdx?: keyof typeof zIdxOrder;
  background?: string;
}

export const Overlay: FC<OverlayProps & DivProps> = ({
  zIdx = 10,
  background = 'bg-zinc-950/90',
  className = '',
  ...otherProps
}) => <div {...otherProps} className={classnames('fullscreen cursor-pointer', className, zIdxOrder[zIdx], background)} />;
