import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const getTimerIdx = (time: number): number => {
  if (time >= 1 * 60 * 60 * 1000) return 4;
  if (time >= 1 * 60 * 1000) return 3;
  if (time >= 1 * 1000) return 2;
  return 1;
};

const getFormatTimerIdx = (time: number): string => {
  const timeIdx = getTimerIdx(time);

  switch (timeIdx) {
    case 4:
      return 'H:mm:ss';
    case 3:
      return 'm:ss';
    case 2:
      return 's';
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

export const formatTimerValue = (timerLength: number, format: string = ''): string => {
  if (!timerLength) return "Time's up";

  const formatter = dayjs(timerLength).subtract(8, 'hour');

  if (format.length) return formatter.format(format);

  const formatTimerIdx = getFormatTimerIdx(timerLength);

  return formatter.format(formatTimerIdx);
};
