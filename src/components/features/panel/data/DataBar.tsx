import { usePanel } from '@/contexts';
import { DivProps } from '@/shared';
import { ProgressIcon } from '@cpns/icons';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const DataBar: FC<DivProps> = (props) => {
  const { active, setActive } = usePanel();

  const { t } = useTranslation();

  return (
    <div
      {...props}
      onClick={() =>
        setActive &&
        setActive((s) => ({
          ...s,
          isData: !active.isData,
        }))
      }
    >
      <ProgressIcon className="cursor-pointer text-ctbg" width="40" height="40" />
      <div className="ml-6 font-bold line-clamp-1">{t('data')}</div>
    </div>
  );
};

export default DataBar;
