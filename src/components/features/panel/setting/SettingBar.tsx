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
      <SettingIcon className="scale-typo-sm cursor-pointer text-ctcolor" width="26" height="26" />
      <div className="typo-semimed line-clamp-1 font-bold">{t('settings')}</div>
    </div>
  );
};

export default SettingBar;
