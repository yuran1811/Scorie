import { formatTime } from '@/utils';
import { FC } from 'react';

export const HorizontalClockStyle: FC<{ timestamp: number }> = ({ timestamp }) => (
  <div className="relative">
    <div className="flexcenter w-max p-2 text-[1.7rem] font-bold leading-7">
      <div className="">{formatTime(timestamp, 'HH')}</div>
      <div className="animate-pulse p-[2px]">:</div>
      <div className="textGradient">{formatTime(timestamp, 'mm')}</div>
    </div>
  </div>
);
