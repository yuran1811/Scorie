import dayjs from 'dayjs';

export const formatDate = (timestamp: number) => {
  const now = new Date();
  const date = new Date(timestamp);
  const formatter = dayjs(date);

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
