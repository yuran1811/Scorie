import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface SettingSwitchItemProps {
  enable: boolean;
  onClick: any;
  message: {
    enable: string;
    disable: string;
  };
}

export const SettingSwitchItem: FC<SettingSwitchItemProps> = ({ enable, onClick, message }) => {
  const { t } = useTranslation();

  return (
    <div className="typo-sm mt-10 cursor-pointer text-center font-bold" onClick={onClick}>
      {t(enable ? message.enable : message.disable)}
      <div className="typo-4sm text-center font-semibold italic">{t('click to change')}</div>
    </div>
  );
};
