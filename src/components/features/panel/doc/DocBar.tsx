import { usePanel } from '@/contexts';
import { DivProps } from '@/shared';
import { BookIcon } from '@cpns/icons';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const DocBar: FC<DivProps> = (props) => {
  const { active, setActive } = usePanel();

  const { t } = useTranslation();

  return (
    <div {...props} onClick={() => setActive && setActive((s) => ({ ...s, isDoc: !active.isDoc }))}>
      <BookIcon className="scale-typo-sm aspect-square w-10 cursor-pointer text-ctcolor" />
      <div className="typo-semimed line-clamp-1 font-bold">{t('document')}</div>
    </div>
  );
};

export default DocBar;
