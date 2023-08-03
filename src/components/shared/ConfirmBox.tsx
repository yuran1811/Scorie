import { DivProps } from '@/shared';
import { confirmActionStyle } from '@/utils';
import { Dispatch, FC, SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

interface ConfirmBoxProps {
  content?: string;
  actionStyle?: keyof typeof confirmActionStyle;
  actionWhenConfirm: () => Promise<any>;
  setConfirm: Dispatch<SetStateAction<boolean>>;
}

export const ConfirmBox: FC<ConfirmBoxProps & DivProps> = ({
  className = '',
  content,
  actionStyle = 'normal',
  actionWhenConfirm,
  setConfirm,
  ...otherProps
}) => {
  const { t } = useTranslation();

  return createPortal(
    <div
      {...otherProps}
      className={`isAnimated flexcentercol absolute bottom-0 left-0 right-0 origin-top flex-wrap border-t border-current p-4 ${className}`}
      onClick={(e) => e.stopPropagation()}
      style={{ ...confirmActionStyle[actionStyle] }}
    >
      <div className="typo-sm mb-4 p-4 text-center font-bold">{t(content || 'default confirm')}</div>
      <div className="flexcenter typo-2sm mx-auto max-w-[32rem] flex-wrap gap-4 pb-4 font-semibold">
        <div
          className="w-max cursor-pointer rounded-[2rem] border-4 border-transparent px-6 py-2 text-center transition-colors hover:border-current"
          onClick={() => {
            setConfirm(false);
          }}
        >
          {t('cancel')}
        </div>
        <div
          className="w-max cursor-pointer rounded-[2rem] border-4 border-transparent bg-violet-900 px-6 py-2 text-center text-violet-300 transition-colors hover:border-violet-400 hover:bg-violet-800"
          onClick={() => {
            actionWhenConfirm().finally(() => {
              setConfirm(false);
            });
          }}
        >
          {t('confirm')}
        </div>
      </div>
    </div>,
    document.getElementById('confirm-container') as HTMLElement,
  );
};
