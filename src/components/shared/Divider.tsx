import { DivProps } from '@shared/types';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const Divider: FC<DivProps> = ({ className = '', children }) => {
  const { t } = useTranslation();

  return (
    <div
      className={`flexcenter typo-sm relative mx-auto w-full max-w-[17rem] text-center font-semibold text-violet-800 before:absolute before:left-0 before:right-0 before:z-[-1] before:h-[0.2rem] before:bg-violet-800 before:content-[""] ${className}`}
    >
      <div className="w-max rounded-2xl bg-violet-800 px-[1.2rem] py-2 text-white shadow-[6px_0_0_#2e1065,-6px_0_0_#2e1065]">
        {!!children ? children : t('or')}
      </div>
    </div>
  );
};
