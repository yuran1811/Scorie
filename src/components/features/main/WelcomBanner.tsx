import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface WelcomBannerProps {
  content: string;
}

export const WelcomBanner: FC<WelcomBannerProps> = ({ content }) => {
  const { t } = useTranslation();

  return (
    <div className="typo-lg w-full text-center font-bold medtab:px-2">
      {t('welcome')}, {content}!
    </div>
  );
};
