import { DivProps } from '@/shared';
import { FC } from 'react';

export const GradientUnderline: FC<DivProps> = ({ className = '' }) => (
  <div className={`gradientBG m-auto h-1 max-w-full animate-gdMoveHori ${className}`} />
);
