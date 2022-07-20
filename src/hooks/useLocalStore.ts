import { Dispatch, useEffect, useState } from 'react';

const getInitialValue = <T>(key: string, value: T, defaultValue: string): T => {
  const localData = JSON.parse(localStorage.getItem(key) ?? defaultValue);
  if (localData) return localData;

  return value instanceof Function ? value() : value;
};

export const useLocalStore = <T>(key: string, value: T, defaultValue: string): [T, Dispatch<T>] => {
  const [data, setData] = useState(() => getInitialValue<T>(key, value, defaultValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [data, key]);

  return [data, setData];
};
