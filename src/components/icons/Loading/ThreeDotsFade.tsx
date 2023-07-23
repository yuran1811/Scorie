import { DivProps } from '@/shared';
import { FC } from 'react';

const dotStyle = `w-[1.6rem] h-[1.6rem] rounded-full bg-current animate-threeDots`;

export const ThreeDotsFade: FC<DivProps> = ({ className = '' }) => (
  <div className={`flex w-[6rem] flex-row flex-nowrap items-center justify-between ${className}`}>
    <div className={dotStyle} style={{ animationDelay: '-0.4s' }}></div>
    <div className={dotStyle} style={{ animationDelay: '-0.2s' }}></div>
    <div className={dotStyle} style={{ animationDelay: '0' }}></div>
  </div>
);
