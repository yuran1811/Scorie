import { DivProps } from '@/shared';
import { FC } from 'react';

export const ErrorText: FC<DivProps> = ({ children, className }) => (
  <div className={`text-white text-center font-bold ${className || ''}`}>{children}</div>
);
