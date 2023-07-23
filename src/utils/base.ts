interface CmpObject extends Object {
  [key: string]: any;
}

export const classnames: (...classes: any[]) => string = (...classes) =>
  classes.filter((_) => typeof _ === 'string').join(' ');

export const randomInArray = (arr: any[]) => {
  const getIdx = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;
  const idx = getIdx(0, arr.length);

  return { idx, item: arr[idx] };
};

export const isObject = (object: Object) => {
  return object !== null && typeof object === 'object';
};

export const deepObjectCompare = (a: CmpObject, b: CmpObject) => {
  const keys1 = Object.keys(a);
  const keys2 = Object.keys(b);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    const val1 = a[key];
    const val2 = b[key];

    const areObjects = isObject(val1) && isObject(val2);
    if ((areObjects && !deepObjectCompare(val1, val2)) || (!areObjects && val1 !== val2)) return false;
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
