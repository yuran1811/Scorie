import { ClockProps } from '@/shared';
import { FC, useState } from 'react';
import { DarkDimClockStyle, DoubleClockStyle, HorizontalClockStyle, RectClockStyle, VerticalClockStyle } from '.';

export const Clock: FC<ClockProps> = ({ type = 'vertical' }) => {
  const [timestamp, setTimestamp] = useState(Date.now());

  setTimeout(() => {
    setTimestamp(Date.now());
  }, 1000);

  return type === 'darkdim' ? (
    <DarkDimClockStyle timestamp={timestamp} />
  ) : type === 'double' ? (
    <DoubleClockStyle timestamp={timestamp} />
  ) : type === 'rect' ? (
    <RectClockStyle timestamp={timestamp} />
  ) : type === 'horizontal' ? (
    <HorizontalClockStyle timestamp={timestamp} />
  ) : type === 'vertical' ? (
    <VerticalClockStyle timestamp={timestamp} />
  ) : (
    <></>
  );
};

export default Clock;
