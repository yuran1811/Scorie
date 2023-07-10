import { formatTime } from '@/utils';
import React, { FC, useState } from 'react';

interface ClockProps {
  type?: 'horizontal' | 'vertical' | 'rect' | 'double' | 'darkdim';
}

export const Clock: FC<ClockProps> = ({ type = 'vertical' }) => {
  const [time, setTime] = useState(Date.now());

  setTimeout(() => {
    setTime(Date.now());
  }, 1000);

  return type === 'darkdim' ? (
    <div className='relative before:absolute before:left-1/2 before:top-1/2 before:z-[-1] before:h-[4rem] before:w-[2.8rem] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-xl before:border before:border-gray-400 before:bg-gray-900 before:content-[""]'>
      <div className="typo-3sm flexcentercol w-max p-2 leading-7">
        <div className="textGradient !bg-gradient-to-br !from-gray-800 !to-gray-300 !font-semibold">
          {formatTime(time, 'HH')}
        </div>
        <div className="textGradient !bg-gradient-to-br !from-gray-800 !to-gray-300 !font-semibold">
          {formatTime(time, 'mm')}
        </div>
      </div>
    </div>
  ) : type === 'double' ? (
    <div className="relative">
      <div className='typo-3sm flexcentercol h-[4rem] w-[2.8rem] p-2 leading-7 after:absolute after:-left-[1px] after:top-1/2 after:h-[1px] after:w-[3px] after:-translate-y-1/2 after:rounded-lg after:bg-white after:shadow-[27px_0_0_white] after:content-[""]'>
        <div className="absolute top-[7.5px] font-semibold">{formatTime(time, 'HH')}</div>
        <div className="textGradient absolute bottom-[7.5px] z-[-1] !font-semibold">{formatTime(time, 'mm')}</div>
      </div>
    </div>
  ) : type === 'rect' ? (
    <div className='relative before:absolute before:left-1/2 before:top-1/2 before:z-[-1] before:h-[4rem] before:w-[2.8rem] before:-translate-x-1/2 before:-translate-y-1/2 before:border before:bg-gray-800 before:brightness-125 before:content-[""] after:absolute after:left-1/2 after:top-1/2 after:mt-[0.6px] after:h-[1px] after:w-[18px] after:-translate-x-1/2 after:-translate-y-1/2 after:bg-white after:content-[""]'>
      <div className="typo-3sm flexcentercol w-max p-2 font-semibold leading-7">
        <div>{formatTime(time, 'HH')}</div>
        <div>{formatTime(time, 'mm')}</div>
      </div>
    </div>
  ) : type === 'horizontal' ? (
    <div className="relative">
      <div className="typo-3sm flexcenter w-max p-2 font-bold leading-7">
        <div className="">{formatTime(time, 'HH')}</div>
        <div className="animate-pulse p-[2px]">:</div>
        <div className="textGradient">{formatTime(time, 'mm')}</div>
      </div>
    </div>
  ) : type === 'vertical' ? (
    <div className='relative before:absolute before:left-1/2 before:top-1/2 before:z-[-1] before:h-[4rem] before:w-[2.8rem] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-xl before:bg-gray-800 before:brightness-125 before:content-[""] after:absolute after:-left-[3px] after:top-1/2 after:h-[2.5rem] after:w-[1px] after:-translate-y-1/2 after:bg-white after:shadow-[32.5px_0_0_white] after:content-[""]'>
      <div className="typo-3sm flexcentercol w-max p-2 font-bold leading-7">
        <div className="">{formatTime(time, 'HH')}</div>
        <div className="textGradient">{formatTime(time, 'mm')}</div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Clock;
