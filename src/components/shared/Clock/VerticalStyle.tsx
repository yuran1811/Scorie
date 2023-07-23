import { formatTime } from '@/utils';
import { FC } from 'react';

export const VerticalClockStyle: FC<{ timestamp: number }> = ({ timestamp }) => (
  <div className='relative before:absolute before:left-1/2 before:top-1/2 before:z-[-1] before:h-[4rem] before:w-[2.8rem] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-xl before:bg-gray-800 before:brightness-125 before:content-[""] after:absolute after:-left-[3px] after:top-1/2 after:h-[2.5rem] after:w-[1px] after:-translate-y-1/2 after:bg-white after:shadow-[32.5px_0_0_white] after:content-[""]'>
    <div className="flexcentercol w-full p-2 text-[1.7rem] font-bold leading-7">
      <div className="">{formatTime(timestamp, 'HH')}</div>
      <div className="textGradient">{formatTime(timestamp, 'mm')}</div>
    </div>
  </div>
);
