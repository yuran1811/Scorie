import { DivProps } from '@/shared';
import { FC } from 'react';

export const LoadingCard: FC<DivProps> = ({ className = '' }) => (
  <div
    className={`medtab:max-w-[25rem] m-6 h-[30rem] w-full cursor-pointer rounded-[2.5rem] bg-slate-600/60 p-4 backdrop-blur-lg ${className}`}
  />
);
