import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const formatTimeForWeather = (timestamp?: string) => {
  const now = dayjs.utc(timestamp || Date.now());
  const startTime = dayjs.utc(now).add(0, 'minutes').toISOString();
  const endTime = dayjs.utc(now).add(1, 'days').toISOString();

  return { startTime, endTime };
};

export const formatDate = (timestamp: number, format: string = '') => {
  const now = new Date();
  const date = new Date(timestamp);
  const formatter = dayjs(date);

  if (format.length) return formatter.format(format);

  if (dayjs().isSame(formatter, 'date')) return formatter.format('H:mm');
  if (dayjs().isSame(formatter, 'week')) return formatter.format('ddd, H:mm');
  if (now.getFullYear() === date.getFullYear()) return formatter.format('ddd, DD/MM H:mm');

  return formatter.format('ddd, DD/MM/YYYY - H:mm');
};

export const formatTime = (timestamp: number, format = 'H:mm') => {
  const date = new Date(timestamp);
  const formatter = dayjs(date);

  return formatter.format(format);
};
