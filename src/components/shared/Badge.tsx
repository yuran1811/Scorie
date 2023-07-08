import { DivProps } from '@shared/types';
import React, { FC } from 'react';

interface BadgeProps {
  showIndicator?: boolean;
}

export const Badge: FC<BadgeProps & DivProps> = ({ showIndicator = true, className = '', children }) => {
  const indicator = +(children?.toString() || '') || 0;
  const badgeValue = indicator > 99 ? '99+' : indicator.toString();

  if (!indicator) return <></>;

  return (
    <div
      className={`flexcenter absolute -top-2 right-2 h-12 w-12 rounded-full border-2 border-rose-200 bg-rose-500 text-center ${className} ${
        indicator > 99 ? 'text-[1.6rem]' : 'text-[2rem]'
      }`}
    >
      {showIndicator && <span>{badgeValue}</span>}
    </div>
  );
};
