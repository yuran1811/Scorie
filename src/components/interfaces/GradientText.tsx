import { DivProps } from '@/shared';
import { FC } from 'react';

export const GradientText: FC<DivProps> = ({ children, className = '' }) => (
  <div className={`textGradient inline-block ${className}`}>{children}</div>
);
