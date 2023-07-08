import { DivProps } from '@/shared';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const FeatureCard: FC<DivProps> = ({ title = '', className = '', children, ...otherProps }) => {
  const { t } = useTranslation();

  return (
    <div
      {...otherProps}
      className={`scrollY m-6 h-[17rem] w-full cursor-pointer rounded-[2rem] p-2 medmb:h-[25rem] medmb:w-[25rem] ${className}`}
    >
      {title && (
        <div className="typo-med sticky left-0 top-0 line-clamp-1 bg-inherit px-6 pb-2 pt-6 text-center font-bold text-white">
          {t(title.toLowerCase())}
        </div>
      )}
      <div className="scrollY typo-sm top-32 h-[calc(100%-8rem)] text-center font-bold text-white">{children}</div>
    </div>
  );
};
