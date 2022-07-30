import { DivProps } from '@/shared';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const FeatureCard: FC<DivProps> = ({ title, className, children, ...otherProps }) => {
  const { t } = useTranslation();

  return (
    <div
      {...otherProps}
      className={`${className || ''} scrollY m-6 h-[25rem] w-[25rem] cursor-pointer rounded-[2rem]`}
    >
      {title && (
        <div className="sticky top-0 left-0 bg-inherit px-6 pt-6 pb-2 text-center text-[4rem] font-bold text-white line-clamp-1">
          {t(title.toLowerCase())}
        </div>
      )}
      <div className="text-center text-[2.5rem] font-bold text-white">{children}</div>
    </div>
  );
};
