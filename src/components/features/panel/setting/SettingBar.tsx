import { SettingIcon } from '@cpns/icons';
import { usePanel } from '@/contexts';
import { DivProps } from '@/shared';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const SettingBar: FC<DivProps> = (props) => {
  const { active, setActive } = usePanel();

  const { t } = useTranslation();

  return (
    <div
      {...props}
      onClick={() =>
        setActive &&
        setActive((s) => ({
          ...s,
          isSetting: !active.isSetting,
        }))
      }
    >
      <SettingIcon className="text-ctbg cursor-pointer" width="40" height="40" />
      <div className="font-bold ml-6 line-clamp-1">{t('settings')}</div>
    </div>
  );
};

export default SettingBar;
