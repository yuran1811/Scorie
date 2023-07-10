import { DivProps } from '@/shared';
import { FC } from 'react';

export const LoadingCard: FC<DivProps> = ({ className = '' }) => (
  <div
    className={`m-6 h-[30rem] w-full cursor-pointer rounded-[2.5rem] bg-slate-600 p-4 medtab:max-w-[25rem] ${className}`}
  />
);
