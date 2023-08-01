import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const getTimerIdx = (time: number): number => {
  if (time >= 24 * 60 * 60 * 1000) return 5;
  if (time >= 1 * 60 * 60 * 1000) return 4;
  if (time >= 1 * 60 * 1000) return 3;
  if (time >= 1 * 1000) return 2;
  return 1;
};

const getFormatTimerIdx = (time: number, alwaysShowMs?: boolean): string => {
  const timeIdx = getTimerIdx(time);
  const __ = alwaysShowMs ? ':SSS' : '';

  switch (timeIdx) {
    case 5:
      return `HH:mm:ss${__}`;
    case 4:
      return `H:mm:ss${__}`;
    case 3:
      return `m:ss${__}`;
    case 2:
      return `s${__}`;
    case 1:
      return 's:SSS';
    default:
      return 'HH:mm:ss:SSS';
  }
};

export const formatTimeForWeather = (timestamp?: string) => {
  const now = dayjs.utc(timestamp || Date.now());
  const startTime = dayjs.utc(now).add(0, 'minutes').toISOString();
  const endTime = dayjs.utc(now).add(1, 'days').toISOString();

  return { startTime, endTime };
};

export const formatDate = (timestamp: number, format: string = ''): string => {
  const now = new Date();
  const date = new Date(timestamp);
  const formatter = dayjs(date);

  if (format.length) return formatter.format(format);

  if (dayjs().isSame(formatter, 'date')) return formatter.format('H:mm');
  if (dayjs().isSame(formatter, 'week')) return formatter.format('ddd, H:mm');
  if (now.getFullYear() === date.getFullYear()) return formatter.format('ddd, DD/MM H:mm');

  return formatter.format('ddd, DD/MM/YYYY - H:mm');
};

export const formatWeekDay = (timestamp: string): string => {
  return dayjs(timestamp).format('dddd');
};

export const formatTime = (timestamp: number, format: string = 'H:mm'): string => {
  const date = new Date(timestamp);
  const formatter = dayjs(date);

  return formatter.format(format);
};

export const formatTimerValue = (
  timerLength: number,
  opts: { alwaysShowMs?: boolean } = { alwaysShowMs: false },
): string => {
  if (!timerLength) return '0';

  const formatter = dayjs(timerLength).subtract(8, 'hour');

  const formatTimerIdx = getFormatTimerIdx(timerLength, opts?.alwaysShowMs);

  if (getTimerIdx(timerLength) === 5) {
    const days = Math.floor(timerLength / (24 * 60 * 60 * 1000));
    return days + ':' + formatter.format(formatTimerIdx);
  }

  return formatter.format(formatTimerIdx);
};
