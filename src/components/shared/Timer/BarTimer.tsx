import { classnames, formatTimerValue } from '@/utils';
import { FC } from 'react';

interface BarTimerProps {
  length: number;
  delta: number;
}

export const BarTimer: FC<BarTimerProps> = ({ length, delta }) => (
  <div className="flexcentercol">
    <div className="typo-med text-center font-semibold">{formatTimerValue(length - delta)}</div>
    <div className={classnames('relative h-4 w-full max-w-[12rem]', length === delta ? 'hidden' : '')}>
      <div className="absolute inset-0 rounded-3xl bg-sky-900" />
      <div
        className="absolute inset-0 z-[1] rounded-3xl bg-sky-600"
        style={{ width: `${Number((length - delta) / length) * 100}%` }}
      />
    </div>
  </div>
);
