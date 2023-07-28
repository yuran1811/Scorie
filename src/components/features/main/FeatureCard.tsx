import { DivProps } from '@/shared';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface FeatureCardProps {
  desc?: string;
}

export const FeatureCard: FC<FeatureCardProps & DivProps> = ({ title = '', className = '', desc = '', ...otherProps }) => {
  const { t } = useTranslation();

  return (
    <div {...otherProps} className={`scrollY w-full cursor-pointer rounded-[1.6rem] text-white ${className}`}>
      {!!title.length && (
        <div className="typo-2sm sticky left-0 top-0 line-clamp-2 bg-inherit px-4 pt-6 text-center font-bold">
          {t(title.toLowerCase())}
        </div>
      )}

      {!!desc.length && (
        <div className="scrollY typo-4sm text-center font-medium">
          <p className="p-2 pb-6 medmb:px-6">{t(desc)}</p>
        </div>
      )}
    </div>
  );
};
