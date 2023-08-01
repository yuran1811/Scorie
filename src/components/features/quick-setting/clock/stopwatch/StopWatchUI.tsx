import { formatTimerValue } from '@/utils';
import { FC } from 'react';

interface StopWatchUIProps {
  timeLth: number;
}

export const StopWatchUI: FC<StopWatchUIProps> = ({ timeLth }) => {
  return <div className="typo font-bold">{formatTimerValue(timeLth, { alwaysShowMs: true })}</div>;
};
