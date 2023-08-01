import { LapseListType } from '@/shared';
import { formatTimerValue } from '@/utils';
import { FC } from 'react';

interface LapseHistoryProps {
  lapses: LapseListType;
}

export const LapseHistory: FC<LapseHistoryProps> = ({ lapses }) => {
  return (
    <ul className="scrollY my-4 flex max-h-[21rem] flex-col items-start justify-start gap-3">
      {lapses.map(({ id, timestamp, lapseTime }) => (
        <li key={id} className="flex items-center justify-start gap-4 px-3 py-1 font-normal">
          <span className="font-semibold">#{id}</span>
          <span>{formatTimerValue(lapseTime, { alwaysShowMs: true })}</span>
          <span>{formatTimerValue(timestamp, { alwaysShowMs: true })}</span>
        </li>
      ))}
    </ul>
  );
};
