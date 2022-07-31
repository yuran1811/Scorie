export * from './backupData';
export * from './changelog';
export * from './chart';
export * from './dayjsUsage';
export * from './firebase';
export * from './notes';
export * from './notifications';
export * from './pwaFunctions';
export * from './quotes';
export * from './scores';
export * from './standardize';
export * from './styles';
export * from './testimonials';

interface CmpObject extends Object {
  [key: string]: any;
}

const isObject = (object: Object) => {
  return object != null && typeof object === 'object';
};

export const deepObjectCompare = (a: CmpObject, b: CmpObject) => {
  const keys1 = Object.keys(a);
  const keys2 = Object.keys(b);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    const val1 = a[key];
    const val2 = b[key];

    const areObjects = isObject(val1) && isObject(val2);
    if ((areObjects && !deepObjectCompare(val1, val2)) || (!areObjects && val1 !== val2))
      return false;
  }

  return true;
};

export const shallowObjectCompare = (a: CmpObject, b: CmpObject) => {
  const keys1 = Object.keys(a);
  const keys2 = Object.keys(b);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) if (a[key] !== b[key]) return false;

  return true;
};

export const copyToClipboard = (data: string) => {
  navigator.clipboard.writeText(data);
};

export const randomInArray = (arr: any[]) => {
  const idx = (min = 0, max = arr.length - 1) => Math.floor(Math.random() * (max - min + 1)) + min;

  return arr[idx()];
};
