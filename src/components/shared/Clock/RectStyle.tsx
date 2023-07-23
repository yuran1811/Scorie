import { formatTime } from '@/utils';
import { FC } from 'react';

export const RectClockStyle: FC<{ timestamp: number }> = ({ timestamp }) => (
  <div className='relative before:absolute before:left-1/2 before:top-1/2 before:z-[-1] before:h-[4rem] before:w-[2.8rem] before:-translate-x-1/2 before:-translate-y-1/2 before:border before:bg-gray-800 before:brightness-125 before:content-[""] after:absolute after:left-1/2 after:top-1/2 after:mt-[0.6px] after:h-[1px] after:w-[18px] after:-translate-x-1/2 after:-translate-y-1/2 after:bg-white after:content-[""]'>
    <div className="flexcentercol w-max p-2 text-[1.7rem] font-semibold leading-7">
      <div>{formatTime(timestamp, 'HH')}</div>
      <div>{formatTime(timestamp, 'mm')}</div>
    </div>
  </div>
);
