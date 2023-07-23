import { formatTime } from '@/utils';
import { FC } from 'react';

export const DarkDimClockStyle: FC<{ timestamp: number }> = ({ timestamp }) => (
  <div className='relative before:absolute before:left-1/2 before:top-1/2 before:z-[-1] before:h-[4rem] before:w-[2.8rem] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-xl before:border before:border-gray-400 before:bg-gray-900 before:content-[""]'>
    <div className="flexcentercol w-max p-2 text-[1.7rem] leading-7">
      <div className="textGradient !bg-gradient-to-br !from-gray-800 !to-gray-300 !font-semibold">
        {formatTime(timestamp, 'HH')}
      </div>
      <div className="textGradient !bg-gradient-to-br !from-gray-800 !to-gray-300 !font-semibold">
        {formatTime(timestamp, 'mm')}
      </div>
    </div>
  </div>
);
