export * from './backupData';
export * from './base';
export * from './changelog';
export * from './chart';
export * from './commonToast';
export * from './date-fns';
export * from './firebase';
export * from './markdown-it';
export * from './notes';
export * from './notifications';
export * from './pwaFunctions';
export * from './quotes';
export * from './scores';
export * from './standardize';
export * from './styles';
export * from './testimonials';
export * from './weather';

export const scrollToEle = (selector: string, opts?: any) =>
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center', ...opts });
export const scrollToTop = () => document.querySelector('#root>div')?.scroll({ top: 0, left: 0, behavior: 'smooth' });

export const copyToClipboard = (data: string) => {
  navigator.clipboard.writeText(data);
};

export const getStepId = (prefix: string) => {
  let idx = 0;
  return (pattern?: string | number) => {
    if (typeof pattern === 'number') idx = pattern;
    return `${!!prefix.length ? prefix : 'reactour-step'}-${pattern || ++idx}`;
  };
};
