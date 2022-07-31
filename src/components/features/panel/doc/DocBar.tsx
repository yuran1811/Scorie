import { usePanel } from '@/contexts';
import { DivProps } from '@/shared';
import { BookIcon } from '@cpns/icons';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const DocBar: FC<DivProps> = (props) => {
  const { active, setActive } = usePanel();

  const { t } = useTranslation();

  return (
    <div
      {...props}
      onClick={() =>
        setActive &&
        setActive((s) => ({
          ...s,
          isDoc: !active.isDoc,
        }))
      }
    >
      <BookIcon className="cursor-pointer text-ctbg" width="40" height="40" />
      <div className="ml-6 font-bold line-clamp-1">{t('document')}</div>
    </div>
  );
};

export default DocBar;
