import { SettingIcon } from '@cpns/icons';
import { usePanel } from '@/contexts';
import { DivProps } from '@/shared';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const SettingBar: FC<DivProps> = (props) => {
  const { active, setActive } = usePanel();

  const { t } = useTranslation();

  return (
    <div {...props} onClick={() => setActive && setActive((s) => ({ ...s, isSetting: !active.isSetting }))}>
      <SettingIcon className="scale-typo cursor-pointer text-ctcolor" width="32" height="32" />
      <div className="typo-med line-clamp-1 font-bold">{t('settings')}</div>
    </div>
  );
};

export default SettingBar;
