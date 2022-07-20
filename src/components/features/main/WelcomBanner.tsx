import { FC } from 'react';
import { BlockQuote } from '../quotes/BlockQuote';
import { useTranslation } from 'react-i18next';

export const WelcomBanner: FC = ({ children }) => {
  const { t } = useTranslation();

  return (
    <div className="flexcentercol w-full pt-8">
      <div className="w-full font-bold text-[4.5rem] tablet:text-[5rem] text-center tablet:px-2">
        {t('welcome')}, {children}!
      </div>

      <div className="w-full my-8">
        <BlockQuote />
      </div>
    </div>
  );
};
