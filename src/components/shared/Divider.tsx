import { DivProps } from '@shared/types';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const Divider: FC<DivProps> = ({ className = '', children }) => {
  const { t } = useTranslation();

  return (
    <div
      className={`flexcenter relative mx-auto w-full max-w-[17rem] text-center text-[3rem] font-semibold text-slate-900 before:absolute before:left-0 before:z-[-1] before:h-1 before:w-16 before:bg-slate-900 before:content-[""] after:absolute after:right-0 after:z-[-1] after:h-1 after:w-16 after:bg-slate-900 after:content-[""] ${className}`}
    >
      <div className="w-max rounded-3xl bg-slate-900 px-4 text-white">{!!children ? children : t('or')}</div>
    </div>
  );
};
