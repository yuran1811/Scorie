import { usePanel } from '@/contexts';
import { DivProps } from '@/shared';
import { ProgressIcon } from '@cpns/icons';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const DataBar: FC<DivProps> = (props) => {
  const { active, setActive } = usePanel();

  const { t } = useTranslation();

  return (
    <div {...props} onClick={() => setActive && setActive((s) => ({ ...s, isData: !active.isData }))}>
      <ProgressIcon className="scale-typo cursor-pointer text-ctcolor" width="32" height="32" />
      <div className="typo-med line-clamp-1 font-bold">{t('data')}</div>
    </div>
  );
};

export default DataBar;
