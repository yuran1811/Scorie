import { BackIcon } from '@cpns/icons';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const LogInRequired: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flexcentercol relative mx-auto h-[30rem] w-full text-[4rem] text-white mobile:text-[5rem] tablet:w-[70%]">
      <div className="p-6 text-center font-semibold">{t('log in required')}</div>
      <BackIcon className="!text-white" onClick={() => navigate(-1)} />
    </div>
  );
};
