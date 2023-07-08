import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const ButtonTour: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flexcentercol gap-2">
      <h2 className="tourTitle">{t('shuffle')}</h2>
      <p className="tourContent">{t('click to shuffle the quote')}</p>
    </div>
  );
};
