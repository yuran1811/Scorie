import { FC, PropsWithChildren } from 'react';
import { BlockQuote } from '../quotes/BlockQuote';
import { useTranslation } from 'react-i18next';

export const WelcomBanner: FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();

  return (
    <div className="flexcentercol mb-36 w-full space-y-16 pt-8">
      <div className="typo-xl w-full text-center font-bold medtab:px-2">
        {t('welcome')}, {children}!
      </div>

      <div className="w-full">
        <BlockQuote />
      </div>
    </div>
  );
};
