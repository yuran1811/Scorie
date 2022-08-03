import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const BlockQuoteTour: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flexcentercol gap-2">
      <h2 className="tourTitle">{t('blockquote')}</h2>
      <p className="tourContent">{t('see the awesome quote here')}</p>
    </div>
  );
};
