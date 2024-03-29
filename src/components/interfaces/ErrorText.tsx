import { DivProps } from '@/shared';
import { FC } from 'react';

export const ErrorText: FC<DivProps> = ({ children, className = '' }) => (
  <div className={`typo-sm text-center font-bold text-white/90 ${className}`}>{children}</div>
);
