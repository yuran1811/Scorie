import { DivProps } from '@/shared';
import { FC } from 'react';

export const LoadingCard: FC<DivProps> = ({ className }) => (
  <div
    className={`${
      className || ''
    } m-6 h-[30rem] w-full cursor-pointer rounded-[2.5rem] bg-slate-400 p-4 tablet:max-w-[25rem]`}
  />
);
