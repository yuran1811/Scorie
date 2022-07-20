import { DivProps } from '@/shared';
import { FC } from 'react';

export const LoadingCard: FC<DivProps> = ({ className }) => (
  <div
    className={`${
      className || ''
    } cursor-pointer tablet:max-w-[25rem] w-full h-[30rem] p-4 m-6 rounded-[2.5rem] bg-slate-400`}
  />
);
