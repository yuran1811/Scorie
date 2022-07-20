import { usePanel } from '@/contexts';
import { DivProps } from '@/shared';
import { UserIcon } from '@cpns/icons';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const AccountBar: FC<DivProps> = (props) => {
  const { active, setActive } = usePanel();

  const { t } = useTranslation();

  return (
    <div
      {...props}
      onClick={() =>
        setActive &&
        setActive((s) => ({
          ...s,
          isAccount: !active.isAccount,
        }))
      }
    >
      <UserIcon className="text-ctbg cursor-pointer" width="40" height="40" />
      <div className="font-bold ml-6 line-clamp-1">{t('account')}</div>
    </div>
  );
};

export default AccountBar;
