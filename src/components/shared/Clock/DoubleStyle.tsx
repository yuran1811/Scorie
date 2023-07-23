import { formatTime } from '@/utils';
import { FC } from 'react';

export const DoubleClockStyle: FC<{ timestamp: number }> = ({ timestamp }) => (
  <div className="relative">
    <div className='flexcentercol h-[4rem] w-[2.8rem] p-2 text-[1.7rem] leading-7 after:absolute after:-left-[1px] after:top-1/2 after:h-[1px] after:w-[3px] after:-translate-y-1/2 after:rounded-lg after:bg-white after:shadow-[27px_0_0_white] after:content-[""]'>
      <div className="absolute top-[7.5px] font-semibold">{formatTime(timestamp, 'HH')}</div>
      <div className="textGradient absolute bottom-[7.5px] z-[-1] !font-semibold opacity-80">
        {formatTime(timestamp, 'mm')}
      </div>
    </div>
  </div>
);
