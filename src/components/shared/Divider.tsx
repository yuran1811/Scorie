import { DivProps } from '@shared/types';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const Divider: FC<DivProps> = ({ className = '', children }) => {
  const { t } = useTranslation();

  return (
    <div
      className={`flexcenter typo-sm relative mx-auto w-full max-w-[17rem] text-center font-semibold text-ctbg before:absolute before:left-0 before:right-0 before:z-[-1] before:h-[0.3rem] before:bg-ctbg before:content-[""]  ${className}`}
    >
      <div className="w-max rounded-3xl border-8 border-violet-800/95 bg-ctbg px-[1.2rem] py-2 text-white">
        {!!children ? children : t('or')}
      </div>
    </div>
  );
};
