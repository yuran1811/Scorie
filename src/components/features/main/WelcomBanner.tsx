import { FC } from 'react';
import { BlockQuote } from '../quotes/BlockQuote';
import { useTranslation } from 'react-i18next';

export const WelcomBanner: FC = ({ children }) => {
  const { t } = useTranslation();

  return (
    <div className="flexcentercol w-full pt-8">
      <div className="w-full text-center text-[4.5rem] font-bold tablet:px-2 tablet:text-[5rem]">
        {t('welcome')}, {children}!
      </div>

      <div className="my-8 w-full">
        <BlockQuote />
      </div>
    </div>
  );
};
