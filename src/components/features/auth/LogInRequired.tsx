import { BackIcon } from '@cpns/icons';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const LogInRequired: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flexcentercol relative w-full tablet:w-[70%] h-[30rem] mx-auto text-[4rem] mobile:text-[5rem] text-white">
      <div className="font-semibold text-center p-6">{t('log in required')}</div>
      <BackIcon className="!text-white" onClick={() => navigate(-1)} />
    </div>
  );
};
