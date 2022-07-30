import { DivProps } from '@shared/types';
import React, { FC } from 'react';

export const Badge: FC<DivProps> = ({ className, children }) => {
  const indicator = +(children?.toString() || '') || 0;
  const badgeValue = indicator > 99 ? '99+' : indicator.toString();

  if (!indicator) return <></>;

  return (
    <div
      className={`${
        className || ''
      } flexcenter absolute -top-2 right-2 h-12 w-12 rounded-full bg-vintage1-5 text-center ${
        indicator > 99 ? 'text-[1.6rem]' : 'text-[2rem]'
      }`}
    >
      <span>{badgeValue}</span>
    </div>
  );
};
